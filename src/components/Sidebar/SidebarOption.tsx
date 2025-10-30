"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";

const SidebarOption = ({
  href,
  id,
  docMap,
}: {
  href: string;
  id: string;
  docMap: Map<string, { title: string }>;
}) => {
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";
  const { isMobile, setOpenMobile } = useSidebar();

  // ✅ PERFORMANCE: Get title from pre-fetched docMap instead of individual query
  const docData = docMap.get(id);

  if (!docData) return null;

  const closeSideBar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} onClick={closeSideBar}>
        <Link href={href}>
          <p className="truncate">{docData.title}</p>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
export default SidebarOption;
