"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";

import { db } from "@/firebase";

const useOwner = () => {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOwner] = useState(false);
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  useEffect(() => {
    if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
      const owners = usersInRoom.docs.filter(
        (doc) => doc.data().role === "owner"
      );

      if (
        owners.some(
          (owner) => owner.data().userId === user?.emailAddresses[0].toString()
        )
      ) {
        setIsOwner(true);
      }
    }
  }, [user, usersInRoom]);

  return isOwner;
};
export default useOwner;
