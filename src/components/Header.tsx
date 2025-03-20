"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Logo from "./Logo/Logo";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const { user } = useUser();
  const { open, isMobile } = useSidebar();

  return (
    <div className="flex sticky bg-background top-0 h-16 shrink-0 items-center gap-2 border-b px-4 z-[1500] justify-between p-4">
      <div className="flex items-center justify-start md:flex-1">
        <SidebarTrigger className="[&_svg]:size-5 text-primary hover:text-primary/80" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-primary/70 " />
        {user && (
          <motion.h1
            className="text-xl font-bold bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            {user?.firstName}
            {`'s`} Space
          </motion.h1>
        )}
      </div>

      {/* Logo Animation */}
      <AnimatePresence>
        {!isMobile && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Logo />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumbs */}

      {/* user button */}
      <div className="flex items-center justify-end gap-2 md:flex-1">
        {/* Dark mode */}
        <ModeToggle />
        <SignedOut>
          <Button
            asChild
            className="px-4 py-2 rounded-sm bg-primary hover:bg-primary/80"
          >
            <SignInButton fallbackRedirectUrl={"/"} />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center w-auto h-full">
            <UserButton
              appearance={{
                elements: {
                  formButtonPrimary: "bg-primary hover:bg-primary/80",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
