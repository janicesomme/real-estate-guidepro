import { motion } from "framer-motion";
import { ClipboardCheck, Video, LayoutDashboard, Users, Home, Tag, Calculator } from "lucide-react";
import Layout from "@/components/Layout";
import CTAButton from "@/components/CTAButton";
import PathIndicator from "@/components/PathIndicator";
import { useAgent } from "@/context/AgentContext";

const Index = () => {
  const { agent } = useAgent();

  return (
    <Layout>
      <div className="gradient-hero min-h-screen md:pt-16">
        {/* Hero Section */}
        <div className="container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Photo */}
            {agent.photo_url && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                src={agent.photo_url}
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20"
              />
            )}

            {/* Name */}
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-3">
              {agent.name.toUpperCase()}
            </h1>

            {/* Credentials */}
            {agent.credentials && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-medium text-sm md:text-base tracking-widest mb-4"
              >
                {agent.credentials}
              </motion.p>
            )}
            {agent.brokerage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="text-muted-foreground text-sm mb-4"
              >
                {agent.brokerage}
              </motion.p>
            )}

            {/* Path Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <PathIndicator />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6 px-4"
            >
              Helping first-time buyers, investors, and empty nesters find their
              perfect homes
            </motion.p>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-10 md:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <span className="text-lg">🥈</span>
                <span className="text-sm font-semibold text-slate-600">Your Status: LEARNER</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Complete 2 more webinars to become an Action Taker
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="max-w-md mx-auto space-y-3 px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CTAButton
                to="/assessment"
                variant="primary"
                icon={<ClipboardCheck className="w-5 h-5" />}
              >
                Am I Ready to Buy My First Home?
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CTAButton
                to="/webinars"
                variant="outline"
                icon={<Video className="w-5 h-5" />}
              >
                Join My Next Webinar
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CTAButton
                to="/dashboard"
                variant="outline"
                icon={<LayoutDashboard className="w-5 h-5" />}
              >
                My Dashboard
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CTAButton
                to="/partners"
                variant="outline"
                icon={<Users className="w-5 h-5" />}
              >
                Meet My Trusted Partners
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <CTAButton
                to="/find-your-home"
                variant="outline"
                icon={<Home className="w-5 h-5" />}
              >
                🏠 Let Me Find Your Home
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <CTAButton
                to="/selling"
                variant="outline"
                icon={<Tag className="w-5 h-5" />}
              >
                🏷️ Thinking of Selling?
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <CTAButton
                to="/true-cost-calculator"
                variant="outline"
                icon={<Calculator className="w-5 h-5" />}
              >
                💰 True Cost Calculator
              </CTAButton>
            </motion.div>
          </div>

          {/* Demo Version Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-muted-foreground mt-16 opacity-60"
          >
            Demo Version
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
