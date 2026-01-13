import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ShareModal from "@/components/ShareModal";

const otherPaths = [
  { icon: "📈", label: "Investors" },
  { icon: "🪺", label: "Empty Nesters" },
  { icon: "📍", label: "Relocators" },
  { icon: "🏡", label: "Upsizers" },
];

const OtherPathsSection = () => {
  const navigate = useNavigate();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Explore Other Paths</h2>
        </div>

        <p className="text-muted-foreground mb-4">
          You're on the First-Time Buyer path. Siri also helps:
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {otherPaths.map((path) => (
            <div
              key={path.label}
              className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
            >
              <span className="text-lg">{path.icon}</span>
              <span className="text-sm text-foreground">{path.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsShareModalOpen(true)}
          >
            Share This App
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/")}
          >
            Switch My Path
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Know someone who fits one of these? Share the app with them!
        </p>
      </motion.section>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

export default OtherPathsSection;
