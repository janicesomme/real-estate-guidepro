import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  buttonText: string;
  buttonTo?: string;
  priority?: boolean;
  delay?: number;
}

const RecommendationCard = ({
  icon,
  title,
  text,
  buttonText,
  buttonTo,
  priority = false,
  delay = 0
}: RecommendationCardProps) => {
  const buttonClass = cn(
    "text-sm font-medium px-4 py-2 rounded-lg transition-colors",
    priority
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "bg-secondary text-foreground hover:bg-secondary/80"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "rounded-xl p-5 border transition-all hover:shadow-lg",
        priority
          ? "bg-primary/5 border-primary/30 shadow-md"
          : "bg-card border-border shadow-card"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          priority ? "bg-primary/20" : "bg-secondary"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground mb-3">{text}</p>
          {buttonTo ? (
            <Link to={buttonTo} className={buttonClass}>{buttonText}</Link>
          ) : (
            <button className={buttonClass}>{buttonText}</button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
