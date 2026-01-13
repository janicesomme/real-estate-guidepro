import { motion } from "framer-motion";

interface FunnelStep {
  label: string;
  value: number;
  percentage: number;
}

interface ConversionFunnelProps {
  steps: FunnelStep[];
}

const ConversionFunnel = ({ steps }: ConversionFunnelProps) => {
  const maxValue = Math.max(...steps.map(s => s.value));

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="w-32 text-sm text-right text-muted-foreground shrink-0">
            {step.label}
          </div>
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 bg-secondary rounded-full h-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${step.percentage}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </div>
            <div className="w-12 text-sm font-bold text-foreground">
              {step.value}
            </div>
            <div className="w-12 text-xs text-muted-foreground">
              {step.percentage}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ConversionFunnel;
