import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./App.css";

import VerifyOtp from "./auth/VerifyOtp";
import RegisterConsultant from "./auth/RegisterConsultant";
import RegisterTeacher from "./auth/RegisterTeacher";
import Home from "./pages/Home";

import CareerJourney from "./pages/student/CareerJourney/CareerJourney";
import MainPage from "./pages/student/StudentGuidance/MainPage";
import JuniorGuidance from "./pages/student/StudentGuidance/Grade5to7/Grade5to7Home";
import SeniorGuidance from "./pages/student/StudentGuidance/Grade8to10/Grade8to10Home";
import PostGuidence from "./pages/student/StudentGuidance/Grade11to12/Grade11to12Home";
import FinalReportPage from "./pages/student/StudentGuidance/FinalReportPage";
import MyActivity from "./pages/student/Profile/MyActivity";

import StudyAbroadHome from "./pages/student/studyAbroad/pages/Home";
import StudyAbroadProfile from "./pages/student/studyAbroad/pages/ProfileForm";
import CountryResults from "./pages/student/studyAbroad/pages/CountryResults";
import CourseResults from "./pages/student/studyAbroad/pages/CourseResults";
import VisaGuide from "./pages/student/studyAbroad/pages/VisaGuide";
import StudyAbroadActionPlan from "./pages/student/studyAbroad/pages/ActionPlan";

import DropoutHome from "./pages/student/dropout/pages/Home";
import DropoutInfo from "./pages/student/dropout/pages/DropoutInfo";
import PathChoice from "./pages/student/dropout/pages/PathChoice";
import PathDetail from "./pages/student/dropout/pages/PathDetail";
import EducationResults from "./pages/student/dropout/pages/EducationResults";
import JobResults from "./pages/student/dropout/pages/JobResults";
import ActionPlan from "./pages/student/dropout/pages/ActionPlan";

import TutorialHome from "./pages/student/Tutorials/TutorialHome";
import DepartmentView from "./pages/student/Tutorials/DepartmentView";
import PageDetail from "./pages/student/Tutorials/PageDetail";
import CategoryView from "./pages/student/Tutorials/CategoryView";
import CareerQuiz from "./pages/student/CareerQuiz/CareerQuiz";
import CareerDetail from "./pages/student/CareerDetails/CareerDetail";
import Consult from "./pages/student/Consult/Consult";
import InterestForm from "./pages/student/InterestForm/InterestForm";
import Chat from "./pages/student/Chat/Chat";
import CollegesByLocation from "./pages/student/CollegesByLocation/CollegesByLocation";
import PremiumPlans from "./components/PremiumPlans/PremiumPlans";
import Profile from "./pages/student/Profile/Profile";
import CareerCompare from "./pages/student/CareerCompare/CareerCompare";
// import ProfilePage from "./components/profilebuilder/ProfilePage";
// import ProfileBuilderNew from "./components/profilebuilder/ProfileBuilderNew";
// import ActivityTracker from "./components/ActivityTracker";
import ResumeBuilder from "./pages/student/templates/ResumeBuilder";
import ResumeBuilder2 from "./pages/student/templates/ResumeBuilder2";
import ResumeBuilder3 from "./pages/student/templates/ResumeBuilder3";

import LinkedInBuilder from "./pages/student/templates/LinkedInBuilder";
import NaukriBuilder from "./pages/student/templates/NaukriBuilder";
import ResumeBuilderGuide from "./pages/student/templates/ResumeBuilderGuide";
import GitHubBuilder from "./pages/student/templates/GitHubBuilder";
import PortfolioBuilder from "./pages/student/templates/PortfolioBuilder";
import CoverLetterBuilder from "./pages/student/templates/CoverLetterBuilder";
import ProfileBuilder from "./pages/student/templates/ProfileBuilder";

import IndiaVsAbroadHome from "./pages/student/IndiavsAbroad/IndiavsAbroadHome";
import IndiaVsAbroadCompare from "./pages/student/IndiavsAbroad/CompareResult";
import IndiaVsAbroad from "./pages/student/IndiavsAbroad/IndiaVsAbroad";

