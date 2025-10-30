import { NotebookPen } from "lucide-react";

const LogoIcon = ({ iconSize = 20 }: { iconSize?: number }) => {
  return (
    <div className="p-1 md:p-2 bg-gradient-to-bl from-teal-500 to-primary rounded-lg flex items-center justify-center text-2xl">
      <NotebookPen className="stroke-white" size={iconSize} />
    </div>
  );
};
export default LogoIcon;
