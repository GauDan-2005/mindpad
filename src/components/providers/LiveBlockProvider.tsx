"use client";

import { LiveblocksProvider as LiveBlockProviderWrapper } from "@liveblocks/react/suspense";

const LiveBlockProvider = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
  }

  return (
    <LiveBlockProviderWrapper throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveBlockProviderWrapper>
  );
};
export default LiveBlockProvider;
