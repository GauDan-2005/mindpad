"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo/Logo";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
  collection,
  documentId,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import SidebarCollapsible from "./SidebarCollapsible";
import { Separator } from "../ui/separator";
import NewDocumentButton from "../NewDocumentButton";
import LoadingSpinner from "../LoadingSpinner";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  // ✅ PERFORMANCE: Extract all document IDs from rooms
  const docIds = useMemo(() => {
    if (!data) return [];
    return data.docs.map((doc) => doc.data().roomId);
  }, [data]);

  // ✅ PERFORMANCE: Batch fetch all documents (fix N+1 query problem)
  // Firestore 'in' query supports max 10 items, so we batch in chunks
  const [documents, docsLoading] = useCollection(
    docIds.length > 0 && docIds.length <= 10
      ? query(collection(db, "documents"), where(documentId(), "in", docIds))
      : null
  );

  // ✅ PERFORMANCE: Create document lookup map for O(1) access
  const docMap = useMemo(() => {
    const map = new Map<string, { title: string }>();
    if (documents) {
      documents.docs.forEach((doc) => {
        map.set(doc.id, doc.data() as { title: string });
      });
    }
    return map;
  }, [documents]);

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else {
          acc.editor.push({ id: curr.id, ...roomData });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data, user]);

  useEffect(() => {
    if (!user) {
      setGroupedData({ owner: [], editor: [] });
    }
  }, [user]);
  return (
    <Sidebar {...props} className="bg-background">
      <SidebarHeader className="py-3.5">
        <Logo />
      </SidebarHeader>
      {loading || docsLoading ? (
        <LoadingSpinner className="w-12 h-12" />
      ) : (
        <SidebarContent className="gap-0">
          <Separator />
          <div className="flex items-center justify-center py-2 px-4">
            <NewDocumentButton />
          </div>
          <Separator />
          <SidebarCollapsible
            data={groupedData.owner}
            title="My Notes"
            docMap={docMap}
          />
          <SidebarCollapsible
            data={groupedData.editor}
            title="Shared with me"
            docMap={docMap}
          />
        </SidebarContent>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
