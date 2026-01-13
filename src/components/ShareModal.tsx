import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Copy, Check } from "lucide-react";
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
    link: "https://siris.app/start/first-time-buyer",
    text: "Hey! I found this app that helps first-time home buyers get prepared. Check it out!",
  },
  {
    id: "investor",
    icon: "📈",
    label: "Someone interested in investing",
    link: "https://siris.app/start/investor",
    text: "Thought you might like this — it's an app for real estate investors.",
  },
  {
    id: "empty-nester",
    icon: "🪺",
    label: "Parents who might be downsizing",
    link: "https://siris.app/start/empty-nester",
    text: "This app helps empty nesters find their next home. Made me think of you!",
  },
  {
    id: "relocator",
    icon: "📍",
    label: "Someone relocating here",
    link: "https://siris.app/start/relocator",
    text: "If you're moving to the area, this app is super helpful!",
  },
  {
    id: "general",
    icon: "🔗",
    label: "Just share the general link",
    link: "https://siris.app",
    text: "Check out this real estate app from Siri Solange!",
  },
];

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (option: typeof shareOptions[0]) => {
    setIsSharing(true);

    // Check if Web Share API is available
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Siri Solange Real Estate App",
          text: option.text,
          url: option.link,
        });
        toast.success("Shared successfully!");
        onClose();
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== "AbortError") {
          // Fall back to copy if share failed (not cancelled)
          handleCopyFallback(option);
        }
      }
    } else {
      // Fall back to clipboard copy for browsers without Web Share API
      handleCopyFallback(option);
    }

    setIsSharing(false);
  };

  const handleCopyFallback = (option: typeof shareOptions[0]) => {
    navigator.clipboard.writeText(option.link);
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
                    disabled={isSharing}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm font-medium text-foreground">
                        {option.label}
                      </span>
                    </div>
                    {copiedLink === option.link ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Share2 className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>

              {copiedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Link copied! Share it however you like.
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono truncate max-w-[250px]">
                        {copiedLink}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(copiedLink);
                        toast.success("Copied again!");
                      }}
                      className="p-2 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </button>
                  </div>
                </motion.div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4">
                {navigator.share ? "Opens your device's share menu" : "Link will be copied to clipboard"}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
