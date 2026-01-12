import { motion } from "framer-motion";
import { User, Building, FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

const Partners = () => {
  const partners = [
    {
      id: 1,
      name: "James Thompson",
      role: "Mortgage Loan Officer",
      description: "Making financing simple and stress-free",
      icon: Building,
      cta: "Contact James",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Home Inspector",
      description: "Thorough inspections you can trust",
      icon: FileText,
      cta: "Learn More",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Real Estate Attorney",
      description: "Protecting your biggest investment",
      icon: FileText,
      cta: "Learn More",
    },
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
              My Trusted Partners
            </h1>
            <p className="text-muted-foreground">
              Professionals I personally recommend to my clients
            </p>
          </motion.div>

          {/* Partner Cards */}
          <div className="space-y-4">
            {partners.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <Card key={partner.id} delay={0.1 + index * 0.1}>
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-7 h-7 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{partner.name}</h3>
                      <p className="text-primary text-sm font-medium">{partner.role}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        {partner.description}
                      </p>

                      <button className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                        {partner.cta}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Trust Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border"
          >
            <p className="text-sm text-muted-foreground text-center">
              These partners share my commitment to making your home-buying journey smooth
              and stress-free. I've worked with each of them personally and trust them
              completely.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;
