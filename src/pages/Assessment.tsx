import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ProgressBar from "@/components/ProgressBar";
import Card from "@/components/Card";
import AskSiriBox from "@/components/AskSiriBox";
import ShareSection from "@/components/ShareSection";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Have you been pre-approved for a mortgage?",
    options: ["Yes", "No", "What does that mean?"],
  },
  {
    id: 2,
    question: "Do you know how much home you can actually afford?",
    options: ["Yes, I've calculated it", "I have a rough idea", "Not really"],
  },
  {
    id: 3,
    question: "Do you have money saved for a down payment?",
    options: [
      "Yes, 20% or more",
      "Yes, but less than 20%",
      "I'm still saving",
      "I thought I needed 20%?",
    ],
  },
  {
    id: 4,
    question: "Do you know about down payment assistance programs?",
    options: ["Yes, I've researched them", "I've heard of them", "No, what are those?"],
  },
  {
    id: 5,
    question: "How's your credit score?",
    options: [
      "Excellent (750+)",
      "Good (700-749)",
      "Fair (650-699)",
      "Below 650",
      "I don't know my score",
    ],
  },
  {
    id: 6,
    question: "Do you know the hidden costs beyond the down payment?",
    options: ["Yes, I've budgeted for them", "I know there are some", "Not really"],
  },
  {
    id: 7,
    question: "Do you know the difference between pre-qualified and pre-approved?",
    options: ["Yes", "I think so", "No, aren't they the same?"],
  },
  {
    id: 8,
    question: "Have you started looking at homes yet?",
    options: [
      "Yes, actively",
      "Casually browsing online",
      "Not yet, I want to be ready first",
    ],
  },
];

const calculateScore = (answers: Record<number, number>): number => {
  let score = 0;
  
  // Score based on first option being best
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const qId = parseInt(questionId);
    const question = questions.find((q) => q.id === qId);
    if (!question) return;
    
    // First option = best score, last option = worst
    const optionCount = question.options.length;
    const points = Math.max(0, optionCount - answerIndex - 1);
    score += points;
  });

  // Normalize to 0-10 scale
  const maxPossible = questions.reduce((sum, q) => sum + q.options.length - 1, 0);
  return Math.round((score / maxPossible) * 10);
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex,
    }));

    // Auto-advance after short delay
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

  if (showResults) {
    return (
      <Layout hideNav>
        <div className="min-h-screen bg-background">
          <div className="container py-8 md:py-16 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Score Circle */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-primary mb-4">
                  <div className="w-28 h-28 rounded-full bg-card flex items-center justify-center">
                    <div>
                      <span className="text-4xl font-bold text-foreground">{score}</span>
                      <span className="text-lg text-muted-foreground">/10</span>
                    </div>
                  </div>
                </div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Your Readiness Score
                </h1>
                <p className="text-muted-foreground">
                  {score >= 7
                    ? "You're well prepared!"
                    : score >= 4
                    ? "You're on your way — but there's more to know"
                    : "Let's get you ready for homeownership"}
                </p>
              </div>

              {/* Feedback */}
              <Card className="mb-6">
                <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  What We Noticed
                </h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    You've started saving, which is great — but do you know about programs
                    that could help you buy sooner?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Understanding the difference between pre-qualified and pre-approved could
                    save you from heartbreak on your dream home.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    There are hidden costs most first-time buyers don't budget for — do you
                    know what they are?
                  </li>
                </ul>
              </Card>

              {/* Webinar Teaser */}
              <Card className="mb-6 border-primary/20 bg-primary/5">
                <p className="text-sm text-foreground leading-relaxed">
                  These are the exact topics I cover in my{" "}
                  <span className="font-semibold text-primary">free webinar</span> for
                  first-time buyers. Get the answers you need before you start your search.
                </p>
              </Card>

              {/* CTAs */}
              <div className="space-y-3 mb-6">
                <Link
                  to="/webinars"
                  className="flex items-center justify-center w-full py-4 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-button hover:opacity-90 transition-opacity"
                >
                  Register for the Free Webinar
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                >
                  Save Results to My Dashboard
                </Link>
              </div>

              {/* Ask Siri Box */}
              <div className="mb-6">
                <AskSiriBox
                  header="💬 Questions About Your Results?"
                  text="Your score might raise some questions. That's normal. Ask me anything about what it means or what to do next."
                  placeholder="What's your question about your results?"
                  buttonText="Send to Siri"
                />
              </div>

              {/* Share Section */}
              <div className="mb-6">
                <ShareSection variant="assessment" />
              </div>

              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                Back to Home
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
              Am I Ready to Buy My First Home?
            </h1>
            <p className="text-muted-foreground text-sm">
              Answer these questions to see where you stand — and what you still need to know
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

export default Assessment;
