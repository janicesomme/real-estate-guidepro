import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebinarCardProps {
  title: string;
  subtitle: string;
  type: "registered" | "watched" | "recommended";
  buttonText: string;
  delay?: number;
}

const WebinarCard = ({ 
  title, 
  subtitle, 
  type,
  buttonText,
  delay = 0 
}: WebinarCardProps) => {
  const icons = {
    registered: <Calendar className="w-5 h-5 text-primary" />,
    watched: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    recommended: <Lightbulb className="w-5 h-5 text-amber-500" />
  };

  const badges = {
    registered: { text: "You're registered!", color: "bg-primary/10 text-primary" },
    watched: { text: "Completed", color: "bg-green-100 text-green-700" },
    recommended: { text: "For you", color: "bg-amber-100 text-amber-700" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          {icons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm mb-1 truncate">{title}</h4>
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
          <span className={cn(
            "inline-block text-xs px-2 py-0.5 rounded-full mb-3",
            badges[type].color
          )}>
            {badges[type].text}
          </span>
          <button className="block w-full text-sm font-medium px-3 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
            {buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WebinarCard;
