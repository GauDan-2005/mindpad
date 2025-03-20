"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { createNewDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { FilePlus2 } from "lucide-react";

const NewDocumentButton = ({
  showIcon = true,
  className,
}: {
  showIcon?: boolean;
  className?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      if (docId) router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button
      onClick={handleCreateNewDocument}
      disabled={isPending}
      className={className}
    >
      {showIcon && <FilePlus2 size={20} />}
      {isPending ? "Creating" : "New Document"}
    </Button>
  );
};
export default NewDocumentButton;
