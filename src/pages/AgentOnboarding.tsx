import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const toSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

interface FormState {
  name: string;
  credentials: string;
  brokerage: string;
  photo_url: string;
  website: string;
  phone: string;
  email: string;
}

const EMPTY: FormState = {
  name: "",
  credentials: "",
  brokerage: "",
  photo_url: "",
  website: "",
  phone: "",
  email: "",
};

const AgentOnboarding = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoading(true);
    setError(null);

    const slug = toSlug(form.name);

    const { error: insertError } = await supabase.from("james_app_agents").insert({
      slug,
      name: form.name.trim(),
      credentials: form.credentials.trim() || null,
      brokerage: form.brokerage.trim() || null,
      photo_url: form.photo_url.trim() || null,
      website: form.website.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
    });

    setLoading(false);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("That agent name is already registered. Try adding your suburb or initial.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }

    const url = `${window.location.origin}/?agent=${slug}`;
    setAppUrl(url);
  };

  if (appUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">You're set up!</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your personalised app is ready. Share this link with your prospects — they'll see your
            name and branding throughout the app.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-1">Your app URL</p>
            <p className="text-sm font-mono font-medium text-primary break-all">{appUrl}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(appUrl)}
            className="w-full px-5 py-3 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity mb-3"
          >
            Copy Link
          </button>
          <a
            href={appUrl}
            className="block w-full px-5 py-3 border border-border rounded-xl font-medium text-sm text-foreground hover:bg-secondary transition-colors"
          >
            Preview Your App
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Set Up Your App</h1>
          <p className="text-sm text-muted-foreground">
            Takes 2 minutes. Your prospects will see your name and details throughout the app.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <Field label="Full Name *" value={form.name} onChange={set("name")} placeholder="Siri Solange" required />
          <Field label="Credentials" value={form.credentials} onChange={set("credentials")} placeholder="Licensed Real Estate Agent" />
          <Field label="Brokerage" value={form.brokerage} onChange={set("brokerage")} placeholder="Ray White Inner West" />
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="0412 345 678" type="tel" />
          <Field label="Email" value={form.email} onChange={set("email")} placeholder="siri@raywhite.com" type="email" />
          <Field label="Website" value={form.website} onChange={set("website")} placeholder="https://sirisolange.com.au" type="url" />
          <Field label="Photo URL" value={form.photo_url} onChange={set("photo_url")} placeholder="https://..." type="url" />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !form.name.trim()}
            className="w-full px-5 py-3 gradient-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Setting up..." : "Create My App"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const Field = ({ label, value, onChange, placeholder, type = "text", required }: FieldProps) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
    />
  </div>
);

export default AgentOnboarding;
