"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Editor from "../Editor/Editor";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

import useOwner from "@/lib/useOwner";

import { CheckCheck } from "lucide-react";

const Document = ({ id }: { id: string }) => {
  // eslint-disable-next-line
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  useEffect(() => {
    // fetch document
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  return (
    <div className="bg-background md:p-5 h-full flex-1 rounded-lg flex flex-col max-w-6xl w-full mx-auto">
      <div className="flex  w-full mx-auto justify-between items-center pb-5">
        <form
          onSubmit={updateTitle}
          className="flex flex-1 space-x-2 items-center"
        >
          {/* update title */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating}>
            <CheckCheck />
            <span className="hidden md:inline">
              {isUpdating ? "Updating..." : "Update"}
            </span>
          </Button>

          {isOwner && (
            <>
              {/* invite user */}
              <InviteUser />
              {/* delete document */}
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5 w-full">
        {/* manage users */}
        <ManageUsers />

        {/* avatars */}
        <Avatars />
      </div>

      {/* colaborative editor */}

      <Editor />
    </div>
  );
};
export default Document;
