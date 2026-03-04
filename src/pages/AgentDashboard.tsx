import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, FileText, Video, MessageSquare, Trophy,
  TrendingUp, ChevronDown, ChevronUp, Mail, BarChart3,
  Bell, Lightbulb, ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AgentStatCard from "@/components/agent/AgentStatCard";
import LeadCard from "@/components/agent/LeadCard";
import LeadDetailModal from "@/components/agent/LeadDetailModal";
import ConversionFunnel from "@/components/agent/ConversionFunnel";
import PathPerformanceTable from "@/components/agent/PathPerformanceTable";
import InsightCard from "@/components/agent/InsightCard";
import { supabase } from "@/lib/supabase";
import { useAgent } from "@/context/AgentContext";

// TODO: replace with real agent_id from URL param once agent onboarding is built
const TEST_AGENT_ID = "00000000-0000-0000-0000-000000000001";

interface Question {
  id: string;
  question: string;
  response: string | null;
  status: string;
  created_at: string;
}

const AgentDashboard = () => {
  const { agent } = useAgent();
  const [hotLeadsOpen, setHotLeadsOpen] = useState(true);
  const [warmLeadsOpen, setWarmLeadsOpen] = useState(false);
  const [nurtureLeadsOpen, setNurtureLeadsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [sendingReply, setSendingReply] = useState<string | null>(null);
  const [realProspectCount, setRealProspectCount] = useState<number | null>(null);
  const [realQuestionCount, setRealQuestionCount] = useState<number | null>(null);
  const [realPathCounts, setRealPathCounts] = useState<Record<string, number>>({});

  const agentId = agent.id || TEST_AGENT_ID;

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("james_app_questions")
        .select("id, question, response, status, created_at")
        .eq("agent_id", agentId)
        .order("created_at", { ascending: false });

      if (!error && data) setQuestions(data);
      setQuestionsLoading(false);
    };

    const fetchStats = async () => {
      const [{ count: pCount }, { count: qCount }, { data: pathRows }] = await Promise.all([
        supabase
          .from("james_app_prospects")
          .select("*", { count: "exact", head: true })
          .eq("agent_id", agentId),
        supabase
          .from("james_app_questions")
          .select("*", { count: "exact", head: true })
          .eq("agent_id", agentId),
        supabase
          .from("james_app_prospects")
          .select("path")
          .eq("agent_id", agentId),
      ]);

      if (pCount !== null) setRealProspectCount(pCount);
      if (qCount !== null) setRealQuestionCount(qCount);
      if (pathRows) {
        const counts: Record<string, number> = {};
        pathRows.forEach(({ path }) => { counts[path] = (counts[path] || 0) + 1; });
        setRealPathCounts(counts);
      }
    };

    fetchQuestions();
    fetchStats();
  }, [agentId]);

  const handleSendReply = async (questionId: string) => {
    const replyText = replies[questionId]?.trim();
    if (!replyText) return;

    setSendingReply(questionId);
    const { error } = await supabase
      .from("james_app_questions")
      .update({
        response: replyText,
        responded_at: new Date().toISOString(),
        status: "answered",
      })
      .eq("id", questionId);

    setSendingReply(null);

    if (!error) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, response: replyText, status: "answered" } : q
        )
      );
      setReplies((prev) => ({ ...prev, [questionId]: "" }));
    }
  };

  const overviewStats = [
    { value: "47", label: "App Visitors", trend: "↑ 23% vs last month", positive: true },
    { value: "23", label: "Assessments Started", trend: "↑ 15% vs last month", positive: true },
    { value: realProspectCount !== null ? String(realProspectCount) : "—", label: "Assessments Completed", trend: "From Supabase", positive: true },
    { value: "12", label: "Webinar Registrations", trend: "↑ 8% vs last month", positive: true },
    { value: realQuestionCount !== null ? String(realQuestionCount) : "—", label: "Direct Inquiries", trend: "Via Ask Agent", positive: false },
    { value: "1", label: "Deals Closed", trend: "$8,500 commission", positive: true },
  ];

  const hotLeads = [
    {
      name: "Sarah Johnson",
      score: "9/10",
      path: "First-Time Buyer",
      insight: "Pre-approved, looking now, wants good schools",
      lastActive: "2 hours ago",
    },
    {
      name: "Mike Chen",
      score: "8/10",
      path: "Investor",
      insight: "Has $80K cash, wants duplex for rental income",
      lastActive: "Yesterday",
    },
    {
      name: "Rebecca Torres",
      score: "8/10",
      path: "Empty Nester",
      insight: "Selling 4-bed, downsizing to condo, 3-month timeline",
      lastActive: "3 days ago",
    },
  ];

  const sarahLeadDetail = {
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    path: "First-Time Buyer",
    score: "9/10",
    firstVisit: "January 3, 2026",
    lastActive: "January 13, 2026 (today)",
    assessmentAnswers: [
      { label: "Pre-approved", value: "Yes", check: true },
      { label: "Down payment saved", value: "$45,000" },
      { label: "Credit score", value: "Excellent (750+)" },
      { label: "Timeline", value: "ASAP" },
      { label: "Budget", value: "$350,000 - $425,000" },
      { label: "Looking for", value: "3 bed, 2 bath, good school district" },
      { label: "Must-haves", value: "Garage, home office space, quiet neighborhood" },
      { label: "Deal-breakers", value: "Busy roads, HOA over $300/month" },
    ],
    engagementHistory: [
      { date: "Jan 3", action: "Completed First-Time Buyer assessment", icon: "✅" },
      { date: "Jan 5", action: "Registered for webinar", icon: "✅" },
      { date: "Jan 8", action: 'Opened email: "3 Things Before You Start Looking"', icon: "✅" },
      { date: "Jan 10", action: 'Attended webinar: "What 99% Don\'t Know"', icon: "✅" },
      { date: "Jan 10", action: "Downloaded: Pre-Approval Checklist", icon: "✅" },
      { date: "Jan 11", action: 'Submitted "Find My Home" request', icon: "✅" },
      { date: "Jan 13", action: "Asked question via app", icon: "💬" },
    ],
    question: "Is now a good time to buy or should I wait for rates to drop?",
    aiSuggestions: [
      "She's HOT — call or reply within 24 hours",
      "Address her rate question directly — she's hesitating",
      "She wants good schools — prepare 3 listings in top districts",
      "Her budget is $350-425K — you have 7 active listings in range",
    ],
  };

  const funnelSteps = [
    { label: "Visitors", value: 47, percentage: 100 },
    { label: "Started Assess", value: 23, percentage: 49 },
    { label: "Completed", value: 18, percentage: 38 },
    { label: "Webinar Reg", value: 12, percentage: 26 },
    { label: "Direct Inquiry", value: 4, percentage: 9 },
    { label: "Deal Closed", value: 1, percentage: 2 },
  ];

  const pathData = [
    { icon: "🏠", path: "First-Time Buyer", leads: realPathCounts["first-time-buyer"] ?? 12, completionRate: "82%", avgScore: "6.2/10", topSource: "Instagram" },
    { icon: "📈", path: "Investor", leads: realPathCounts["investor"] ?? 3, completionRate: "75%", avgScore: "7.1/10", topSource: "Facebook" },
    { icon: "🪺", path: "Empty Nester", leads: realPathCounts["empty-nester"] ?? 2, completionRate: "100%", avgScore: "8.0/10", topSource: "Referral" },
    { icon: "📍", path: "Relocator", leads: realPathCounts["relocator"] ?? 1, completionRate: "50%", avgScore: "5.0/10", topSource: "Google" },
    { icon: "🏡", path: "Upsizer", leads: realPathCounts["upsizer"] ?? 0, completionRate: "—", avgScore: "—", topSource: "—" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/home">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to App
                </Button>
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  📊 Agent Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Your business command center</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{agent.name}</p>
              <p className="text-xs text-muted-foreground">Last updated: January 13, 2026 at 2:34 PM</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-8">
        {/* Section 1: Overview Stats */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">Your Business at a Glance</h2>
            <p className="text-sm text-muted-foreground">January 2026</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {overviewStats.map((stat, index) => (
              <AgentStatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                trend={stat.trend}
                trendPositive={stat.positive}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Section 2: Lead Pipeline */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            🔥 Your Lead Pipeline
          </h2>

          {/* Hot Leads */}
          <Collapsible open={hotLeadsOpen} onOpenChange={setHotLeadsOpen} className="mb-4">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔥</span>
                  <span className="font-semibold text-foreground">HOT LEADS (Ready to Act)</span>
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">3 leads</span>
                </div>
                {hotLeadsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-3">
              {hotLeads.map((lead, index) => (
                <LeadCard
                  key={lead.name}
                  {...lead}
                  isHot
                  onViewProfile={() => setSelectedLead(sarahLeadDetail)}
                  delay={index * 0.1}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Warm Leads */}
          <Collapsible open={warmLeadsOpen} onOpenChange={setWarmLeadsOpen} className="mb-4">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌡️</span>
                  <span className="font-semibold text-foreground">WARM LEADS (Nurturing)</span>
                  <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">9 leads</span>
                </div>
                {warmLeadsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <p className="text-muted-foreground mb-3">Engaged but not ready yet</p>
                <Button variant="outline">View All Warm Leads</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Nurture Leads */}
          <Collapsible open={nurtureLeadsOpen} onOpenChange={setNurtureLeadsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🌱</span>
                  <span className="font-semibold text-foreground">NURTURE (Long-term)</span>
                  <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">6 leads</span>
                </div>
                {nurtureLeadsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="p-4 bg-card rounded-lg border border-border text-center">
                <p className="text-muted-foreground mb-3">Early stage, staying in touch</p>
                <Button variant="outline">View All Nurture Leads</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        {/* Section 4: Conversion Funnel */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              📈 Your Conversion Funnel
            </h2>
            <p className="text-sm text-muted-foreground">January 2026</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <ConversionFunnel steps={funnelSteps} />
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Visitor → Assessment</p>
                <p className="text-lg font-bold text-primary">38% conversion</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Assessment → Webinar</p>
                <p className="text-lg font-bold text-primary">67% conversion</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Webinar → Inquiry</p>
                <p className="text-lg font-bold text-primary">33% conversion</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Inquiry → Close</p>
                <p className="text-lg font-bold text-primary">25% conversion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Performance by Path */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            📊 Performance by Audience
          </h2>
          <PathPerformanceTable data={pathData} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20"
          >
            <p className="text-sm flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>First-Time Buyers</strong> are your biggest audience (67% of leads). Consider creating more content for this group. <strong>Empty Nesters</strong> have the highest scores — they're ready to act!
              </span>
            </p>
          </motion.div>
        </section>

        {/* Section 6: What's Working */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            🎯 What's Working
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <InsightCard
              title="Top Assessment"
              mainStat="First-Time Buyer Readiness"
              subStats={["82% completion rate", "Avg time: 3 min 24 sec"]}
              delay={0}
            />
            <InsightCard
              title="Top Webinar"
              mainStat="What 99% of Buyers Don't Know"
              subStats={["67% attendance rate", "12 registrations, 8 attended"]}
              delay={0.1}
            />
            <InsightCard
              title="Top Lead Source"
              mainStat="Instagram QR Code"
              subStats={["34 visitors (72% of traffic)", "14 assessments started"]}
              delay={0.2}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 p-4 bg-secondary rounded-lg"
          >
            <p className="text-sm flex items-start gap-2">
              <span>📝</span>
              <span>
                <strong>Most Asked Question:</strong> "Is now a good time to buy?" — Consider creating a webinar or content addressing this!
              </span>
            </p>
          </motion.div>
        </section>

        {/* Section 7: Email Performance */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              📧 Email Performance
            </h2>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground">Emails Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">47%</p>
                <p className="text-xs text-muted-foreground">Open Rate (avg: 21%)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">12%</p>
                <p className="text-xs text-muted-foreground">Click Rate (avg: 2.5%)</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Unsubscribes (1.3%)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Performing Emails</h4>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm">1. "3 Things to Do Before You Start Looking"</span>
                <span className="text-sm font-bold text-green-600">62% open rate</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm">2. "Your Assessment Results"</span>
                <span className="text-sm font-bold text-green-600">58% open rate</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm">3. "Webinar Reminder: Tomorrow!"</span>
                <span className="text-sm font-bold text-green-600">54% open rate</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">View All Email Campaigns</Button>
            </div>
          </div>
        </section>

        {/* Section 8: Prospect Questions */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            💬 Prospect Questions
          </h2>
          {questionsLoading ? (
            <p className="text-sm text-muted-foreground">Loading questions...</p>
          ) : questions.length === 0 ? (
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <p className="text-sm text-muted-foreground">No questions yet. They'll appear here when prospects ask via the app.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="bg-card rounded-xl p-5 border border-border">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                      q.status === "answered"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {q.status === "answered" ? "Answered" : "Pending"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {new Date(q.created_at).toLocaleDateString("en-AU", {
                      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                  {q.response ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Your reply</p>
                      <p className="text-sm text-foreground">{q.response}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea
                        value={replies[q.id] ?? ""}
                        onChange={(e) =>
                          setReplies((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        placeholder="Type your reply..."
                        className="w-full min-h-[60px] p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSendReply(q.id)}
                        disabled={sendingReply === q.id || !replies[q.id]?.trim()}
                      >
                        {sendingReply === q.id ? "Sending..." : "Send Reply"}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            📊 Demo Version — Agent Dashboard
          </p>
        </footer>
      </main>

      {/* Lead Detail Modal */}
      <LeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
      />
    </div>
  );
};

export default AgentDashboard;
