import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export interface Agent {
  id: string;
  slug: string;
  name: string;
  credentials: string | null;
  brokerage: string | null;
  photo_url: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
}

const DEFAULT_AGENT: Agent = {
  id: "00000000-0000-0000-0000-000000000001",
  slug: "siri-solange",
  name: "Siri Solange",
  credentials: "MD • MBA • Real Estate Professional",
  brokerage: null,
  photo_url: null,
  website: null,
  phone: null,
  email: null,
};

interface AgentContextValue {
  agent: Agent;
  loading: boolean;
}

const AgentContext = createContext<AgentContextValue>({
  agent: DEFAULT_AGENT,
  loading: false,
});

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [agent, setAgent] = useState<Agent>(DEFAULT_AGENT);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Persist slug across navigation
    const paramSlug = searchParams.get("agent");
    if (paramSlug) sessionStorage.setItem("agent_slug", paramSlug);
    const slug = paramSlug || sessionStorage.getItem("agent_slug");

    if (!slug) return;

    setLoading(true);
    supabase
      .from("james_app_agents")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setAgent(data as Agent);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <AgentContext.Provider value={{ agent, loading }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => useContext(AgentContext);
