import { motion } from "framer-motion";
import { Check, Lock, Eye, Calendar, Download, AlertTriangle, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

type ModuleStatus = "completed-live" | "completed-replay" | "homework-required" | "locked";

interface Material {
  name: string;
  unlocked: boolean;
}

interface CourseModuleProps {
  moduleNumber: number;
  title: string;
  status: ModuleStatus;
  materials: Material[];
  liveDate?: string;
  liveBenefits?: string[];
  bonusNote?: string;
  homeworkQuestions?: { question: string; type: "text" | "dropdown"; options?: string[] }[];
  lockMessage?: string;
  delay?: number;
}

const statusConfig = {
  "completed-live": {
    label: "COMPLETED (Live Attendee)",
    icon: Check,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
  },
  "completed-replay": {
    label: "COMPLETED (Watched Replay)",
    icon: Check,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
  },
  "homework-required": {
    label: "REPLAY WATCHED — HOMEWORK REQUIRED",
    icon: Eye,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
  },
  locked: {
    label: "LOCKED",
    icon: Lock,
    bgColor: "bg-muted/50",
    borderColor: "border-border",
    iconColor: "text-muted-foreground",
  },
};

const CourseModule = ({
  moduleNumber,
  title,
  status,
  materials,
  liveDate,
  liveBenefits,
  bonusNote,
  homeworkQuestions,
  lockMessage,
  delay = 0,
}: CourseModuleProps) => {
  const [showHomework, setShowHomework] = useState(false);
  const [showAskSiri, setShowAskSiri] = useState(false);
  const config = statusConfig[status];
  const StatusIcon = config.icon;
  const isLocked = status === "locked";
  const isHomeworkRequired = status === "homework-required";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-xl border-2 ${config.borderColor} ${config.bgColor} overflow-hidden`}
    >
      {/* Header */}
      <div className={`p-4 md:p-5 ${isLocked ? "opacity-60" : ""}`}>
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isLocked ? "bg-muted" : "bg-white shadow-sm"
            }`}
          >
            <StatusIcon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground">
                MODULE {moduleNumber}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  status === "completed-live" || status === "completed-replay"
                    ? "bg-green-100 text-green-700"
                    : status === "homework-required"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {status === "completed-live" ? "✅ COMPLETED" : 
                 status === "completed-replay" ? "✅ COMPLETED" :
                 status === "homework-required" ? "👀 HOMEWORK REQUIRED" : "🔒 LOCKED"}
              </span>
            </div>
            <h3 className={`font-semibold text-lg mt-1 ${isLocked ? "text-muted-foreground" : "text-foreground"}`}>
              {title}
            </h3>
          </div>
        </div>

        {/* Status-specific content */}
        {status === "completed-live" && (
          <p className="text-sm text-green-700 mb-3">Live attendee — All materials unlocked!</p>
        )}

        {status === "completed-replay" && (
          <>
            <p className="text-sm text-green-700 mb-2">Homework completed — Materials unlocked</p>
            {bonusNote && (
              <p className="text-xs text-muted-foreground italic mb-3">{bonusNote}</p>
            )}
          </>
        )}

        {isHomeworkRequired && (
          <div className="mb-3">
            <p className="text-sm text-amber-700 mb-2">
              You watched the replay! To unlock your materials, complete the homework.
            </p>
            <button
              onClick={() => setShowHomework(!showHomework)}
              className="text-sm font-medium text-primary hover:underline"
            >
              {showHomework ? "Hide Homework" : "Complete Homework →"}
            </button>
          </div>
        )}

        {isLocked && (
          <div className="space-y-2">
            {lockMessage && (
              <p className="text-sm text-muted-foreground">{lockMessage}</p>
            )}
            {liveDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground">Next live: {liveDate}</span>
              </div>
            )}
            {liveBenefits && liveBenefits.length > 0 && (
              <div className="mt-3 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Live benefits:</p>
                {liveBenefits.map((benefit, i) => (
                  <p key={i} className="text-xs text-muted-foreground">• {benefit}</p>
                ))}
              </div>
            )}
            {liveDate && (
              <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  The Q&A portion is NOT included in the replay
                </p>
              </div>
            )}
          </div>
        )}

        {/* Materials */}
        <div className="mt-4 space-y-2">
          {materials.map((material, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 text-sm ${
                material.unlocked ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {material.unlocked ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span className={material.unlocked ? "" : "opacity-60"}>
                {material.name}
              </span>
              {material.unlocked && (
                <button className="text-xs text-primary hover:underline ml-auto flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Download
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Action button */}
        {(status === "completed-live" || status === "completed-replay") && (
          <div className="mt-4 space-y-3">
            <button className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
              Watch Replay
            </button>
            
            {/* Ask Siri & Share for completed modules */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setShowAskSiri(!showAskSiri)}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Something Unclear?
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                <Share2 className="w-4 h-4" />
                Share Webinar
              </button>
            </div>
          </div>
        )}

        {isLocked && liveDate && (
          <button className="mt-4 w-full md:w-auto px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            Register for Live — Free
          </button>
        )}
      </div>

      {/* Ask Siri Section for completed modules */}
      {(status === "completed-live" || status === "completed-replay") && showAskSiri && (
        <div className="border-t border-green-200 bg-white p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-foreground text-sm">Something Unclear?</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            This module covered a lot. If anything didn't make sense, ask before moving on.
          </p>
          <textarea
            placeholder="What's your question about this module?"
            className="w-full min-h-[60px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm mb-3"
          />
          <button className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Ask Siri
          </button>
        </div>
      )}

      {/* Homework Form */}
      {isHomeworkRequired && showHomework && homeworkQuestions && (
        <div className="border-t border-amber-200 bg-white p-4 md:p-5">
          <h4 className="font-semibold text-foreground mb-4">COMPLETE YOUR HOMEWORK</h4>
          <div className="space-y-4">
            {homeworkQuestions.map((q, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {q.question}
                </label>
                {q.type === "text" ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Your answer..."
                  />
                ) : (
                  <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="">Select an option...</option>
                    {q.options?.map((opt, j) => (
                      <option key={j} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Submit & Unlock Materials
            </button>

            {/* Ask Siri after Homework */}
            <div className="mt-4 pt-4 border-t border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <h5 className="font-medium text-foreground text-sm">Anything Else?</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                You've completed the homework — nice work. If you have any lingering questions before moving on, ask now.
              </p>
              <textarea
                placeholder="Any questions?"
                className="w-full min-h-[50px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm mb-2"
              />
              <button className="px-4 py-2 border border-primary text-primary rounded-lg font-medium text-sm hover:bg-primary/5 transition-colors">
                Ask Siri
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CourseModule;
