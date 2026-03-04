import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Home, MapPin, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import Card from "@/components/Card";
import AskSiriBox from "@/components/AskSiriBox";
import ShareSection from "@/components/ShareSection";
import { useAgent } from "@/context/AgentContext";
import { supabase } from "@/lib/supabase";

const generateFeedback = (answers: Record<number, number>): string[] => {
  const points: string[] = [];
  // Q2: area familiarity
  if (answers[2] === 3) points.push("You've only visited once — buying in an area you don't know is one of the biggest risks in real estate. Virtual tours, suburb data, and a local agent who knows every street are essential.");
  if (answers[2] === 4) points.push("You know very little about this area yet. Before you buy anything, you need to understand the neighbourhoods, commute routes, schools, and what prices actually mean here.");
  // Q3: need to sell
  if (answers[3] === 0) points.push("Needing to sell before you buy creates a timing squeeze — especially when you're moving cities. There are bridging strategies and timing approaches that can take the pressure off.");
  // Q5: pre-approval
  if (answers[5] === 2) points.push("Without pre-approval you can't make a serious offer — and when you're relocating, you often need to move fast. Get this done before you start looking at properties.");
  // Q4: timeline ASAP
  if (answers[4] === 0) points.push("An ASAP timeline means you need everything ready now — pre-approval, a trusted local agent, and a clear brief. There's no time to figure things out as you go.");
  if (points.length === 0) {
    points.push("Your preparation is solid. The key now is having a trusted local agent who can show you properties virtually before you arrive — so you can move fast when you land.");
    points.push("Talk to James Hair about finance pre-approval so you're ready to make an offer the moment you find the right property.");
  }
  return points.slice(0, 3);
};

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Why are you relocating?",
    options: [
      "Job/career opportunity",
      "Family reasons",
      "Retirement",
      "Lifestyle change",
      "Military/government transfer",
      "Other",
    ],
  },
  {
    id: 2,
    question: "How familiar are you with this area?",
    options: [
      "I've lived here before",
      "I've visited multiple times",
      "I've visited once or twice",
      "I've never been but done research",
      "I know very little about the area",
    ],
  },
  {
    id: 3,
    question: "Do you need to sell a home before buying here?",
    options: [
      "Yes, I need to sell first",
      "Yes, but I can buy before selling",
      "No, I'm renting currently",
      "No, I'll keep my current home",
    ],
  },
  {
    id: 4,
    question: "What's your timeline for the move?",
    options: [
      "I need to move ASAP",
      "Within 3 months",
      "Within 6 months",
      "Within a year",
      "Flexible / still planning",
    ],
  },
  {
    id: 5,
    question: "Have you been pre-approved for a mortgage?",
    options: [
      "Yes, I'm pre-approved",
      "No, but my finances are in order",
      "No, I need to start this process",
      "I'm paying cash",
    ],
  },
  {
    id: 6,
    question: "What's most important in choosing your new neighborhood?",
    options: [
      "Schools",
      "Commute to work",
      "Safety",
      "Walkability / amenities",
      "Affordability",
      "Community feel",
    ],
  },
];

const calculateScore = (answers: Record<number, number>): number => {
  let score = 0;
  
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find((q) => q.id === qId);
    if (!question) return;
    
    const optionCount = question.options.length;
    const points = Math.max(0, optionCount - answerIndex - 1);
    score += points;
  });

  const maxPossible = questions.reduce((sum, q) => sum + q.options.length - 1, 0);
  return Math.round((score / maxPossible) * 10);
};

const RelocatorAssessment = () => {
  const navigate = useNavigate();
  const { agent } = useAgent();
  const firstName = agent.name.split(" ")[0];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!showResults) return;
    const s = calculateScore(answers);
    supabase.from("james_app_prospects").insert({ agent_id: agent.id, path: "relocator", readiness_score: s, answers });
  }, [showResults]);

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex,
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const score = calculateScore(answers);
  const feedback = generateFeedback(answers);

  if (showResults) {
    return (
      <Layout hideNav>
        <div className="min-h-screen bg-background">
          <div className="container py-8 md:py-16 max-w-lg">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-primary mb-4">
                  <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
                    <div>
                      <span className="text-4xl font-bold text-foreground">{score}</span>
                      <span className="text-lg text-muted-foreground">/10</span>
                    </div>
                  </div>
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Your Relocation Readiness</h1>
                <p className="text-muted-foreground">
                  {score >= 7 ? "You're well prepared for your move!" : score >= 4 ? "Let's get you prepared before you arrive" : "I can help you plan a smooth relocation"}
                </p>
              </div>

              <Card className="mb-6">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />What Your Answers Tell Us
                </h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {feedback.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />{point}
                    </li>
                  ))}
                </ul>
              </Card>

              {score >= 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-5">
                  <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">{firstName}'s Recommended Next Step</p>
                  <h3 className="font-semibold text-foreground mb-1">Talk to James Hair</h3>
                  <p className="text-sm text-muted-foreground mb-4">Relocating means you need finance sorted before you land — not after. James Hair is {firstName}'s trusted loan officer and can pre-approve you remotely so you're ready to move the moment you find the right home.</p>
                  <Link to="/partners" className="inline-flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                    <Phone className="w-4 h-4" /> Connect with James Hair
                  </Link>
                </motion.div>
              )}

              <Card className="mb-6 border-primary/20 bg-primary/5">
                <p className="text-sm text-foreground leading-relaxed">
                  📍 Relocating can feel overwhelming. Let me be your <span className="font-semibold text-primary">local guide</span> — I'll help you understand the neighbourhoods, schools, and market before you even arrive.
                </p>
              </Card>

              <div className="space-y-3 mb-6">
                <Link to="/webinars" className="flex items-center justify-center w-full py-4 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button hover:opacity-90 transition-opacity">
                  Watch My Area Guide Webinar
                </Link>
                <Link to="/find-your-home" className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
                  Tell Me What You're Looking For
                </Link>
              </div>

              <div className="mb-6">
                <AskSiriBox header="💬 Questions About the Area?" text="Moving somewhere new raises a lot of questions. Ask me about neighbourhoods, schools, commute times, or anything else." placeholder="What do you want to know about this area?" buttonText={`Send to ${firstName}`} />
              </div>

              <div className="mb-6"><ShareSection variant="assessment" /></div>

              <Link to="/" className="flex items-center justify-center gap-2 w-full py-3 text-muted-foreground hover:text-foreground transition-colors">
                <Home className="w-4 h-4" /> Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Layout hideNav>
      <div className="min-h-screen bg-background">
        <div className="container py-6 md:py-12 max-w-lg">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => currentQuestion === 0 ? navigate("/") : goBack()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{currentQuestion === 0 ? "Home" : "Back"}</span>
            </button>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              📍 Relocation Readiness Assessment
            </h1>
            <p className="text-muted-foreground text-sm">
              Moving to a new area? Let's make sure you're prepared
            </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar current={currentQuestion + 1} total={questions.length} />

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${
                      answers[question.id] === index
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[question.id] === index
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {answers[question.id] === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              {answers[question.id] !== undefined && (
                <button
                  onClick={() =>
                    currentQuestion < questions.length - 1
                      ? setCurrentQuestion((prev) => prev + 1)
                      : setShowResults(true)
                  }
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RelocatorAssessment;
