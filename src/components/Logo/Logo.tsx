import Link from "next/link";
import LogoIcon from "./LogoIcon";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`flex gap-2 items-center justify-center font-extrabold text-2xl ${
        className || ""
      }`}
    >
      <LogoIcon />
      <h1>
        <span className="bg-gradient-to-r from-teal-500 to-primary bg-clip-text text-transparent">
          Mind
        </span>
        <span className="text-foreground/60">Pad</span>
      </h1>
    </Link>
  );
};
export default Logo;
