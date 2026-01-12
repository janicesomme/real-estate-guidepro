import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  text: string;
  completed: boolean;
}

const ChecklistItem = ({ text, completed }: ChecklistItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
      <div
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 hover:border-primary/60"
        )}
      >
        {completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
      </div>
      <span
        className={cn(
          "text-sm",
          completed ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default ChecklistItem;
