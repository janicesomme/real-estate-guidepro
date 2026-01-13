import { motion } from "framer-motion";
import { Trophy, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import CourseModule from "@/components/course/CourseModule";
import ShareSection from "@/components/ShareSection";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Webinars = () => {
  const modules = [
    {
      moduleNumber: 1,
      title: "What 99% of Buyers Don't Know Before They Start",
      status: "completed-live" as const,
      materials: [
        { name: "Homebuying Readiness Checklist", unlocked: true },
        { name: "BONUS: First Questions to Ask Any Agent", unlocked: true },
      ],
    },
    {
      moduleNumber: 2,
      title: "The Money Part: What You Really Need",
      status: "completed-replay" as const,
      materials: [
        { name: "Down Payment Calculator", unlocked: true },
        { name: "Assistance Program Finder", unlocked: true },
      ],
      bonusNote: "You missed the live bonus: Negotiation Scripts",
    },
    {
      moduleNumber: 3,
      title: "Pre-Approval Secrets: How to Be a Stronger Buyer",
      status: "homework-required" as const,
      materials: [
        { name: "Pre-Approval Preparation Worksheet", unlocked: false },
        { name: "Lender Comparison Template", unlocked: false },
      ],
      homeworkQuestions: [
        { question: "What's the difference between pre-qualified and pre-approved?", type: "text" as const },
        { question: "What documents will you gather this week to prepare?", type: "text" as const },
        { 
          question: "When do you plan to start the pre-approval process?", 
          type: "dropdown" as const,
          options: ["This week", "This month", "In 2-3 months", "Not sure yet"]
        },
        { question: "What's ONE action you commit to taking this week?", type: "text" as const },
      ],
    },
    {
      moduleNumber: 4,
      title: "Finding THE Home: Search Like a Pro",
      status: "locked" as const,
      materials: [
        { name: "Home Search Strategy Guide", unlocked: false },
        { name: "BONUS: Red Flags Checklist (live only)", unlocked: false },
      ],
      liveDate: "February 15, 2026 at 12pm EST",
      liveBenefits: [
        "Materials unlock immediately",
        "Live Q&A with Siri",
        "BONUS: Red Flags Checklist (live only)",
      ],
    },
    {
      moduleNumber: 5,
      title: "The Offer to Close: What Actually Happens",
      status: "locked" as const,
      materials: [
        { name: "Offer Strategy Playbook", unlocked: false },
        { name: "Closing Cost Estimator", unlocked: false },
      ],
      lockMessage: "Complete Module 4 first",
    },
    {
      moduleNumber: 6,
      title: "Beyond the Keys: What New Homeowners Must Know",
      status: "locked" as const,
      materials: [
        { name: "First 30 Days Checklist", unlocked: false },
        { name: "Home Maintenance Calendar", unlocked: false },
      ],
      lockMessage: "Complete Module 5 first",
    },
  ];

  const completedModules = 2;
  const totalModules = 6;

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-8 max-w-3xl">
          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
              FIRST-TIME BUYER MASTERY
            </h1>
            <p className="text-primary font-semibold text-lg mb-2">
              Be Better Prepared Than 99% of Buyers
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              A free 6-part webinar series that gives you everything you need to buy your first home with confidence.
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card animate={false} className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Your Progress: <span className="font-semibold text-foreground">{completedModules} of {totalModules} Completed</span>
              </p>
              <Progress value={(completedModules / totalModules) * 100} className="h-3 max-w-xs mx-auto" />
            </Card>
          </motion.div>

          {/* Important Notice Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">HOW THIS WORKS</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Each webinar unlocks exclusive tools and templates. But here's the thing:
                  </p>
                  <p className="text-sm text-foreground font-medium mb-3">
                    The materials are only valuable if you know how to use them properly.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Attend LIVE</strong> → Materials unlock immediately + bonus content + Q&A with Siri</li>
                    <li>• <strong>Watch REPLAY</strong> → Complete the homework to unlock materials</li>
                  </ul>
                  <p className="text-sm text-foreground mt-3 italic">
                    The webinar teaches you HOW to use the tools. Don't skip it.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Modules */}
          <div className="space-y-4 mb-8">
            {modules.map((module, i) => (
              <CourseModule
                key={module.moduleNumber}
                {...module}
                delay={0.2 + i * 0.1}
              />
            ))}
          </div>

          {/* Course Completion Reward Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <div className="border-2 border-yellow-400 bg-yellow-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-foreground text-lg">
                  COMPLETE ALL 6 MODULES TO UNLOCK
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                When you finish the course and all homework, you earn:
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-lg">🎓</span>
                  <span className="text-foreground">"Ready to Buy" Certification badge</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📦</span>
                  <span className="text-foreground">All 6 material kits (12+ tools and templates)</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📞</span>
                  <span className="text-foreground font-semibold">FREE 1-Hour Strategy Call with Siri</span>
                </li>
              </ul>

              <div className="bg-white border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-foreground italic">
                  "I only work closely with people who've done the preparation. When you complete this course, you'll know more than 99% of first-time buyers. That's when we should talk."
                </p>
                <p className="text-sm font-semibold text-primary mt-2">— Siri</p>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Your Progress: <span className="font-semibold text-foreground">{completedModules} of {totalModules}</span> complete. Keep going!
              </p>
            </div>
          </motion.div>

          {/* Demo Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-xs text-muted-foreground opacity-60"
          >
            Demo Version
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Webinars;
