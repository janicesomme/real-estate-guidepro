import { motion } from "framer-motion";
import { 
  Target, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  Play, 
  CalendarPlus,
  Heart,
  Home,
  ArrowRight,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import CircularProgress from "@/components/dashboard/CircularProgress";
import ChecklistItem from "@/components/dashboard/ChecklistItem";
import StatCard from "@/components/dashboard/StatCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import WebinarCard from "@/components/dashboard/WebinarCard";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const checklistItems = [
    { id: 1, text: "Completed readiness assessment", completed: true },
    { id: 2, text: "Registered for webinar", completed: true },
    { id: 3, text: "Know your credit score range", completed: true },
    { id: 4, text: "Get pre-approved for mortgage", completed: false },
    { id: 5, text: "Set your budget range", completed: false },
    { id: 6, text: "Identify target neighbourhoods", completed: false },
    { id: 7, text: "Attend first-time buyer webinar", completed: false },
    { id: 8, text: "Schedule a call with Siri", completed: false },
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-6 md:py-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-1">
              My Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Welcome back! Here's where you stand on your homebuying journey.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Last updated: January 12, 2026
            </p>
          </motion.div>

          {/* Section 1: Readiness Score Hero */}
          <Card delay={0.1} className="mb-6 text-center py-8">
            <div className="flex flex-col items-center">
              <CircularProgress score={6} maxScore={10} />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                <h2 className="text-lg font-semibold text-foreground">Your Readiness Score</h2>
                <p className="text-primary font-medium mt-1">You're closer than you think</p>
                <p className="text-xs text-muted-foreground mt-1">Based on your assessment answers</p>
              </motion.div>
              <Link
                to="/assessment"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Assessment to Update Score
              </Link>
            </div>
          </Card>

          {/* Section 2: Homebuying Checklist */}
          <Card delay={0.2} className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground text-lg">Your Homebuying Checklist</h2>
              <span className="text-sm text-muted-foreground">{completedCount} of {checklistItems.length} completed</span>
            </div>
            <Progress value={(completedCount / checklistItems.length) * 100} className="mb-4 h-2" />
            <div className="space-y-2">
              {checklistItems.map((item) => (
                <ChecklistItem key={item.id} text={item.text} completed={item.completed} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Check off items as you complete them
            </p>
          </Card>

          {/* Section 3: Your Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="font-semibold text-foreground text-lg mb-4">Your Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <StatCard
                label="Estimated Budget Range"
                value="$280,000 - $350,000"
                subtext="Based on your inputs"
                showUpdate
                delay={0.35}
              />
              <StatCard
                label="Down Payment Saved"
                value="$42,000"
                subtext="15% of target"
                showUpdate
                delay={0.4}
              />
              <StatCard
                label="Credit Score Range"
                value="Good (700-749)"
                subtext="Strong position"
                showUpdate
                delay={0.45}
              />
            </div>
            <Card animate={false} className="bg-secondary/50">
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                <p className="text-2xl font-bold text-foreground">~$1,850/month</p>
                <p className="text-xs text-muted-foreground">Principal + Interest + Taxes + Insurance estimate</p>
              </div>
            </Card>
          </motion.div>

          {/* Section 4: Recommended For You */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="font-semibold text-foreground text-lg mb-1">Recommended For You</h2>
            <p className="text-sm text-muted-foreground mb-4">Your personalized next steps</p>
            <div className="space-y-4">
              <RecommendationCard
                icon={<Target className="w-5 h-5 text-primary" />}
                title="Get Pre-Approved"
                text="You're ready for this step. It'll give you certainty on your budget and make you a stronger buyer."
                buttonText="Connect with James"
                priority
                delay={0.45}
              />
              <RecommendationCard
                icon={<Play className="w-5 h-5 text-muted-foreground" />}
                title="Learn About Down Payment Assistance"
                text="You may qualify for programs that could help you buy sooner than you think."
                buttonText="Watch 5-min Explainer"
                delay={0.5}
              />
              <RecommendationCard
                icon={<CalendarPlus className="w-5 h-5 text-muted-foreground" />}
                title="Attend the Upcoming Webinar"
                text="January 25 — Everything first-time buyers need to know"
                buttonText="Add to Calendar"
                delay={0.55}
              />
            </div>
          </motion.div>

          {/* Section 5: Your Webinars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h2 className="font-semibold text-foreground text-lg mb-4">Your Webinars</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Registered</h3>
                <WebinarCard
                  title="First-Time Buyer Secrets"
                  subtitle="January 25, 2026 at 12pm EST"
                  type="registered"
                  buttonText="Add to Calendar"
                  delay={0.55}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Watched</h3>
                <WebinarCard
                  title="Money Mindset for Buyers"
                  subtitle="Watched on January 10, 2026"
                  type="watched"
                  buttonText="Watch Again"
                  delay={0.6}
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommended</h3>
                <WebinarCard
                  title="Hidden Costs of Buying"
                  subtitle="Based on your assessment, this would help you"
                  type="recommended"
                  buttonText="Watch Now"
                  delay={0.65}
                />
              </div>
            </div>
          </motion.div>

          {/* Section 6: Market Pulse */}
          <Card delay={0.6} className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-foreground text-lg">Market Pulse</h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Updated Weekly</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Your Target Area: Austin, TX</span>
              <button className="text-xs text-primary hover:underline">Change</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Median Home Price</p>
                <p className="text-lg font-bold text-foreground">$385,000</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> 2.3% this month
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Homes on Market</p>
                <p className="text-lg font-bold text-foreground">1,247</p>
                <p className="text-xs text-muted-foreground">Active listings</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Avg. Days on Market</p>
                <p className="text-lg font-bold text-foreground">34 days</p>
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> 5 days vs last month
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">New This Week</p>
                <p className="text-lg font-bold text-foreground">89</p>
                <p className="text-xs text-muted-foreground">New listings</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground italic">
                "The market is competitive but inventory is growing. If you're pre-approved, this is a good time to start looking seriously."
              </p>
              <p className="text-sm font-medium text-primary mt-2">— Siri</p>
            </div>

            <button className="w-full py-2.5 bg-secondary text-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
              See Homes in Your Budget
              <ArrowRight className="w-4 h-4" />
            </button>
          </Card>

          {/* Section 7: Saved Homes */}
          <Card delay={0.7} className="mb-6">
            <h2 className="font-semibold text-foreground text-lg mb-4">Saved Homes</h2>
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium mb-1">You haven't saved any homes yet</p>
              <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                When you start your search, save homes here to track them and get my insights on each one.
              </p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors">
                <Home className="w-4 h-4" />
                Browse Homes in Your Budget
              </button>
            </div>
          </Card>

          {/* Section 8: Quick Actions Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <Link
              to="/assessment"
              className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Assessment
            </Link>
            <button className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Siri
            </button>
            <Link
              to="/webinars"
              className="flex-1 py-3 bg-secondary text-foreground rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              View All Webinars
            </Link>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-xs text-muted-foreground px-4"
          >
            Your progress is saved and updates as you engage with more content
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