import { ResumeProvider } from "./context/ResumeContext";
import ResumeBuilderPage from "./pages/student/ResumeBuilder/AllComponents";

import EduHomePage from "./pages/student/EduTutor/MainPage/EduHomePage";
import EduCareerSelect from "./pages/student/EduTutor/MainPage/EduCareerSelect";
import EduBranchSelect from "./pages/student/EduTutor/MainPage/EduBranchSelect";
import EduSemesterSelect from "./pages/student/EduTutor/MainPage/EduSemesterSelect";
import EduSubjectSelect from "./pages/student/EduTutor/MainPage/EduSubjectSelect";
import EduTutorList from "./pages/student/EduTutor/MainPage/EduTutorList";
import EduCartPage from "./pages/student/EduTutor/MainPage/EduCartPage";
import EduSuccessPage from "./pages/student/EduTutor/MainPage/EduSuccessPage";
import { BookingProvider } from "./pages/student/EduTutor/context/BookingContext";


import ResumeTemplateSelector from "./pages/student/ResumeTemplateSelector/ResumeTemplateSelector";
// Placeholder dashboard components for each role
const TeacherDashboard = () => <h1>Teacher Dashboard</h1>;
const ConsultantDashboard = () => <h1>Consultant Dashboard</h1>;
const AdminDashboard = () => <h1>Admin Dashboard</h1>;

