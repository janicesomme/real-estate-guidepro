import { useNavigate } from "react-router-dom";

const PathIndicator = () => {
  const navigate = useNavigate();

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Your Path:</span>
      <span className="font-medium text-foreground">🏠 First-Time Buyer</span>
      <button
        onClick={() => navigate("/")}
        className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
      >
        [ Change ]
      </button>
    </div>
  );
};

export default PathIndicator;
