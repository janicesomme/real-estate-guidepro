import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calculator, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAgent } from "@/context/AgentContext";

const fmt = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

const TrueCostCalculator = () => {
  const { agent } = useAgent();
  const firstName = agent.name.split(" ")[0];

  const [homePrice, setHomePrice] = useState(500000);
  const [downPct, setDownPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calc = useMemo(() => {
    const down = homePrice * (downPct / 100);
    const loan = homePrice - down;
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const monthlyPI =
      monthlyRate === 0
        ? loan / n
        : (loan * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const monthlyTax = (homePrice * 0.012) / 12;
    const monthlyInsurance = 150;
    const monthlyPMI = downPct < 20 ? (loan * 0.007) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;

    const closingCosts = homePrice * 0.03;
    const stampDuty = homePrice * 0.04; // rough estimate
    const inspection = 600;
    const movingCosts = 2500;
    const repairBuffer = homePrice * 0.01;
    const totalUpfront = down + closingCosts + stampDuty + inspection + movingCosts + repairBuffer;

    return {
      down,
      loan,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthly,
      closingCosts,
      stampDuty,
      inspection,
      movingCosts,
      repairBuffer,
      totalUpfront,
    };
  }, [homePrice, downPct, interestRate, loanTerm]);

  return (
    <Layout>
      <div className="min-h-screen bg-background md:pt-16">
        <div className="container py-8 max-w-2xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link
              to="/home"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                True Cost Calculator
              </h1>
            </div>
            <p className="text-muted-foreground">
              See the full picture — monthly repayments AND the upfront costs most buyers don't budget for.
            </p>
          </motion.div>

          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-6"
          >
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Home Price</label>
                <span className="text-sm font-bold text-primary">{fmt(homePrice)}</span>
              </div>
              <input
                type="range"
                min={200000}
                max={2000000}
                step={10000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$200k</span><span>$2M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Down Payment</label>
                <span className="text-sm font-bold text-primary">{downPct}% ({fmt(calc.down)})</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={downPct}
                onChange={(e) => setDownPct(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5%</span><span>40%</span>
              </div>
              {downPct < 20 && (
                <p className="text-xs text-amber-600 mt-1">
                  Under 20% — lenders mortgage insurance (LMI) applies (~{fmt(calc.monthlyPMI * 12)}/yr)
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Interest Rate</label>
                <span className="text-sm font-bold text-primary">{interestRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={3}
                max={12}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>3%</span><span>12%</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Loan Term</label>
              <div className="flex gap-3">
                {[15, 20, 25, 30].map((t) => (
                  <button
                    key={t}
                    onClick={() => setLoanTerm(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      loanTerm === t
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {t}yr
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Monthly Costs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 mb-6"
          >
            <h2 className="font-semibold text-foreground text-lg mb-4">Monthly Costs</h2>
            <div className="space-y-3">
              <CostRow label="Principal & Interest" value={fmt(calc.monthlyPI)} />
              <CostRow label="Council Rates / Property Tax (~1.2%/yr)" value={fmt(calc.monthlyTax)} muted />
              <CostRow label="Home Insurance (est.)" value={fmt(calc.monthlyInsurance)} muted />
              {calc.monthlyPMI > 0 && (
                <CostRow label="Lenders Mortgage Insurance" value={fmt(calc.monthlyPMI)} muted />
              )}
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total Monthly</span>
                  <span className="text-2xl font-bold text-primary">{fmt(calc.totalMonthly)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upfront Costs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 mb-6"
          >
            <h2 className="font-semibold text-foreground text-lg mb-1">Upfront Costs</h2>
            <p className="text-xs text-muted-foreground mb-4">What you need in your account on settlement day</p>
            <div className="space-y-3">
              <CostRow label={`Down Payment (${downPct}%)`} value={fmt(calc.down)} />
              <CostRow label="Stamp Duty (est.)" value={fmt(calc.stampDuty)} muted />
              <CostRow label="Conveyancing / Legal Fees" value={fmt(calc.closingCosts)} muted />
              <CostRow label="Building & Pest Inspection" value={fmt(calc.inspection)} muted />
              <CostRow label="Moving Costs" value={fmt(calc.movingCosts)} muted />
              <CostRow label="Repair / Immediate Improvements Buffer" value={fmt(calc.repairBuffer)} muted />
              <div className="pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total You Need</span>
                  <span className="text-2xl font-bold text-primary">{fmt(calc.totalUpfront)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* James CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-sm">JT</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">
                  {firstName}'s Recommended Loan Officer
                </p>
                <h3 className="font-semibold text-foreground mb-1">James Hair</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These numbers are estimates. James can give you an exact rate and payment based on your situation — often better than you'll find online.
                </p>
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 px-5 py-2.5 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <Phone className="w-4 h-4" />
                  Talk to James About My Numbers
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

const CostRow = ({ label, value, muted }: { label: string; value: string; muted?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className={`text-sm ${muted ? "text-muted-foreground" : "text-foreground"}`}>{label}</span>
    <span className={`text-sm font-medium ${muted ? "text-muted-foreground" : "text-foreground"}`}>{value}</span>
  </div>
);

export default TrueCostCalculator;
