import RoomProvider from "@/components/providers/RoomProvider";
import { auth } from "@clerk/nextjs/server";

const DocLayout = async ({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};
export default DocLayout;
