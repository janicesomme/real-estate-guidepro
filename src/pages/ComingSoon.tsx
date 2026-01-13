import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Construction, ArrowLeft, Bell } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const pathNames: Record<string, string> = {
  investor: "Investor",
  "empty-nester": "Empty Nester",
  relocator: "Relocator",
  upsizer: "Upsizer",
};

const ComingSoon = () => {
  const navigate = useNavigate();
  const { pathId } = useParams();
  const [email, setEmail] = useState("");

  const pathName = pathNames[pathId || ""] || "Selected";

  const handleNotify = () => {
    if (email) {
      toast.success("You'll be notified when this path launches!");
      setEmail("");
    }
  };

  return (
    <Layout hideFloatingButton>
      <div className="gradient-hero min-h-screen">
        <div className="container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
            >
              <Construction className="w-10 h-10 text-primary" />
            </motion.div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Coming Soon!
            </h1>

            <p className="text-lg text-muted-foreground mb-2">
              The <span className="font-semibold text-foreground">{pathName}</span> experience is launching soon.
            </p>

            <p className="text-muted-foreground mb-8">
              Want to be notified when it's ready?
            </p>

            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleNotify} className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              In the meantime, explore the First-Time Buyer path to see how the app works.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/home")}
                className="w-full"
                size="lg"
              >
                🏠 Explore First-Time Buyer Path
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Choose a Different Path
              </Button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-xs text-muted-foreground mt-16 opacity-60"
            >
              Demo Version
            </motion.p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoon;
