import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { DocumentData } from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const SidebarCollapsible = ({
  data,
  title,
}: {
  data: RoomDocument[];
  title: string;
}) => {
  return (
    <Collapsible
      title="My Notes"
      defaultOpen={data.length > 0}
      className="group/collapsible"
    >
      <SidebarGroup>
        <SidebarGroupLabel
          asChild
          className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            {title}
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {data.length === 0 ? (
                <h2 className="text-gray-500 font-semibold text-sm">
                  No documents found
                </h2>
              ) : (
                data.map((doc: RoomDocument) => (
                  <SidebarOption
                    key={doc.id}
                    href={`/doc/${doc.id}`}
                    id={doc.id}
                  />
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};
export default SidebarCollapsible;
