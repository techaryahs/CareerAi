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
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [showParentModal, setShowParentModal] = useState(false);

  const API = import.meta.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!authUser) {
      setPageLoading(false);
      return;
    }

    setUser(authUser);

    const fetchFreshUser = async () => {
      try {
        const res = await axios.get(`${API}/api/user/${authUser.email}`);
        if (res.data && res.data.user) {
          const fetchedUser = res.data.user;
          // ✅ Ensure role is present
          const updatedUser = { ...fetchedUser, role: fetchedUser.role || authUser.role };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
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

  const handleAddItem = async (section, data) => {
    try {
      const userId = user?._id || user?.id || authUser?._id || authUser?.id;

      if (!userId) {
        alert("User session not found. Please log in again.");
        throw new Error("No User ID");
      }

      console.log(`Adding item to ${section}:`, data);

      const res = await axios.post(`${API}/api/user/profile/${userId}/add-item`, {
        section,
        data,
      });

      if (res.data?.profile) {
        const updatedUser = { ...user, profile: res.data.profile };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Add item error details:", err.response?.data || err.message);
      const msg = err.response?.data?.message || err.message;
      alert(`❌ Failed to add profile section: ${msg}`);
      throw err; // Re-throw so the UI doesn't mark it as added
    }
  };

  const handleUpdateItem = async (section, itemId, data) => {
    try {
      const userId = user?._id || user?.id || authUser?._id || authUser?.id;
      if (!userId) throw new Error("No User ID");

      console.log(`Updating item in ${section}, ID: ${itemId}:`, data);

      const res = await axios.put(`${API}/api/user/profile/${userId}/update-item`, {
        section,
        itemId,
        data,
      });

      if (res.data?.profile) {
        const updatedUser = { ...user, profile: res.data.profile };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Update item error:", err.response?.data || err.message);
      alert(`❌ Failed to update profile item: ${err.response?.data?.message || err.message}`);
      throw err;
    }
  };

  const handleDeleteItem = async (section, itemId) => {
    try {
      const userId = user?._id || user?.id || authUser?._id || authUser?.id;
      if (!userId) throw new Error("No User ID");

      console.log(`Deleting item from ${section}, ID: ${itemId}`);

      const res = await axios.delete(`${API}/api/user/profile/${userId}/delete-item`, {
        data: { section, itemId }
      });

      if (res.data?.profile) {
        const updatedUser = { ...user, profile: res.data.profile };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Delete item error:", err.response?.data || err.message);
      alert(`❌ Failed to delete profile item: ${err.response?.data?.message || err.message}`);
      throw err;
    }
  };

  const handleProfileUpdate = async (updates) => {
    try {
      const userId = user?._id || user?.id || authUser?._id || authUser?.id;

      const res = await axios.post(`${API}/api/user/update-profile`, {
        userId: userId,
        email: user.email,
        ...updates,
      });

      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("❌ Failed to update profile");
      throw err;
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
          
          <StudentProfile
            user={user}
            membershipBadge={
              user.profile?.isPremium
                ? user.profile.premiumPlan
                : null
            }
            packageBadge={
              user.profile?.admissionPackage?.packageName
                || null
            }
            onProfileUpdate={handleProfileUpdate}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
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
