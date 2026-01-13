import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ChevronDown } from "lucide-react";

const FloatingAskSiri = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState("general");

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-8 right-4 z-50 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-lg shadow-primary/30 flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-[9px] font-medium -mt-0.5">Ask Siri</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Form Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-0 left-0 right-0 md:bottom-8 md:right-4 md:left-auto md:w-96 z-50"
          >
            <div className="bg-card border-t md:border md:rounded-xl shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Ask Siri</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Have a question? Just ask. I personally read and respond to every message.
                </p>

                {/* Text Area */}
                <textarea
                  placeholder="Type your question here..."
                  className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                {/* Topic Dropdown */}
                <div className="mt-3 relative">
                  <label className="text-xs text-muted-foreground mb-1 block">About:</label>
                  <div className="relative">
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-2.5 pr-10 rounded-lg border border-border bg-background text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="general">General</option>
                      <option value="assessment">My Assessment</option>
                      <option value="webinar">Webinar Content</option>
                      <option value="next-steps">Next Steps</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Submit */}
                <button className="w-full mt-4 py-3 gradient-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Send Question
                </button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Usually responds within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAskSiri;
