"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "./Breadcrumbs";
import { Button } from "./ui/button";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-[1500] justify-between p-4 bg-white border-gray-200">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      {user && (
        <h1 className="text-2xl font-semibold">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="flex items-center justify-center">
        <SignedOut>
          <Button
            asChild
            className="px-4 py-2 rounded-sm bg-primary hover:bg-primary/80 "
          >
            <SignInButton fallbackRedirectUrl={"/"} />
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center w-10 h-10">
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
