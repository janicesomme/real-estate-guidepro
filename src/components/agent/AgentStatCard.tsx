import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AgentStatCardProps {
  value: string;
  label: string;
  trend: string;
  trendPositive?: boolean;
  icon?: ReactNode;
  delay?: number;
}

const AgentStatCard = ({ 
  value, 
  label, 
  trend, 
  trendPositive = true,
  icon,
  delay = 0 
}: AgentStatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-lg transition-shadow"
    >
      {icon && (
        <div className="mb-2 text-primary">{icon}</div>
      )}
      <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className={`text-xs font-medium ${trendPositive ? 'text-green-600' : 'text-muted-foreground'}`}>
        {trend}
      </p>
    </motion.div>
  );
};

export default AgentStatCard;
