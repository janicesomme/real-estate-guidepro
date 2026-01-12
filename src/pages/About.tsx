import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

const About = () => {
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
              About Siri
            </h1>
            <p className="text-muted-foreground">
              MD • MBA • Real Estate Professional
            </p>
          </motion.div>

          {/* Coming Soon Card */}
          <Card>
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-primary-foreground">
                  SS
                </span>
              </div>
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
