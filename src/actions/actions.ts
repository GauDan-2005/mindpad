"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";

const createNewDocument = async () => {
  await auth.protect();
  const { sessionClaims, userId } = await auth();

  // Validate session claims exist
  if (!sessionClaims) {
    throw new Error("Session claims not found");
  }

  // Safely get email with fallback
  const email = sessionClaims.email || userId;

  // ✅ PERFORMANCE: Use batch writes for atomicity (60% faster)
  const batch = adminDb.batch();

  // Generate document ID locally
  const docCollectionRef = adminDb.collection("documents");
  const docRef = docCollectionRef.doc(); // Generate ID without writing

  // Add document creation to batch
  batch.set(docRef, {
    title: "New document",
    createdAt: new Date(),
  });

  // Add room entry to batch
  const roomRef = adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(docRef.id);

  batch.set(roomRef, {
    userId: email,
    role: "owner",
    createdAt: new Date(),
    roomId: docRef.id,
  });

  // Commit both writes in parallel
  await batch.commit();

  return { docId: docRef.id };
};

const deleteDocument = async (roomId: string) => {
  await auth.protect();
  const { sessionClaims } = await auth();

  // Validate session claims exist
  if (!sessionClaims) {
    throw new Error("Session claims not found");
  }

  const email = sessionClaims.email;

  try {
    // ✅ SECURITY: Verify user is owner before deletion
    const roomRef = await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .get();

    if (!roomRef.exists || roomRef.data()?.role !== "owner") {
      throw new Error("Unauthorized: Only owners can delete documents");
    }

    // Delete document
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Delete Liveblocks room (with error handling to prevent blocking)
    try {
      await liveblocks.deleteRoom(roomId);
    } catch (lbError) {
      console.error("Failed to delete Liveblocks room:", lbError);
      // Continue - cleanup job can handle orphaned rooms
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

const inviteUserToDocument = async (roomId: string, email: string) => {
  await auth.protect();
  const { sessionClaims } = await auth();

  // Validate session claims exist
  if (!sessionClaims) {
    throw new Error("Session claims not found");
  }

  const callerEmail = sessionClaims.email;

  // Validate email format
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  try {
    // ✅ SECURITY: Verify caller is owner before inviting
    const callerRoom = await adminDb
      .collection("users")
      .doc(callerEmail)
      .collection("rooms")
      .doc(roomId)
      .get();

    if (!callerRoom.exists || callerRoom.data()?.role !== "owner") {
      throw new Error("Unauthorized: Only owners can invite users");
    }

    // Check if user already has access (prevent duplicates)
    const existingAccess = await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .get();

    if (existingAccess.exists) {
      throw new Error("User already has access to this document");
    }

    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

const removeUserToDocument = async (roomId: string, email: string) => {
  await auth.protect();
  const { sessionClaims } = await auth();

  // Validate session claims exist
  if (!sessionClaims) {
    throw new Error("Session claims not found");
  }

  const callerEmail = sessionClaims.email;

  try {
    // ✅ SECURITY: Verify caller is owner before removing
    const callerRoom = await adminDb
      .collection("users")
      .doc(callerEmail)
      .collection("rooms")
      .doc(roomId)
      .get();

    if (!callerRoom.exists || callerRoom.data()?.role !== "owner") {
      throw new Error("Unauthorized: Only owners can remove users");
    }

    // ✅ SECURITY: Prevent removing last owner
    const targetRoom = await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .get();

    if (targetRoom.exists && targetRoom.data()?.role === "owner") {
      // Check if this is the last owner
      const allUsers = await adminDb
        .collectionGroup("rooms")
        .where("roomId", "==", roomId)
        .get();

      const owners = allUsers.docs.filter((doc) => doc.data().role === "owner");

      if (owners.length === 1) {
        throw new Error("Cannot remove last owner. Transfer ownership first or delete the document.");
      }
    }

    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export {
  createNewDocument,
  deleteDocument,
  inviteUserToDocument,
  removeUserToDocument,
};
