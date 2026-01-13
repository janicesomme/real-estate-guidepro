import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Video, LayoutDashboard, User } from "lucide-react";
import { motion } from "framer-motion";
import FloatingAskSiri from "@/components/FloatingAskSiri";

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
  hideFloatingButton?: boolean;
}

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/webinars", icon: Video, label: "Webinars" },
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/about", icon: User, label: "About" },
];

const Layout = ({ children, hideNav = false, hideFloatingButton = false }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {/* Floating Ask Siri Button */}
      {!hideFloatingButton && <FloatingAskSiri />}

      {!hideNav && (
        <>
          {/* Mobile Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
            <div className="flex flex-col">
              <div className="flex justify-around items-center h-16 px-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === "/home" && location.pathname === "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center justify-center flex-1 py-2 relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-xl"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-xs mt-1 font-medium transition-colors ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
              </div>
              <div className="flex justify-center py-1 border-t border-border/50 safe-area-pb">
                <Link 
                  to="/agent" 
                  className="text-[10px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  Agent Login
                </Link>
              </div>
            </div>
          </nav>

          {/* Desktop Header Navigation */}
          <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-b border-border z-50">
            <div className="container flex items-center justify-between h-16">
              <Link to="/home" className="flex items-center gap-2">
                <span className="font-display text-xl font-bold text-foreground">
                  SIRI SOLANGE
                </span>
              </Link>
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path === "/home" && location.pathname === "/");
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  to="/agent"
                  className="ml-4 px-3 py-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  Agent Login
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Layout;
