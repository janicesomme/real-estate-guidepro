import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

type StatusTier = "browser" | "learner" | "actionTaker";

interface StatusBadgeProps {
  tier: StatusTier;
  compact?: boolean;
  showProgress?: boolean;
  progressMessage?: string;
  progressValue?: number;
  delay?: number;
}

const tierConfig = {
  browser: {
    label: "BROWSER",
    icon: "🥉",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  learner: {
    label: "LEARNER",
    icon: "🥈",
    color: "text-slate-600",
    bgColor: "bg-slate-100",
  },
  actionTaker: {
    label: "ACTION TAKER",
    icon: "🥇",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
};

const StatusBadge = ({
  tier,
  compact = false,
  showProgress = false,
  progressMessage,
  progressValue = 0,
  delay = 0,
}: StatusBadgeProps) => {
  const config = tierConfig[tier];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgColor}`}
      >
        <span className="text-base">{config.icon}</span>
        <span className={`text-sm font-semibold ${config.color}`}>
          {config.label}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card rounded-xl border border-border p-5 shadow-sm"
    >
      <h2 className="font-semibold text-foreground text-lg mb-3">Your Status</h2>
      
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{config.icon}</span>
        <span className={`text-xl font-bold ${config.color}`}>
          {config.label}
        </span>
      </div>

      {progressMessage && (
        <p className="text-sm text-muted-foreground mb-4">
          {progressMessage}
        </p>
      )}

      {showProgress && (
        <div className="mt-3">
          <Progress value={progressValue} className="h-2" />
        </div>
      )}
    </motion.div>
  );
};

export default StatusBadge;