const Unauthorized = () => <h1>Unauthorized Access</h1>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route path="/register-consultant" element={<RegisterConsultant />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/pricing" element={<PremiumPlans />} />
          {/* Root route – Home for guests, redirects to dashboard for logged‑in users */}

          {/* Protected routes based on user roles */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route path="/services" element={<CareerJourney />} />
            <Route path="/student-guidance" element={<MainPage />} />
            <Route
              path="/student-guidance/5th-7th"
              element={<JuniorGuidance />}
            />
              <Route
            path="/resume-templates"
            element={<ResumeTemplateSelector />}
          />
            <Route
              path="/student-guidance/8th-10th"
              element={<SeniorGuidance />}
            />
            <Route
              path="/student-guidance/11th-12th"
              element={<PostGuidence />}
            />
            <Route
              path="/student-guidance/final-report"
              element={<FinalReportPage />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tutorial" element={<TutorialHome />} />
            <Route path="/tutorial/:catId" element={<CategoryView />} />
            <Route
              path="/tutorial/:catId/:deptId"
              element={<DepartmentView />}
            />
            <Route
              path="/tutorial/:catId/:deptId/:subId/:pageId"
              element={<PageDetail />}
            />

            <Route path="/careerquiz" element={<CareerQuiz />} />
            <Route path="/careerdetail" element={<CareerDetail />} />
            <Route path="/consult" element={<Consult />} />
            <Route path="/compare" element={<CareerCompare />} />

            <Route path="/chat" element={<Chat />} />
            <Route path="/interest-form" element={<InterestForm />} />

            <Route path="/college" element={<CollegesByLocation />} />

            <Route path="/resume-builder/1" element={<ResumeBuilder />} />
            <Route path="/resume-builder/2" element={<ResumeBuilder2 />} />
            <Route path="/resume-builder/3" element={<ResumeBuilder3 />} />

            <Route path="/profile-builder" element={<ProfileBuilder />} />
            <Route
              path="/templates/linkedin-builder"
              element={<LinkedInBuilder />}
            />
            <Route
              path="/templates/naukri-builder"
              element={<NaukriBuilder />}
            />
            <Route
              path="/templates/resume-builder-guide"
              element={<ResumeBuilderGuide />}
            />
            <Route
              path="/templates/github-builder"
              element={<GitHubBuilder />}
            />
            <Route
              path="/templates/portfolio-builder"
              element={<PortfolioBuilder />}
            />
            <Route
              path="/templates/coverletter-builder"
              element={<CoverLetterBuilder />}
            />

            <Route path="/india-vs-abroad" element={<IndiaVsAbroadHome />} />
            <Route
              path="/india-vs-abroad/compare"
              element={<IndiaVsAbroadCompare />}
            />
            <Route
              path="/india-vs-abroad/service"
              element={<IndiaVsAbroad />}
            />

            <Route path="/my-activity" element={<MyActivity />} />

            <Route path="/services/dropout" element={<DropoutHome />} />
            <Route path="/services/dropout/info" element={<DropoutInfo />} />
            <Route
              path="/services/dropout/path-choice"
              element={<PathChoice />}
            />
            <Route path="/services/dropout/path/:id" element={<PathDetail />} />
            <Route
              path="/services/dropout/education-results"
              element={<EducationResults />}
            />
            <Route
              path="/services/dropout/job-results"
              element={<JobResults />}
            />
            <Route
              path="/services/dropout/action-plan"
              element={<ActionPlan />}
            />
            <Route path="/resume-builder/1" element={<ResumeBuilder />} />

            {/* Study Abroad Service Routes */}
            {/* ================= STUDY ABROAD SERVICE ================= */}
            <Route
              path="/services/study-abroad"
              element={<StudyAbroadHome />}
            />
            <Route
              path="/services/study-abroad/profile"
              element={<StudyAbroadProfile />}
            />
            <Route
              path="/services/study-abroad/countries"
              element={<CountryResults />}
            />
            <Route
              path="/services/study-abroad/courses"
              element={<CourseResults />}
            />
            <Route path="/services/study-abroad/visa" element={<VisaGuide />} />
            <Route
              path="/services/study-abroad/action-plan"
              element={<StudyAbroadActionPlan />}
            />
            <Route
              path="/AllComponents"
              element={
                <ResumeProvider>
                  <ResumeBuilderPage
                    getTemplateComponent={(id) => {
                      const templates = {
                        template1: Template1,
                        template2: Template2,
                        template3: Template3,
                        template4: Template4,
                        template5: Template5,
                        template6: Template6,
                      };
                      return templates[id] || null;
                    }}
                    templates={[
                      {
                        id: "template1",
                        name: "Template 1",
                        preview: "template 1.png",
                        category: "Professional",
                      },
                      {
                        id: "template2",
                        name: "Template 2",
                        preview: "template 2.png",
                        category: "Creative",
                      },
                      {
                        id: "template3",
                        name: "Template 3",
                        preview: "template 3.png",
                        category: "Modern",
                      },
                      {
                        id: "template4",
                        name: "Template 4",
                        preview: "template 4.png",
                        category: "Elegant",
                      },
                      {
                        id: "template5",
                        name: "Template 5",
                        preview: "template 5.png",
                        category: "Elegant",
                      },
                      {
                        id: "template6",
                        name: "Template 6",
                        preview: "template 6.png",
                        category: "Elegant",
                      },
                    ]}
                  />
                </ResumeProvider>
              }
            />

            <Route
              path="/edu/*"
              element={
                <BookingProvider>
                  <Routes>
                    <Route index element={<EduHomePage />} />
                    {/* CAREER → BRANCH → SEMESTER FLOW */}
                    <Route path="career" element={<EduCareerSelect />} />
                    <Route
                      path="branch/:careerId"
                      element={<EduBranchSelect />}
                    />
                    <Route
                      path="semester/:branchId"
                      element={<EduSemesterSelect />}
                    />
                    {/* SUBJECT SELECTION */}
                    <Route
                      path="/edu/subjects/:branchId/:sem"
                      element={<EduSubjectSelect />}
                    />
                    <Route
                      path="subjects/:branchId/:sem"
                      element={<EduSubjectSelect />}
                    />
                    <Route path="tutors" element={<EduTutorList />} />
                    {/* CART → PAYMENT */}
                    <Route path="cart" element={<EduCartPage />} />
                    <Route path="success" element={<EduSuccessPage />} />
                  </Routes>
                </BookingProvider>
              }
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["consultant"]} />}>
            <Route
              path="/consultant-dashboard"
              element={<ConsultantDashboard />}
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Catch‑all – redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
