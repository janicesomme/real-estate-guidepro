import { motion } from "framer-motion";
import { Trophy, Gift, Award, Calendar, CheckCircle, Download } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import ShareSection from "@/components/ShareSection";

const ActionTaker = () => {
  const stats = [
    { label: "Webinars Completed", value: "6 of 6" },
    { label: "Homework Submitted", value: "100%" },
    { label: "Commitments Kept", value: "87%" },
    { label: "Ready to Buy Score", value: "9/10" },
  ];

  const rewards = [
    { icon: Download, label: "All course materials", status: "UNLOCKED" },
    { icon: Award, label: '"Ready to Buy" certification', status: "EARNED" },
    { icon: Calendar, label: "1-Hour Strategy Call with Siri", status: "AVAILABLE" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-8 max-w-2xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              🏆
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2"
            >
              CONGRATULATIONS!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-primary"
            >
              You're officially an ACTION TAKER.
            </motion.p>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
              You've done the work. You've proven you're serious. You're better prepared than{" "}
              <span className="font-semibold text-foreground">99% of first-time buyers</span>.
            </p>
          </motion.div>

          {/* Stats */}
          <Card delay={0.6} className="mb-6">
            <h2 className="font-semibold text-foreground text-lg mb-4 text-center">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center p-3 bg-secondary/50 rounded-lg"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Rewards */}
          <Card delay={0.9} className="mb-6">
            <h2 className="font-semibold text-foreground text-lg mb-4 text-center">You've Earned</h2>
            <div className="space-y-3">
              {rewards.map((reward, i) => (
                <motion.div
                  key={reward.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{reward.label}</p>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {reward.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-8"
          >
            <button className="w-full py-4 gradient-primary text-primary-foreground rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Book Your Strategy Call
            </button>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-6"
          >
            <p className="text-foreground italic leading-relaxed">
              "You did what most people won't. You prepared. You learned. You took action. Now let's find you a home."
            </p>
            <p className="text-primary font-semibold mt-3">— Siri</p>
          </motion.div>

          {/* Share Achievement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mb-8"
          >
            <ShareSection variant="achievement" />
          </motion.div>

          {/* Demo Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="text-center text-xs text-muted-foreground mt-8 opacity-60"
          >
            Demo Version
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default ActionTaker;
