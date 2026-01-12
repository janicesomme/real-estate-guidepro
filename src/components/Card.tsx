import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const Card = ({ children, className = "", animate = true, delay = 0 }: CardProps) => {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        className={`bg-card rounded-2xl p-5 shadow-card border border-border ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`bg-card rounded-2xl p-5 shadow-card border border-border ${className}`}>
      {children}
    </div>
  );
};

export default Card;
