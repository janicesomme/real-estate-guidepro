import { Share2, Copy, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareSectionProps {
  variant: "assessment" | "webinar" | "referral" | "achievement";
  className?: string;
}

const ShareSection = ({ variant, className = "" }: ShareSectionProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "assessment") {
    return (
      <div className={`bg-secondary/50 rounded-xl p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Share Your Results</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Know someone else thinking about buying? Share this assessment with them.
        </p>
        <button className="px-5 py-2.5 gradient-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Assessment Link
        </button>
        <p className="text-xs text-muted-foreground mt-3">
          They'll get to take the same assessment and start their journey.
        </p>
      </div>
    );
  }

  if (variant === "webinar") {
    return (
      <div className={`bg-secondary/30 rounded-xl p-4 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-foreground text-sm">Found This Helpful?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Share this webinar with someone who's also thinking about buying.
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Webinar
        </button>
      </div>
    );
  }

  if (variant === "referral") {
    return (
      <div className={`border-2 border-primary/20 rounded-xl p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🎁</span>
          <h3 className="font-semibold text-foreground text-lg">Share & Earn</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Know someone who should take this course?
        </p>

        {/* Referral Link */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1">Your referral link:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm text-foreground font-mono truncate">
              siris.app/invite/user123
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Reward Explanation */}
        <div className="bg-primary/5 rounded-lg p-3 mb-4">
          <p className="text-sm text-foreground mb-2">
            When someone you refer completes their first webinar, you BOTH unlock:
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span>•</span>
            <span>Bonus Guide: 10 Questions to Ask Before Making an Offer</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground">Your Referrals</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-foreground">1</p>
            <p className="text-xs text-muted-foreground">Bonuses Earned</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "achievement") {
    const shareText = "I just completed Siri Solange's First-Time Buyer Mastery course — better prepared than 99% of first-time buyers! 🏠🎓";
    
    return (
      <div className={`bg-secondary/50 rounded-xl p-5 ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Share Your Achievement</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          You earned this. Show it off.
        </p>

        {/* Share Buttons */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 py-2.5 bg-[#1877F2] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Facebook className="w-4 h-4" />
            Facebook
          </button>
          <button className="flex-1 py-2.5 bg-[#0A66C2] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 bg-secondary text-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Pre-written Share Text */}
        <div className="bg-background border border-border rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Pre-written share text:</p>
          <p className="text-sm text-foreground italic">"{shareText}"</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ShareSection;
