import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";

// Root routes where the back button should not display
const ROOT_ROUTES = [
  "/",
  "/services",
  "/free-counseling",
  "/admin-dashboard",
  "/consultant-dashboard",
  "/parent-dashboard",
  "/teacher-dashboard",
];

export default function MobileBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnameRef = useRef(location.pathname);
  const navigateRef = useRef(navigate);

  const [showToast, setShowToast] = useState(false);
  const [toastFade, setToastFade] = useState(false);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const normalizedPath =
    location.pathname.replace(/\/$/, "") || "/";

  const isRoot = ROOT_ROUTES.includes(normalizedPath);

  const triggerToast = () => {
    setShowToast(true);
    setToastFade(true);

    setTimeout(() => {
      setToastFade(false);

      setTimeout(() => {
        setShowToast(false);
      }, 300);
    }, 2000);
  };

  const getFallbackPath = (pathname) => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) {
      return "/";
    }
    return "/" + parts.slice(0, parts.length - 1).join("/");
  };

  const handleBackNavigation = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigateRef.current(-1);
    } else {
      navigateRef.current(getFallbackPath(location.pathname));
    }
  };

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let lastTimeBackPress = 0;
    const timePeriodToExit = 2000;
    let listenerHandle = null;

    const registerListener = async () => {
      listenerHandle = await App.addListener(
        "backButton",
        () => {
          const currentPath = pathnameRef.current;
          const checkPath =
            currentPath.replace(/\/$/, "") || "/";

          const isCurrentRoot =
            ROOT_ROUTES.includes(checkPath);

          if (isCurrentRoot) {
            const currentTime = Date.now();

            if (
              currentTime - lastTimeBackPress <
              timePeriodToExit
            ) {
              App.exitApp();
            } else {
              lastTimeBackPress = currentTime;
              triggerToast();
            }
          } else {
            handleBackNavigation();
          }
        }
      );
    };

    registerListener();

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, []);

  return (
    <>
      {/* Visual back button removed - now handled inline within the main Navbar */}

      {/* Exit Toast */}
      {showToast && (
        <div
          className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl text-white shadow-2xl flex items-center gap-3 transition-all duration-300 ease-in-out ${
            toastFade
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />

          <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
            Press back again to exit
          </span>
        </div>
      )}
    </>
  );
}