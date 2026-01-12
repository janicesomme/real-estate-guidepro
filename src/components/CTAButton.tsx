import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CTAButtonProps {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  icon?: ReactNode;
  showArrow?: boolean;
  className?: string;
}

const CTAButton = ({
  to,
  children,
  variant = "primary",
  icon,
  showArrow = true,
  className = "",
}: CTAButtonProps) => {
  const baseStyles =
    "flex items-center justify-between w-full px-5 py-4 rounded-xl font-medium text-left transition-all duration-200";

  const variants = {
    primary:
      "gradient-primary text-primary-foreground shadow-button hover:opacity-90 active:scale-[0.98]",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
    outline:
      "bg-card border-2 border-border text-foreground hover:border-primary hover:bg-primary/5 active:scale-[0.98]",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
        <div className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
        </div>
        {showArrow && <ChevronRight className="w-5 h-5 flex-shrink-0 opacity-70" />}
      </Link>
    </motion.div>
  );
};

export default CTAButton;
