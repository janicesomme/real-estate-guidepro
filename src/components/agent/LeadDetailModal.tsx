import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, CheckCircle2, MessageSquare, Lightbulb } from "lucide-react";

interface LeadDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    name: string;
    email: string;
    phone: string;
    path: string;
    score: string;
    firstVisit: string;
    lastActive: string;
    assessmentAnswers: {
      label: string;
      value: string;
      check?: boolean;
    }[];
    engagementHistory: {
      date: string;
      action: string;
      icon: string;
    }[];
    question?: string;
    aiSuggestions: string[];
  } | null;
}

const LeadDetailModal = ({ isOpen, onClose, lead }: LeadDetailModalProps) => {
  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              {lead.name}
            </DialogTitle>
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
              🔥 HOT LEAD
            </span>
          </div>
        </DialogHeader>

        {/* Contact Info */}
        <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" />
            <span>{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-primary" />
            <span>{lead.phone}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Path: {lead.path}</span>
            <span className="font-bold text-primary">Score: {lead.score}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>First Visit: {lead.firstVisit}</span>
            <span>Last Active: {lead.lastActive}</span>
          </div>
        </div>

        {/* Assessment Answers */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Assessment Answers
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {lead.assessmentAnswers.map((answer, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground">{answer.label}:</span>
                <span className="font-medium">
                  {answer.value} {answer.check && "✅"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement History */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Engagement History
          </h4>
          <div className="space-y-2">
            {lead.engagementHistory.map((event, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <span>{event.icon}</span>
                <span className="text-muted-foreground">{event.date} —</span>
                <span>{event.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Question */}
        {lead.question && (
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Her Question
            </h4>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg italic text-sm">
              "{lead.question}"
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            AI-Suggested Next Steps
          </h4>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 space-y-2">
            {lead.aiSuggestions.map((suggestion, index) => (
              <p key={index} className="text-sm flex items-start gap-2">
                <span>•</span>
                <span>{suggestion}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button className="flex-1">Reply to {lead.name.split(' ')[0]}</Button>
          <Button variant="outline">Add Note</Button>
          <Button variant="outline">Mark as Contacted</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
