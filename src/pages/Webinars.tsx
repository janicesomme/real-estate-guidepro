import { motion } from "framer-motion";
import { Calendar, Clock, Play, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

const Webinars = () => {
  const upcomingWebinar = {
    title: "What Every First-Time Buyer Needs to Know (Before You Start Looking)",
    description:
      "The questions you didn't know to ask — and the mistakes that cost buyers thousands",
    date: "January 25, 2026",
    time: "12pm EST",
  };

  const pastWebinars = [
    { id: 1, title: "Understanding Mortgage Pre-Approval" },
    { id: 2, title: "Hidden Costs of Home Buying" },
    { id: 3, title: "Down Payment Assistance Programs Explained" },
    { id: 4, title: "Navigating Your First Home Purchase" },
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
              Learn with Siri
            </h1>
            <p className="text-muted-foreground">
              Free webinars to help you buy with confidence
            </p>
          </motion.div>

          {/* Featured Upcoming Webinar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 md:p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-primary-foreground text-xs font-medium mb-4">
                  UPCOMING
                </span>

                <h2 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-3">
                  {upcomingWebinar.title}
                </h2>

                <p className="text-primary-foreground/80 text-sm mb-6">
                  {upcomingWebinar.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{upcomingWebinar.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/90">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{upcomingWebinar.time}</span>
                  </div>
                </div>

                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors">
                  Register Now — It's Free
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Past Webinars */}
          <div>
            <h2 className="font-semibold text-foreground text-lg mb-4">Past Webinars</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {pastWebinars.map((webinar, index) => (
                <Card key={webinar.id} delay={0.2 + index * 0.1}>
                  <div className="flex flex-col">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                      <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center relative z-10">
                        <Play className="w-6 h-6 text-primary-foreground ml-1" />
                      </div>
                    </div>

                    <h3 className="font-medium text-foreground text-sm mb-3">
                      {webinar.title}
                    </h3>

                    <button className="w-full py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80 transition-colors">
                      Watch Replay
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Webinars;
