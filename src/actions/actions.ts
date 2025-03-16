"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";

const createNewDocument = async () => {
  await auth.protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New document",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
};

const deleteDocument = async (roomId: string) => {
  await auth.protect();

  try {
    // delete document referece
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();

    // delete room reference in the user's collection for every user in that room
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // delete the room from liveblocks
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

const inviteUserToDocument = async (roomId: string, email: string) => {
  await auth.protect();

  try {
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
    return { success: false };
  }
};

const removeUserToDocument = async (roomId: string, email: string) => {
  await auth.protect();

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export {
  createNewDocument,
  deleteDocument,
  inviteUserToDocument,
  removeUserToDocument,
};
