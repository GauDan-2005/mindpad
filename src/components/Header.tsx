"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="static md:sticky md:top-0 z-auto md:z-[2000] flex items-center justify-between p-4 bg-white border-b-[0.5px] border-gray-200">
      {user && (
        <h1 className="text-2xl font-semibold">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton fallbackRedirectUrl={"/"} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
