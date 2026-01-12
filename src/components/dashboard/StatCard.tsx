import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon?: ReactNode;
  showUpdate?: boolean;
  change?: {
    value: string;
    positive?: boolean;
  };
  delay?: number;
}

const StatCard = ({ 
  label, 
  value, 
  subtext, 
  icon,
  showUpdate = false,
  change,
  delay = 0 
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-lg transition-shadow"
    >
      {icon && (
        <div className="mb-2">{icon}</div>
      )}
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-foreground mb-1">{value}</p>
      <div className="flex items-center justify-between">
        {change ? (
          <p className={`text-xs ${change.positive ? 'text-green-600' : 'text-amber-600'}`}>
            {change.value}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">{subtext}</p>
        )}
        {showUpdate && (
          <button className="text-xs text-primary hover:underline">Update</button>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
