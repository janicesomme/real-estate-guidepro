import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAgent } from "@/context/AgentContext";

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
  const { agent } = useAgent();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("james_app_questions")
      .insert({ agent_id: agent.id, question: question.trim() });

    setLoading(false);

    if (insertError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSent(true);
      setQuestion("");
    }
  };

  if (sent) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">{header.replace("💬 ", "")}</h3>
        </div>
        <p className="text-sm text-green-600 font-medium">
          Question sent! Your agent will respond shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-3 text-xs text-muted-foreground underline"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">{header.replace("💬 ", "")}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{text}</p>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[60px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      <button
        onClick={handleSend}
        disabled={loading || !question.trim()}
        className="mt-3 px-5 py-2.5 gradient-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : buttonText}
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
