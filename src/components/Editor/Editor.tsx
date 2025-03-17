"use client";

import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";

import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

import stringToColor from "@/lib/stringToColor";

import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import "./Editor.css";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};

const BlockNote = ({ doc, provider, darkMode }: EditorProps) => {
  const userInfo = useSelf((me) => me.info);

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
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  const darkModeStyle = `hover:text-white ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

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
      <div className="flex items-center justify-end gap-2 mb-10">
        {/* Translate Document AI */}
        <TranslateDocument doc={doc} />

        {/* Chat to document AI */}
        <ChatToDocument doc={doc} />

        {/* Dark mode */}
        <Button
          className={darkModeStyle}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      {/* Block Note */}
      <div className="flex flex-1">
        <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
      </div>
    </div>
  );
};
export default Editor;
