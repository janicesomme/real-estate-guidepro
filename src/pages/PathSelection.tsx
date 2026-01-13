import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const paths = [
  {
    id: "first-time-buyer",
    icon: "🏠",
    title: "Buying My First Home",
    subtitle: "Learn everything you need to buy with confidence",
    available: true,
    route: "/home",
  },
  {
    id: "investor",
    icon: "📈",
    title: "Looking to Invest in Real Estate",
    subtitle: "Build wealth through smart property investments",
    available: true,
    route: "/assessment/investor",
  },
  {
    id: "empty-nester",
    icon: "🪺",
    title: "Downsizing / Empty Nester",
    subtitle: "Find the perfect next chapter home",
    available: true,
    route: "/assessment/empty-nester",
  },
  {
    id: "relocator",
    icon: "📍",
    title: "Relocating to This Area",
    subtitle: "Get to know the market before you arrive",
    available: true,
    route: "/assessment/relocator",
  },
  {
    id: "upsizer",
    icon: "🏡",
    title: "Ready for a Bigger Home",
    subtitle: "Upgrade to the space your family needs",
    available: true,
    route: "/assessment/upsizer",
  },
  {
    id: "seller",
    icon: "🏷️",
    title: "Thinking of Selling My Home",
    subtitle: "Get a free value estimate and selling guidance",
    available: true,
    route: "/selling",
  },
];

const PathSelection = () => {
  const navigate = useNavigate();

  const handlePathSelect = (path: typeof paths[0]) => {
    navigate(path.route);
  };

  return (
    <Layout hideFloatingButton>
      <div className="gradient-hero min-h-screen">
        <div className="container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
              SIRI SOLANGE
            </h1>
            <p className="text-primary font-medium text-sm md:text-base tracking-widest mb-8">
              MD • MBA • Real Estate Professional
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Welcome! Let's personalize your experience.
            </h2>
            <p className="text-muted-foreground text-lg">
              What brings you here today?
            </p>
          </motion.div>

          <div className="max-w-lg mx-auto space-y-4 px-4">
            {paths.map((path, index) => (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => handlePathSelect(path)}
                className="w-full bg-card border border-border rounded-xl p-5 text-left hover:border-primary hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{path.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {path.subtitle}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            You can change your path anytime in settings.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-muted-foreground mt-16 opacity-60"
          >
            Demo Version
          </motion.p>
        </div>
      </div>
    </Layout>
  );
};

export default PathSelection;
