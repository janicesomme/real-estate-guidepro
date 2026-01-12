import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CommitmentItemProps {
  text: string;
  committedDate: string;
  completed: boolean;
  completedDate?: string;
  delay?: number;
}

const CommitmentItem = ({
  text,
  committedDate,
  completed,
  completedDate,
  delay = 0,
}: CommitmentItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
        completed
          ? "bg-muted/50 border-border opacity-70"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
          completed
            ? "bg-green-500 border-green-500"
            : "border-muted-foreground/40"
        }`}
      >
        {completed && <Check className="w-3 h-3 text-white" />}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm ${
            completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {text}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {completed ? `Completed: ${completedDate}` : `Committed: ${committedDate}`}
        </p>
      </div>

      {!completed && (
        <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0">
          Mark Complete
        </button>
      )}
    </motion.div>
  );
};

export default CommitmentItem;
