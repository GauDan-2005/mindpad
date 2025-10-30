"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { removeUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { UsersRound } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import useOwner from "@/lib/useOwner";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";

const ManageUsers = () => {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const handleDelete = async (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      // remove user
      const { success } = await removeUserToDocument(room.id, userId);

      if (success) {
        setIsOpen(false);
        toast.success("User removeded to room successfully!");
      } else {
        toast.error("Failed to remove user to room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant={"outline"} onClick={() => setIsOpen(!isOpen)}>
        <DialogTrigger>
          <UsersRound className="size-4" />
          <span className="hidden md:inline">
            Users {usersInRoom?.docs.length}
          </span>
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this document.
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc) => (
            <div
              key={doc.data().userId}
              className="flex justify-between items-center"
            >
              <p className="font-light">
                {doc.data().userId === user?.emailAddresses[0].toString()
                  ? `You (${doc.data().userId})`
                  : doc.data().userId}
              </p>

              <div className="flex items-center gap-2">
                <Button variant={"outline"}>{doc.data().role}</Button>
                {isOwner &&
                  doc.data().userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant={"destructive"}
                      className=""
                      disabled={isPending}
                      size={"sm"}
                      onClick={() => handleDelete(doc.data().userId)}
                    >
                      {isPending ? "Removing..." : "X"}
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ManageUsers;
