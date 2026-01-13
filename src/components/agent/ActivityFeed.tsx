import { motion } from "framer-motion";

interface Activity {
  time: string;
  description: string;
  icon: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border hover:bg-secondary/30 transition-colors"
        >
          <span className="text-lg shrink-0">{activity.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;
