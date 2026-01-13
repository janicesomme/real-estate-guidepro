import { MessageCircle } from "lucide-react";

interface AskSiriBoxProps {
  header?: string;
  text: string;
  placeholder?: string;
  buttonText?: string;
  showSignature?: boolean;
}

const AskSiriBox = ({
  header = "💬 Ask Siri",
  text,
  placeholder = "Type your question...",
  buttonText = "Send",
  showSignature = false,
}: AskSiriBoxProps) => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">{header.replace("💬 ", "")}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{text}</p>
      <textarea
        placeholder={placeholder}
        className="w-full min-h-[60px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
      />
      <button className="mt-3 px-5 py-2.5 gradient-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
        {buttonText}
      </button>
      {showSignature && (
        <p className="text-xs text-muted-foreground mt-3 italic">
          I read every message personally.
        </p>
      )}
    </div>
  );
};

export default AskSiriBox;
