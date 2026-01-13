import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const priorities = [
  { id: "schools", label: "Good school district" },
  { id: "move-in-ready", label: "Low maintenance / move-in ready" },
  { id: "yard", label: "Large yard / outdoor space" },
  { id: "garage", label: "Garage / parking" },
  { id: "office", label: "Home office space" },
  { id: "transit", label: "Near public transit" },
  { id: "quiet", label: "Quiet neighborhood" },
  { id: "investment", label: "Investment potential" },
];

const FindYourHome = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your criteria has been sent to Siri!", {
      description: "Expect to hear back within 24 hours.",
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
              <Home className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              🏠 Let Me Find Your Home
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Stop scrolling through hundreds of listings. Tell me what you want and I'll find it for you.
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              I'll personally search for homes that match YOUR criteria and send you only the ones worth seeing. No spam. No junk. Just the right homes.
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
              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  What area(s) are you interested in?
                </label>
                <Input
                  placeholder="e.g., Downtown, Westside, Near good schools..."
                  className="bg-background"
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  💰 What's your budget range?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="$200,000" className="bg-background" />
                  <Input placeholder="$400,000" className="bg-background" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Min / Max</p>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    🛏️ Bedrooms needed
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

              {/* Priorities */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  ⭐ What's most important to you?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {priorities.map((priority) => (
                    <div
                      key={priority.id}
                      className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => togglePriority(priority.id)}
                    >
                      <Checkbox
                        id={priority.id}
                        checked={selectedPriorities.includes(priority.id)}
                        onCheckedChange={() => togglePriority(priority.id)}
                      />
                      <label
                        htmlFor={priority.id}
                        className="text-sm text-foreground cursor-pointer flex-1"
                      >
                        {priority.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  📝 Anything else I should know?
                </label>
                <Textarea
                  placeholder="Tell me about your dream home, must-haves, deal-breakers..."
                  className="bg-background min-h-[100px]"
                />
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
                Send My Criteria to Siri
              </Button>
            </div>
          </motion.form>

          {/* Below Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              I personally review every request. Expect to hear from me within 24 hours with homes that match what you're looking for.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 inline-flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">
                Have questions first?{" "}
                <Link to="/home" className="text-primary font-medium hover:underline">
                  Ask Siri
                </Link>{" "}
                before submitting.
              </span>
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

export default FindYourHome;
