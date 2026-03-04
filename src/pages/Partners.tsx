import { motion } from "framer-motion";
import { Phone, Mail, Star, FileText, User, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { useAgent } from "@/context/AgentContext";

const Partners = () => {
  const { agent } = useAgent();
  const firstName = agent.name.split(" ")[0];

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

          {/* James — featured partner */}
          <Card delay={0.1} className="mb-4 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shrink-0 text-primary-foreground font-bold text-lg">
                JT
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-foreground text-lg">James Hair</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wide">
                    <Star className="w-2.5 h-2.5" /> {firstName}'s #1 Pick
                  </span>
                </div>
                <p className="text-primary text-sm font-medium mb-1">Mortgage Loan Officer</p>
                <p className="text-muted-foreground text-sm mb-4">
                  James has helped hundreds of buyers secure financing — including many of my clients. He explains everything clearly, finds rates other brokers can't, and makes the process stress-free.
                </p>
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href="tel:+61400000000" className="hover:text-foreground transition-colors">
                      0400 000 000
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <a href="mailto:james@jamesloans.com.au" className="hover:text-foreground transition-colors">
                      james@jamesloans.com.au
                    </a>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="tel:+61400000000"
                    className="inline-flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-4 h-4" />
                    Call James
                  </a>
                  <a
                    href="mailto:james@jamesloans.com.au"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl font-medium text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email James
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Other partners */}
          {[
            {
              initials: "SM",
              name: "Sarah Mitchell",
              role: "Building & Pest Inspector",
              description: "Thorough inspections — she's found issues that saved my clients tens of thousands.",
            },
            {
              initials: "MC",
              name: "Michael Chen",
              role: "Conveyancer",
              description: "Protecting your biggest investment with clear, plain-English advice.",
            },
          ].map((partner, index) => (
            <Card key={partner.name} delay={0.2 + index * 0.1} className="mb-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                  {partner.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{partner.name}</h3>
                  <p className="text-primary text-sm font-medium">{partner.role}</p>
                  <p className="text-muted-foreground text-sm mt-1 mb-4">{partner.description}</p>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {/* Trust note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border"
          >
            <p className="text-sm text-muted-foreground text-center">
              I recommend these people to my clients because I've seen them deliver. Not because of referral fees.
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Partners;
