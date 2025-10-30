import LiveBlockProvider from "@/components/providers/LiveBlockProvider";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlockProvider>{children}</LiveBlockProvider>;
};
export default PageLayout;
