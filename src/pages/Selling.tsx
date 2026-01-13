import { motion } from "framer-motion";
import { Tag, Home, MessageCircle, BarChart3, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Selling = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your property details have been submitted!", {
      description: "You'll receive your free home value report within 24-48 hours.",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-8 md:py-12 max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
              <Tag className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              🏷️ Thinking of Selling?
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Curious what your home could sell for? Get a free, no-obligation value estimate.
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Whether you're seriously considering selling or just exploring your options, I'll give you an honest assessment of your home's value in today's market.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 md:p-8"
          >
            <div className="space-y-6">
              {/* Property Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Home className="w-4 h-4 inline mr-2" />
                  Your property address
                </label>
                <Input
                  placeholder="123 Main Street, City, State ZIP"
                  className="bg-background"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  🏠 Property type
                </label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select property type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="condo">Condo/Townhouse</SelectItem>
                    <SelectItem value="multi-family">Multi-Family</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    🛏️ Bedrooms
                  </label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5+">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    🚿 Bathrooms
                  </label>
                  <Select>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="1.5">1.5</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="2.5">2.5</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Square Footage & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    📐 Approximate square footage
                  </label>
                  <Input
                    placeholder="e.g., 1,800 sq ft"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    📅 Year built (if known)
                  </label>
                  <Input
                    placeholder="e.g., 1995"
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Recent Upgrades */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ✨ Any recent upgrades or renovations?
                </label>
                <Textarea
                  placeholder="e.g., New roof 2023, kitchen remodel, updated bathrooms..."
                  className="bg-background min-h-[80px]"
                />
              </div>

              {/* Why Selling */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  💭 Why are you considering selling?
                </label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select reason..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downsizing">Downsizing / empty nester</SelectItem>
                    <SelectItem value="relocating">Relocating for work</SelectItem>
                    <SelectItem value="upgrading">Upgrading to a larger home</SelectItem>
                    <SelectItem value="financial">Financial reasons</SelectItem>
                    <SelectItem value="curious">Just curious about value</SelectItem>
                    <SelectItem value="inherited">Inherited property</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ⏰ How soon are you thinking of selling?
                </label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select timeline..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="3-months">Within 3 months</SelectItem>
                    <SelectItem value="6-months">Within 6 months</SelectItem>
                    <SelectItem value="1-year">Within a year</SelectItem>
                    <SelectItem value="exploring">Just exploring / no timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Info */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">Your contact info</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ✉️ Your email
                    </label>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      📱 Your phone (optional)
                    </label>
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full py-6 text-base font-semibold">
                Get My Free Home Value Report
              </Button>
            </div>
          </motion.form>

          {/* Below Form - Trust Builder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <p className="text-sm text-muted-foreground text-center mb-4">
              I'll personally review your property details and send you a detailed value estimate within 24-48 hours. No automated guesses — a real analysis from a real professional.
            </p>

            {/* What You'll Receive */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">What You'll Receive:</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Estimated market value range",
                  "Recent comparable sales in your area",
                  "Current market conditions",
                  "Recommendations for maximizing value",
                  "No obligation, no pressure",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ask Siri */}
            <div className="text-center">
              <div className="bg-secondary/50 rounded-xl p-4 inline-flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">
                  Questions?{" "}
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('openAskSiri'))}
                    className="text-primary font-medium hover:underline"
                  >
                    Ask Siri
                  </button>{" "}
                  — I'm happy to chat before you submit.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Demo Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-muted-foreground mt-12 opacity-60"
          >
            Demo Version
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default Selling;
