import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Home, Heart, Phone } from "lucide-react";
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
  // Q2: know home value
  if (answers[2] === 2) points.push("You don't know what your home is worth yet — this is your first step. A current appraisal is free, takes an hour, and is the foundation for every decision that follows.");
  // Q3: equity
  if (answers[3] === 3) points.push("Less than 25% equity limits what you'll have to work with for your next home. It's worth understanding this number clearly before you start planning the move.");
  if (answers[3] === 4) points.push("Not knowing your equity position means you can't plan your budget. Let's get that number — it often surprises people.");
  // Q5: most important
  if (answers[5] === 3) points.push("Accessing equity for retirement is a smart strategy — but the timing and structure of how you do it matters a lot. Worth getting advice before you sell.");
  // Q6: timeline
  if (answers[6] === 3) points.push("If you're 1–2 years away, now is the perfect time to start — not to rush, but to make a plan. The best downsizers I work with start early and execute on their terms.");
  if (answers[6] === 4) points.push("Even if this is still just a thought, understanding your options now means you'll be ready when the time feels right — and you won't be making rushed decisions.");
  if (points.length === 0) {
    points.push("Your position is strong — you have equity, a clear vision, and a realistic timeline. The next step is a current market appraisal to confirm your numbers.");
    points.push("Talk to James Hair about the right financing structure for your next home before you sell.");
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
    question: "What's prompting you to consider downsizing?",
    options: [
      "Kids have moved out",
      "Home is too much to maintain",
      "Want to free up equity",
      "Health/mobility considerations",
      "Just exploring options",
    ],
  },
  {
    id: 2,
    question: "Do you know what your current home is worth?",
    options: [
      "Yes, I've had it appraised recently",
      "I have a rough idea",
      "No, I'd like to find out",
    ],
  },
  {
    id: 3,
    question: "How much equity do you have in your current home?",
    options: [
      "Paid off completely",
      "More than 50% equity",
      "25-50% equity",
      "Less than 25% equity",
      "I'm not sure",
    ],
  },
  {
    id: 4,
    question: "What are you looking for in your next home?",
    options: [
      "Smaller single-family home",
      "Condo or townhouse (low maintenance)",
      "55+ community",
      "Something closer to family",
      "I'm open to options",
    ],
  },
  {
    id: 5,
    question: "What's most important to you in this transition?",
    options: [
      "Reducing monthly expenses",
      "Less maintenance and upkeep",
      "Being closer to family",
      "Accessing my equity for retirement",
      "Finding the right community",
    ],
  },
  {
    id: 6,
    question: "What's your timeline for making this move?",
    options: [
      "Ready now",
      "Within 6 months",
      "Within a year",
      "1-2 years out",
      "Just starting to think about it",
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

const EmptyNesterAssessment = () => {
  const navigate = useNavigate();
  const { agent } = useAgent();
  const firstName = agent.name.split(" ")[0];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!showResults) return;
    const s = calculateScore(answers);
    supabase.from("james_app_prospects").insert({ agent_id: agent.id, path: "empty-nester", readiness_score: s, answers });
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
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Your Transition Readiness</h1>
                <p className="text-muted-foreground">
                  {score >= 7 ? "You're in a great position to downsize!" : score >= 4 ? "You're preparing well for the next chapter" : "Let's help you plan this exciting transition"}
                </p>
              </div>

              <Card className="mb-6">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />What Your Answers Tell Us
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
                  <p className="text-sm text-muted-foreground mb-4">When you're selling and buying simultaneously, the finance structure is everything. James Hair is {firstName}'s trusted loan officer — he can map out your options before you list.</p>
                  <Link to="/partners" className="inline-flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                    <Phone className="w-4 h-4" /> Connect with James Hair
                  </Link>
                </motion.div>
              )}

              <Card className="mb-6 border-primary/20 bg-primary/5">
                <p className="text-sm text-foreground leading-relaxed">
                  🪺 Ready to take the next step? I can help you <span className="font-semibold text-primary">maximise your home's value</span> and find the perfect right-sized home for your lifestyle.
                </p>
              </Card>

              <div className="space-y-3 mb-6">
                <Link to="/selling" className="flex items-center justify-center w-full py-4 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button hover:opacity-90 transition-opacity">
                  Get a Free Home Value Estimate
                </Link>
                <Link to="/dashboard" className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
                  Save Results to My Dashboard
                </Link>
              </div>

              <div className="mb-6">
                <AskSiriBox header="💬 Questions About Downsizing?" text="This is a big decision. Ask me anything about timing, the process, or what to expect." placeholder="What's on your mind about downsizing?" buttonText={`Send to ${firstName}`} />
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
              🪺 Downsizing Readiness Assessment
            </h1>
            <p className="text-muted-foreground text-sm">
              Is it time to find your perfect next chapter home?
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

export default EmptyNesterAssessment;
