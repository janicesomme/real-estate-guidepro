import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Home, Expand, Phone } from "lucide-react";
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
  // Q3: equity
  if (answers[3] === 3) points.push("Not knowing your equity means you can't plan your upgrade budget. A current appraisal is free and usually takes an hour — it's the starting point for everything.");
  if (answers[3] === 2) points.push("Not much equity yet limits your deposit for the new home, but there are ways to structure the sale and purchase to maximise what you have.");
  // Q4: need to sell first
  if (answers[4] === 0) points.push("Needing to sell before you buy is the biggest source of stress for upsizers. There are bridging finance options that let you buy first and sell at your own pace — worth exploring.");
  // Q5: pre-approval
  if (answers[5] === 2) points.push("Not having pre-approval for your upgrade means you can't act when you find the right home. Your borrowing capacity may have changed significantly since your first purchase — get it checked.");
  // Q6: timeline
  if (answers[6] === 4) points.push("Even if you're just exploring, understanding your equity position and borrowing capacity now means you can move decisively when the right home comes up.");
  if (points.length === 0) {
    points.push("Your position is strong — equity, pre-approval, and a clear reason to upgrade. The next step is getting your home on the market at the right price and time.");
    points.push("Talk to James Hair about your upgrade finance before you start looking — the structure of your next loan matters as much as the rate.");
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
    question: "Why are you looking to upsize?",
    options: [
      "Growing family",
      "Need more space to work from home",
      "Want better schools",
      "Want more land/outdoor space",
      "Current home has appreciated — time to upgrade",
      "Just want something nicer",
    ],
  },
  {
    id: 2,
    question: "Do you currently own a home?",
    options: [
      "Yes",
      "No, I'm renting",
    ],
  },
  {
    id: 3,
    question: "Do you know how much equity you have in your current home?",
    options: [
      "Yes, I have significant equity ($100K+)",
      "Yes, I have some equity ($50-100K)",
      "Yes, but not much equity yet",
      "No, I'm not sure",
      "N/A — I'm renting",
    ],
  },
  {
    id: 4,
    question: "Will you need to sell your current home to buy the new one?",
    options: [
      "Yes, I need to sell first",
      "Yes, but I could bridge temporarily",
      "No, I can buy without selling",
      "N/A — I'm renting",
    ],
  },
  {
    id: 5,
    question: "Have you been pre-approved for a new mortgage?",
    options: [
      "Yes, I'm pre-approved for my target range",
      "No, but I'm confident I'll qualify",
      "No, I need to explore my options",
      "I'm paying cash",
    ],
  },
  {
    id: 6,
    question: "What's your timeline for upgrading?",
    options: [
      "Ready now — actively looking",
      "Within 3 months",
      "Within 6 months",
      "Within a year",
      "Just exploring",
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

const UpsizerAssessment = () => {
  const navigate = useNavigate();
  const { agent } = useAgent();
  const firstName = agent.name.split(" ")[0];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!showResults) return;
    const s = calculateScore(answers);
    supabase.from("james_app_prospects").insert({ agent_id: agent.id, path: "upsizer", readiness_score: s, answers });
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
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Your Upgrade Readiness</h1>
                <p className="text-muted-foreground">
                  {score >= 7 ? "You're on your way to your dream home!" : score >= 4 ? "You're building toward your next home" : "Let's create a plan for your upgrade"}
                </p>
              </div>

              <Card className="mb-6">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Expand className="w-5 h-5 text-primary" />What Your Answers Tell Us
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
                  <p className="text-sm text-muted-foreground mb-4">Upsizing means selling and buying at the same time — the finance structure is everything. James Hair is {firstName}'s trusted loan officer and can map out your bridging options before you list.</p>
                  <Link to="/partners" className="inline-flex items-center gap-2 px-4 py-2.5 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity">
                    <Phone className="w-4 h-4" /> Connect with James Hair
                  </Link>
                </motion.div>
              )}

              <Card className="mb-6 border-primary/20 bg-primary/5">
                <p className="text-sm text-foreground leading-relaxed">
                  🏡 Upgrading while selling can feel like a juggling act. Let me show you{" "}
                  <span className="font-semibold text-primary">how to buy and sell at the same time</span> without the stress.
                </p>
              </Card>

              <div className="space-y-3 mb-6">
                <Link to="/webinars" className="flex items-center justify-center w-full py-4 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button hover:opacity-90 transition-opacity">
                  Learn How to Buy and Sell Together
                </Link>
                <Link to="/find-your-home" className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
                  Tell Me What You're Looking For
                </Link>
              </div>

              <div className="mb-6">
                <AskSiriBox
                  header="💬 Questions About Upgrading?"
                  text="Upsizing comes with unique challenges. Ask me about timing, financing, or finding the right home."
                  placeholder="What's your question about upgrading?"
                  buttonText={`Send to ${firstName}`}
                />
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
              🏡 Ready to Upgrade Assessment
            </h1>
            <p className="text-muted-foreground text-sm">
              Find out if you're ready to move into your bigger, better home
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

export default UpsizerAssessment;
