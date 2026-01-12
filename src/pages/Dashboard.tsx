import { motion } from "framer-motion";
import { Target, ClipboardCheck, Video, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

const Dashboard = () => {
  // Mock data
  const dashboardData = {
    readinessScore: 6,
    assessmentsCompleted: 1,
    webinarsRegistered: 0,
    nextStep: "Register for First-Time Buyer Webinar",
  };

  const actionItems = [
    { id: 1, text: "Learn about down payment assistance programs", done: false },
    { id: 2, text: "Check your credit score", done: false },
    { id: 3, text: "Register for upcoming webinar", done: false },
  ];

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
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your journey toward homeownership
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card delay={0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {dashboardData.readinessScore}
                  <span className="text-lg text-muted-foreground">/10</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Readiness Score</p>
              </div>
            </Card>

            <Card delay={0.2}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-3">
                  <ClipboardCheck className="w-7 h-7 text-accent" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {dashboardData.assessmentsCompleted}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Assessments</p>
              </div>
            </Card>

            <Card delay={0.3}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary mb-3">
                  <Video className="w-7 h-7 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {dashboardData.webinarsRegistered}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Webinars Registered</p>
              </div>
            </Card>

            <Card delay={0.4}>
              <div className="text-center h-full flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-2">Next Step</p>
                <Link
                  to="/webinars"
                  className="text-primary font-medium text-sm flex items-center justify-center gap-1 hover:underline"
                >
                  Register for Webinar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>

          {/* Action Items */}
          <Card delay={0.5}>
            <h2 className="font-semibold text-foreground text-lg mb-4">Your Action Items</h2>
            <ul className="space-y-3">
              {actionItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <CheckCircle2
                    className={`w-5 h-5 flex-shrink-0 ${
                      item.done ? "text-primary" : "text-muted-foreground/40"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      item.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-8 px-4"
          >
            Your progress is saved and updates as you engage with more content
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
