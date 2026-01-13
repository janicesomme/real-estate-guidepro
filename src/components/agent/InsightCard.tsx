import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InsightCardProps {
  title: string;
  mainStat: string;
  subStats: string[];
  icon?: ReactNode;
  delay?: number;
}

const InsightCard = ({ 
  title, 
  mainStat, 
  subStats, 
  icon,
  delay = 0 
}: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-card rounded-xl p-5 shadow-card border border-border"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
      </div>
      <p className="text-lg font-semibold text-foreground mb-2">{mainStat}</p>
      <div className="space-y-1">
        {subStats.map((stat, index) => (
          <p key={index} className="text-xs text-muted-foreground">{stat}</p>
        ))}
      </div>
    </motion.div>
  );
};

export default InsightCard;
