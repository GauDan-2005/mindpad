import NewDocumentButton from "@/components/NewDocumentButton";
import { ArrowUpCircle, FilePlus2 } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center justify-center h-full flex-1 bg-custom-gradient">
      <div className="flex flex-col gap-6 items-center justify-center">
        <div className="flex flex-col gap-8 items-center justify-center px-16 md:px-48 py-10 md:py-16 border-[0.8rem] border-background/25 border-dashed border-opacity-20">
          <FilePlus2 className="w-28 h-28 text-primary animate-pulse" />
          <NewDocumentButton showIcon={false} />
        </div>
        <div className="flex flex-col space-y-4 items-center justify-center">
          <ArrowUpCircle className="w-10 h-10 animate-bounce text-foreground/60" />
          <h1 className="font-bold text-xl text-foreground/60 text-center">
            Get started with creating a New Document.
          </h1>
        </div>
      </div>
    </main>
  );
}
