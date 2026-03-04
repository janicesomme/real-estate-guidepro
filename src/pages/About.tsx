import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { useAgent } from "@/context/AgentContext";

const About = () => {
  const { agent } = useAgent();
  const initials = agent.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-8 max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              About {agent.name.split(" ")[0]}
            </h1>
            {agent.credentials && (
              <p className="text-muted-foreground">{agent.credentials}</p>
            )}
            {agent.brokerage && (
              <p className="text-sm text-muted-foreground">{agent.brokerage}</p>
            )}
          </motion.div>

          {/* Coming Soon Card */}
          <Card>
            <div className="text-center py-12">
              {agent.photo_url ? (
                <img
                  src={agent.photo_url}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-6 border-4 border-primary/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-display font-bold text-primary-foreground">
                    {initials}
                  </span>
                </div>
              )}
              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                Content Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                I'm working on sharing my story — from medicine to real estate, and why I'm
                passionate about helping first-time buyers and investors make confident
                decisions.
              </p>
            </div>
          </Card>

          {/* Quick Facts Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <span className="text-2xl font-bold text-primary">MD</span>
              <p className="text-xs text-muted-foreground mt-1">Medical Degree</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <span className="text-2xl font-bold text-primary">MBA</span>
              <p className="text-xs text-muted-foreground mt-1">Business Administration</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/50">
              <span className="text-2xl font-bold text-primary">RE</span>
              <p className="text-xs text-muted-foreground mt-1">Real Estate Pro</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
