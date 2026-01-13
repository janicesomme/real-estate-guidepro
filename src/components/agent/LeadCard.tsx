import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, MessageSquare } from "lucide-react";

interface LeadCardProps {
  name: string;
  score: string;
  path: string;
  insight: string;
  lastActive: string;
  isHot?: boolean;
  onViewProfile: () => void;
  delay?: number;
}

const LeadCard = ({ 
  name, 
  score, 
  path, 
  insight, 
  lastActive, 
  isHot = false,
  onViewProfile,
  delay = 0 
}: LeadCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">{isHot ? "🔥" : "🌡️"}</span>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-xs text-muted-foreground">{path}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
            {score}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{insight}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Active {lastActive}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            <User className="w-3 h-3 mr-1" />
            View Profile
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-3 h-3 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadCard;
