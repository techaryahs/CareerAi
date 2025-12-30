// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

import PageLoader from "../../../components/PageLoader/PageLoader";
import ParentRegisterModal from "./components/parent/ParentRegisterModal";

import CareerServices from "./components/student/CareerServicesSection";
import ProfilePromoCarousel from "./components/student/ProfilePromoCarousel";

import StudentProfile from "./components/student/StudentProfile";
import ConsultantProfile from "./consultant/ConsultantProfile";
import TeacherProfile from "./components/teacher/TeacherProfile";
import ParentProfile from "./components/parent/ParentProfile";

import { useAuth } from "../../../context/AuthContext";

const Profile = () => {
  const { user: authUser, role: authRole } = useAuth(); // ✅ FIX
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [showParentModal, setShowParentModal] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!authUser) {
      setPageLoading(false);
      return;
    }

    setUser(authUser);

    const fetchFreshUser = async () => {
      try {
        const res = await axios.get(`${API}/api/user/${authUser.email}`);
        if (res.data) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (err) {
        console.error("Fresh user fetch error:", err);
      }
    };

    fetchFreshUser();

    const timer = setTimeout(() => setPageLoading(false), 1200);

    const handleOpenParentModal = () => setShowParentModal(true);
    window.addEventListener("openParentModal", handleOpenParentModal);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("openParentModal", handleOpenParentModal);
    };
  }, [authUser, API]);

  const handleProfileUpdate = async (updates) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(`${API}/api/user/update-profile`, {
        userId: storedUser._id || storedUser.id,
        ...updates,
      });

      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile");
    }
  };

  if (pageLoading) return <PageLoader />;

  if (!user) {
    return (
      <div className="no-role-message">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <>
      <div className="profile-wrapper">

        {user.role === "student" && (
          <StudentProfile user={user} onProfileUpdate={handleProfileUpdate} />
        )}

        {user.role === "consultant" && <ConsultantProfile user={user} />}

        {user.role === "teacher" && (
          <TeacherProfile user={user} onProfileUpdate={handleProfileUpdate} />
        )}

        {user.role === "parent" && (
          <ParentProfile user={user} onProfileUpdate={handleProfileUpdate} />
        )}

        {user.role === "student" && <ProfilePromoCarousel />}

        {user.role === "student" && (
          <div className="max-w-7xl mx-auto px-4 pb-16">
            <CareerServices />
          </div>
        )}
      </div>

      {showParentModal && (
        <ParentRegisterModal
          onClose={() => setShowParentModal(false)}
          studentId={user?._id || user?.id}
        />
      )}
    </>
  );
};

export default Profile;
