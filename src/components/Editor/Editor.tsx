"use client";

import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";

import stringToColor from "@/lib/stringToColor";

import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import "./Editor.css";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";
import { ModeToggle } from "../ModeToggle";
import { useTheme } from "next-themes";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};

const BlockNote = ({ doc, provider }: EditorProps) => {
  const userInfo = useSelf((me) => me.info);
  const { theme, systemTheme } = useTheme();

  const getTheme = (): "dark" | "light" | undefined => {
    if (theme === "system") {
      return systemTheme === "dark" ? "dark" : "light"; // Ensure only "dark" or "light"
    }
    return theme === "dark" || theme === "light" ? theme : "light"; // Restrict possible values
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email),
      },
    },
  });
  return (
    <div className="flex flex-1 max-h-full w-full justify-start items-start">
      <BlockNoteView
        className="flex self-stretch min-w-full"
        editor={editor}
        theme={getTheme()}
      />
    </div>
  );
};

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!room || !provider || !doc) return null;

  return (
    <div className="max-w-6xl mx-auto w-full flex flex-1 flex-col">
      <div className="flex items-center justify-between md:justify-end gap-2 mb-10">
        {/* Translate Document AI */}
        <TranslateDocument doc={doc} />

        {/* Chat to document AI */}
        <ChatToDocument doc={doc} />
      </div>

      {/* Block Note */}
      <div className="flex flex-1">
        <BlockNote doc={doc} provider={provider} />
      </div>
    </div>
  );
};
export default Editor;
