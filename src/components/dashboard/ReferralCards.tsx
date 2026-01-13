import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Home } from "lucide-react";
import ShareModal from "@/components/ShareModal";

const ReferralCards = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareContext, setShareContext] = useState<"buyer" | "seller">("buyer");

  const openShareForBuyer = () => {
    setShareContext("buyer");
    setShareModalOpen(true);
  };

  const openShareForSeller = () => {
    setShareContext("seller");
    setShareModalOpen(true);
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-6"
      >
        <h2 className="font-semibold text-foreground text-lg mb-1 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Know Someone Buying or Selling?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Referrals are the best compliment. Thank you for thinking of me!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Buyer Card */}
          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Know Someone Buying?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send them to my app — I'll help them find the perfect home.
            </p>
            <button
              onClick={openShareForBuyer}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Share Buyer Link
            </button>
          </div>

          {/* Seller Card */}
          <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Know Someone Selling?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              I'd love to help them get top dollar for their home.
            </p>
            <button
              onClick={openShareForSeller}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Share Seller Link
            </button>
          </div>
        </div>
      </motion.section>

      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
      />
    </>
  );
};

export default ReferralCards;
