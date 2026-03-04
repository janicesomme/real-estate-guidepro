import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share, Plus } from "lucide-react";

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;

const isInStandaloneMode = () =>
  (window.navigator as any).standalone === true ||
  window.matchMedia("(display-mode: standalone)").matches;

const PWAInstallPrompt = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    // Don't show if already installed or dismissed
    if (isInStandaloneMode()) return;
    if (sessionStorage.getItem("pwa_dismissed")) return;

    if (isIOS()) {
      setIos(true);
      setShow(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("pwa_dismissed", "1");
    setShow(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground px-4 py-3 shadow-lg"
        >
          <div className="container flex items-center justify-between gap-4 max-w-2xl">
            <div className="flex items-start gap-3 flex-1">
              {ios ? (
                <>
                  <Share className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <span className="font-semibold">Add to your home screen</span> for the best experience.
                    Tap <Share className="inline w-3.5 h-3.5" /> then{" "}
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Plus className="w-3 h-3" /> Add to Home Screen
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <span className="text-lg shrink-0">📱</span>
                  <div>
                    <p className="text-sm font-semibold">Add to your home screen</p>
                    <p className="text-xs opacity-80">Use it like an app — works offline too</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!ios && deferredPrompt && (
                <button
                  onClick={install}
                  className="px-3 py-1.5 bg-primary-foreground text-primary rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Install
                </button>
              )}
              <button onClick={dismiss} className="p-1 opacity-70 hover:opacity-100 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
