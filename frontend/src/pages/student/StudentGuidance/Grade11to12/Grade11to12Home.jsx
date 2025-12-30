import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionHero from "./SectionHero";
import SectionCareerStreams from "./SectionCareerStreams";
import SectionTrending from "./SectionTrending";
import AssessmentComponent from "./AssessmentComponent";
import ProgressSidebar from "../Progress";
import { useAuth } from "../../../../context/AuthContext";

export default function Grade11to12Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // ⭐ FIX: PREMIUM CHECK FOR THIS PAGE ⭐
  useEffect(() => {
    if (loading) return; // Wait for auth to load

    if (!user?.isPremium) {
      console.log("User NOT premium → redirecting to /pricing");
      navigate("/pricing");
    }
  }, [user, loading, navigate]);

  return (
    <div className="bg-gradient-to-br from-[#d7efff] to-[#f1faff] min-h-screen flex w-full">
      {/* LEFT MAIN CONTENT */}
      <main className="w-full md:w-[70%] px-6 md:px-12 lg:px-20 py-10">
        <SectionHero />
        <SectionCareerStreams />
        <SectionTrending />

        <section id="assessment" className="mt-20 mb-10">
          <AssessmentComponent />
        </section>
      </main>

      {/* RIGHT PROGRESS SIDEBAR */}
      <div className="hidden md:block w-[30%] pr-6">
        <ProgressSidebar />
      </div>
    </div>
  );
}
