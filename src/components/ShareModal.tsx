import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shareOptions = [
  {
    id: "first-time",
    icon: "🏠",
    label: "Someone buying their first home",
    link: "siris.app/start/first-time-buyer",
  },
  {
    id: "investor",
    icon: "📈",
    label: "Someone interested in investing",
    link: "siris.app/start/investor",
  },
  {
    id: "empty-nester",
    icon: "🪺",
    label: "Parents who might be downsizing",
    link: "siris.app/start/empty-nester",
  },
  {
    id: "relocator",
    icon: "📍",
    label: "Someone relocating here",
    link: "siris.app/start/relocator",
  },
  {
    id: "general",
    icon: "🔗",
    label: "Just share the general link",
    link: "siris.app",
  },
];

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleShare = (option: typeof shareOptions[0]) => {
    navigator.clipboard.writeText(`https://${option.link}`);
    setCopiedLink(option.link);
    toast.success("Link copied! Share it however you like.");
    
    setTimeout(() => {
      setCopiedLink(null);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Share This App</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">
                Who are you sharing with?
              </p>

              <div className="space-y-3">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleShare(option)}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                    </div>
                    {copiedLink === option.link && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </button>
                ))}
              </div>

              {copiedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-sm text-green-700 text-center">
                    Link copied! Share it however you like.
                  </p>
                  <p className="text-xs text-green-600 text-center mt-1 font-mono">
                    https://{copiedLink}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
