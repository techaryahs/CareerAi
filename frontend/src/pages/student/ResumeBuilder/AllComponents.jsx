// src/AllComponents.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { logStudentActivity } from "../../../utils/logActivity";
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { generatePDF, generatePDFWithPuppeteer } from './utils';
import { useResumeContext } from '../../../context/ResumeContext';
import { templatesMeta } from './templatesArray';
import { motion } from "framer-motion";
import PremiumPopup from '../../../components/PremiumPlans/PremiumPlans';


// icons
// const Icon = React.memo(({ name, className }) => {
//   const icons = {
//     email: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
//     phone: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
//     location: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
//   };
//   return icons[name] || null;
// });

export const defaultResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [
    {
      position: '',
      company: '',
      duration: '',
      description: ''
    }
  ],
  education: [
    {
      degree: '',
      school: '',
      year: ''
    }
  ],
  skills: [
    {
      name: '',
      level: 75
    }
  ],
  projects: [
    {
      name: '',
      description: '',
      technologies: []
    }
  ]
};



// 3. Return null or a loader while redirecting to avoid flickering

const DownloadButton = ({ startTimeRef }) => {
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ✅ Load user from localStorage on first render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleDownload = async () => {
    const resumeContent = document.getElementById("resume-preview")?.firstElementChild;

    // Calculate duration
    const durationInSeconds = startTimeRef?.current
      ? Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000))
      : 0;

    if (!user?.isPremium) {
      setShowPremiumPopup(true);
      return;
    }

    if (!resumeContent) {
      alert("Could not find resume content. Please select a template first.");
      return;
    }

    setIsGenerating(true);

    const options = {
      margin: [0, 0, 0, 0],
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    try {
      await html2pdf().from(resumeContent).set(options).save();

      // ✅ LOG ACTIVITY
      logStudentActivity(
        "RESUME_BUILDER",
        "Downloaded Resume",
        "Student downloaded a PDF of their resume",
        {},
        durationInSeconds,
        null,
        "Completed"
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${isGenerating
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        {isGenerating ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </div>
        ) : (
          "Download PDF"
        )}
      </button>
      <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
        Save Draft
      </button>

      {showPremiumPopup && (
        <PremiumPopup
          onClose={() => setShowPremiumPopup(false)}
          onUpgrade={() => {
            const upgradedUser = { ...user, isPremium: true };
            setUser(upgradedUser);
            localStorage.setItem("user", JSON.stringify(upgradedUser));
            setShowPremiumPopup(false);
          }}
        />
      )}
    </div>
  );
};

const ResumeForm = () => {
  const { resumeData, updateResumeData } = useResumeContext();
  const [activeSection, setActiveSection] = useState('personal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isPremium = user?.isPremium || false;

  useEffect(() => {
    // 2. Perform the redirect inside useEffect
    if (!isPremium) {
      navigate("/pricing");
    }
  }, [isPremium, navigate]);

  useEffect(() => {
    // Add viewport meta tag to prevent zooming on mobile
    let existingMeta = document.querySelector('meta[name="viewport"]');
    if (existingMeta) {
      existingMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      document.head.appendChild(meta);
    }

    // Add mobile-specific body class
    document.body.classList.add('mobile-resume-form');

    return () => {
      document.body.classList.remove('mobile-resume-form');
    };
  }, []);

  const handleInputChange = (section, field, value) => {
    updateResumeData({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value
      }
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...(resumeData[section] || [])];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    updateResumeData({
      ...resumeData,
      [section]: updatedArray
    });
  };

  const addArrayItem = (section, newItem) => {
    updateResumeData({
      ...resumeData,
      [section]: [...(resumeData[section] || []), newItem]
    });
  };

  const removeArrayItem = (section, index) => {
    const updatedArray = (resumeData[section] || []).filter((_, i) => i !== index);
    updateResumeData({
      ...resumeData,
      [section]: updatedArray
    });
  };

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 resume-form-container" ref={formRef}>
      {/* Mobile menu button */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-full p-3 bg-gray-100 rounded-md mobile-menu-button"
        >
          {isMobileMenuOpen ? (
            <>
              <X className="w-5 h-5 mr-2" />
              Close Menu
            </>
          ) : (
            <>
              <Menu className="w-5 h-5 mr-2" />
              {sections.find(s => s.id === activeSection)?.label || 'Menu'}
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Section tabs - desktop */}
        <div className="hidden sm:block sm:mr-6 sm:w-48 flex-shrink-0">
          <div className="sticky top-4 space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === section.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section tabs - mobile */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mb-4">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-md font-medium ${activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form content */}
        <div className="flex-1">
          <div className="space-y-4" style={{ padding: '0' }}>
            {activeSection === 'personal' && (
              <div className="space-y-4 form-section">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-column">
                  <div className="form-field-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={resumeData.personal?.firstName || ''}
                      onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={resumeData.personal?.lastName || ''}
                      onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                </div>
                <div className="form-field-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.personal?.email || ''}
                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-column">
                  <div className="form-field-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personal?.phone || ''}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={resumeData.personal?.location || ''}
                      onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div className="form-field-group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={resumeData.personal?.summary || ''}
                    onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-6 form-section">
                {(resumeData.experience || []).map((exp, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-column">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <input
                          type="text"
                          value={exp.position || ''}
                          onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={exp.description || ''}
                        onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeArrayItem('experience', index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('experience', { position: '', company: '', duration: '', description: '' })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 add-button"
                >
                  Add Experience
                </button>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-6 form-section">
                {(resumeData.education || []).map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-column">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree || ''}
                          onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School / University</label>
                        <input
                          type="text"
                          value={edu.school || ''}
                          onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={edu.year || ''}
                        onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="e.g., 2020 - 2024"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeArrayItem('education', index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('education', { degree: '', school: '', year: '' })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 add-button"
                >
                  Add Education
                </button>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-6 form-section">
                {(resumeData.skills || []).map((skill, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                      <input
                        type="text"
                        value={skill.name || ''}
                        onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('skills', { name: '' })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 add-button"
                >
                  Add Skill
                </button>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="space-y-6 form-section">
                {(resumeData.projects || []).map((project, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={project.name || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={project.description || ''}
                        onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={(project.technologies || []).join(', ')}
                        onChange={(e) => handleArrayChange('projects', index, 'technologies', e.target.value.split(',').map(item => item.trim()))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeArrayItem('projects', index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('projects', { name: '', description: '', technologies: [] })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 add-button"
                >
                  Add Project
                </button>
              </div>
            )}

            {activeSection === 'certifications' && (
              <div className="space-y-6 form-section">
                {(resumeData.certifications || []).map((cert, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mobile-single-column">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                        <input
                          type="text"
                          value={cert.name || ''}
                          onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                        <input
                          type="text"
                          value={cert.issuer || ''}
                          onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Awarded</label>
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        placeholder="e.g., June 2023"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => removeArrayItem('certifications', index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 add-button"
                >
                  Add Certification
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumePreview = ({ templateComponent: TemplateComponent }) => {
  const { resumeData } = useResumeContext();
  const [zoom, setZoom] = useState(0.75);
  const previewRef = useRef(null);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  // Adjust zoom for mobile to fit the content
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Mobile breakpoint
        setZoom(0.5);
      } else {
        setZoom(0.75);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Live Preview</h2>
        <div className="flex space-x-2">
          <button
            onClick={zoomIn}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Zoom In
          </button>
          <button
            onClick={zoomOut}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Zoom Out
          </button>
        </div>
      </div>

      <div
        className="border border-gray-200 rounded-lg overflow-auto grid place-items-center p-4"
        style={{ maxWidth: '100%', overflowX: 'auto' }}
      >
        <div
          id="resume-preview"
          ref={previewRef}
          className="bg-white p-4 sm:p-8 min-h-[11in] origin-top shadow-lg"
          style={{
            width: "8.5in",
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          {TemplateComponent ? (
            <TemplateComponent data={resumeData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="text-base sm:text-lg mb-2">
                  Select a template to see preview
                </p>
                <p className="text-sm">Choose from our professional templates</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};




// const TemplateCard = ({ template }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//     <div className="relative">
//       <img src={template.preview} alt={template.name} className="w-full h-64 object-cover" />
//       <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
//         <Link to={`/builder/${template.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-md opacity-0 hover:opacity-100 transition-opacity transform hover:scale-105">Use Template</Link>
//       </div>
//     </div>
//     <div className="p-4">
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
//       <p className="text-gray-600 text-sm">{template.description}</p>
//       <div className="mt-3 flex items-center justify-between">
//         <span className="text-sm text-gray-500">{template.category}</span>
//         <Link to={`/builder/${template.id}`} className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">Select →</Link>
//       </div>
//     </div>
//   </div>
// );
// --- Resume Builder Page ---
const ResumeBuilderPage = ({ getTemplateComponent, templates }) => {
  const startTime = useRef(Date.now());
  const { type } = useParams();
  const { selectedTemplate, setSelectedTemplate, resumeData, updateResumeData } = useResumeContext();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?._id && !user?.id) return;

      const isExecutive = type === 'executive';
      const hasData = resumeData?.personal?.firstName;

      // Force fetch for executive or if data is missing
      if (isExecutive || !hasData) {
        setLoading(true);
        try {
          const userId = user._id || user.id;
          const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
          const result = await response.json();

          if (result.profile) {
            const fullName = result.profile.name || "";
            const [firstName, ...lastNameParts] = fullName.split(' ');
            const lastName = lastNameParts.join(' ');

            updateResumeData({
              ...resumeData,
              personal: {
                ...resumeData.personal,
                firstName: firstName || '',
                lastName: lastName || '',
                email: result.profile.email || '',
                phone: result.profile.mobile || '',
              }
            });
          }
        } catch (error) {
          console.error("Error fetching profile for resume:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?._id, type]);

  const TemplateComponent = getTemplateComponent
    ? getTemplateComponent(selectedTemplate)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-700 font-medium">Syncing your profile...</p>
          </div>
        </div>
      )}
      <div className="container items-center mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Build Your Resume
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill in your details, choose a template, and see your professional resume
            come to life in real-time.
          </p>
        </motion.div>

        {/* Step Guide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 bg-blue-50 rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">📋 Steps to Build</h2>
          <div className="grid md:grid-cols-4 gap-4 text-blue-700 text-sm">
            <div>① Choose your template</div>
            <div>② Fill in personal & professional info</div>
            <div>③ Preview in real-time</div>
            <div>④ Download as PDF</div>
          </div>
        </motion.div>

        {/* Template Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-col items-center bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Your Template
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {(templates || []).map((template) => (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                whileHover={{ scale: 1.03 }}
                className={`flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 space-x-0 p-6 rounded-2xl border-2 shadow-sm transition-all ${selectedTemplate === template.id
                  ? "border-blue-600 bg-blue-50 shadow-md hover:bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-white hover:border-[rgb(147,197,253)]"
                  }`}
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-48 h-60 object-cover rounded-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                  <p className="text-gray-600 text-sm">{template.category}</p>
                </div>
              </motion.button>
            ))}
          </div>


        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <ResumeForm />
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Export Resume
              </h2>
              <p className="text-gray-600 mb-4">
                Once satisfied, download your resume as a high-quality PDF file.
              </p>
              <DownloadButton startTimeRef={startTime} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:sticky lg:top-8"
          >
            <ResumePreview templateComponent={TemplateComponent} />
          </motion.div>
        </div>

        {/* Resume Tips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">💡 Resume Tips</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h3 className="font-semibold mb-1">✂ Keep it concise</h3>
              <p>Limit your resume to 1-2 pages and focus on relevant experience.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">⚡ Use action verbs</h3>
              <p>Start bullet points with strong action verbs like "Managed" or "Developed".</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">📊 Quantify achievements</h3>
              <p>Show results with numbers and measurable impact.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">🎯 Tailor to the job</h3>
              <p>Match your resume content to the specific job you’re applying for.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Templates ---
// Template1.jsx

const Template1 = ({ data }) => {
  const {
    personal,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data || {};

  const textWrapStyle = {
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  };

  const sectionHeader = (title) => (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2
          className="text-xl font-semibold text-blue-600"
          style={{
            marginBottom: '0px',
            paddingBottom: '2px',
            backgroundColor: '#ffffff',
            position: 'relative',
            zIndex: 2,
            ...textWrapStyle,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          height: '2px',
          backgroundColor: '#1f2937', // Tailwind gray-800
          marginTop: '6px',
          marginBottom: '10px',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </>
  );

  return (
    <div className="resume-wrapper">
      {/* Print/Export CSS to keep it to one page unless needed */}
      <style>{`
        /* A4-safe container width in screen preview (96dpi ~ 794px) */
        .resume-wrapper {
          display: block;
          background: #fff;
          color: #1f2937;
        }

        /* Keep a tight, predictable layout */
        .resume {
          box-sizing: border-box;
          width: 794px;            /* ~A4 width at 96dpi */
          margin: 0 auto;
          padding: 20px;           /* compact padding to avoid overflow */
          line-height: 1.4;
        }

        /* Avoid breaks inside sections (best-effort across engines) */
        section {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Prevent tiny last-line push onto a new page in some engines */
        section:last-child {
          margin-bottom: 0;
        }

        /* Print rules */
        @media print {
          @page {
            size: A4;
            margin: 10mm;          /* tighter page margin gives more room */
          }

          /* Ensure the printed width fits within A4 printable area */
          .resume {
            width: auto;           /* let it fill page width minus margins */
            max-width: 100%;
            margin: 0;
            padding: 8mm;          /* compact padding for print */
          }

          /* Strongly discourage page breaks inside these blocks */
          header,
          section,
          .section-block {
            break-inside: avoid-page;
            page-break-inside: avoid;
          }

          /* Avoid accidental forced breaks around headings/lines */
          h1, h2, h3 {
            break-after: avoid-page;
            break-before: avoid-page;
            page-break-after: avoid;
            page-break-before: avoid;
          }
        }
      `}</style>

      <div
        className="resume max-w-full bg-white text-gray-800 leading-relaxed"
        style={textWrapStyle}
      >
        {/* Header */}
        <header className="pb-3 mb-4 section-block">
          <h1 className="text-3xl font-bold text-gray-900 mb-1" style={textWrapStyle}>
            {personal?.firstName || ''} {personal?.lastName || ''}
          </h1>
          <div className="text-sm text-gray-600 space-y-1" style={textWrapStyle}>
            <div>{personal?.email || ''}</div>
            <div>{personal?.phone || ''}</div>
            <div>{personal?.location || ''}</div>
          </div>
        </header>

        {/* Professional Summary */}
        {personal?.summary && (
          <section className="mb-4 section-block">
            {sectionHeader('Professional Summary')}
            <p className="text-gray-700 text-sm" style={textWrapStyle}>
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-4 section-block">
            {sectionHeader('Professional Experience')}
            {experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-900" style={textWrapStyle}>
                  {exp.position}
                </h3>
                <div className="text-sm text-gray-600 mb-1">{exp.duration}</div>
                <p className="text-blue-600 font-medium mb-2" style={textWrapStyle}>
                  {exp.company}
                </p>
                <p className="text-gray-700 text-sm" style={textWrapStyle}>
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-4 section-block">
            {sectionHeader('Education')}
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold text-gray-900" style={textWrapStyle}>
                  {edu.degree}
                </h3>
                <p className="text-blue-600" style={textWrapStyle}>{edu.school}</p>
                <p className="text-sm text-gray-600">{edu.year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-4 section-block">
            {sectionHeader('Skills')}
            <ul style={{ paddingLeft: '1rem', margin: 0 }}>
              {skills.map((skill, index) => (
                <li
                  key={index}
                  style={{
                    listStyle: 'none',
                    marginBottom: '0.25rem',
                    ...textWrapStyle,
                  }}
                >
                  • {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="section-block">
            {sectionHeader('Projects')}
            {projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-1" style={textWrapStyle}>
                  {project.name}
                </h3>
                <p className="text-gray-700 text-sm" style={textWrapStyle}>
                  {project.description}
                </p>
                {project.technologies && (
                  <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem', marginBottom: 0 }}>
                    {project.technologies.map((tech, techIndex) => (
                      <li
                        key={techIndex}
                        className="text-xs text-gray-700"
                        style={{
                          listStyle: 'none',
                          marginBottom: '0.25rem',
                          ...textWrapStyle,
                        }}
                      >
                        • {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section className="trim avoid-break">
            <h2 className="text-xl font-semibold mb-3 border-b-2 border-black pb-2 text-blue-600">Certifications</h2>
            <ul className="modern-list">
              {certifications.map((cert, index) => (
                <li key={index} className="wrap" style={{ display: 'block' }}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-800 text-sm font-medium">{cert.name}</span>
                    {cert.issued && <span className="text-xs text-gray-500">{cert.issued}</span>}
                  </div>
                  {cert.org && <p className="text-gray-600 text-xs mt-1">{cert.org}</p>}
                  {cert.id && <p className="text-gray-500 text-xs">ID: {cert.id}</p>}
                  {cert.url && (
                    <p className="text-blue-600 text-xs wrap">{cert.url}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

// export default Template1;


// template2.jsx
const Template2 = ({ data }) => {
  const {
    personal = {},
    experience = [],
    certifications = [],
    education = [],
    skills = [],
    projects = [],
  } = data || {};

  // Unified, print-safe contact icons
  const contacts = [
    { icon: '✉', value: personal?.email || '' },
    { icon: '☎', value: personal?.phone || '' },
    { icon: '📍', value: personal?.location || '' },
  ];

  return (
    <div className="print-root flex justify-center items-center min-h-screen bg-gray-100 print:bg-white print:p-0">
      <style>{`
        /* Core page sizing */
        .a4 {
          width: 794px;
          height: 1123px;
          background: #fff;
          position: relative;
        }

        /* Improved wrapping and alignment */
        .wrap {
          word-break: break-word;
          overflow-wrap: anywhere;
          display: inline-block;
          vertical-align: middle;
        }

        /* Perfectly aligned contact row */
        .contact-row {
          display: grid;
          grid-template-columns: 1.25em 1fr;
          column-gap: 8px;
          align-items: center;
          line-height: 1.28;
          min-height: 1.5em;
          margin-bottom: 0.5em;
        }
        .icon-cell {
          width: 1.25em;
          height: 1.25em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          top: 0.05em;
        }
        .glyph-icon {
          font-size: 1em;
          line-height: 1;
          display: block;
        }

        /* Modern list marker (replaces native bullets) */
        .modern-list { list-style: none; padding: 0; margin: 0.5em 0; }
        .modern-list li {
          position: relative;
          padding-left: 1.2em;
          margin-bottom: 0.35em;
          line-height: 1.35;
        }
        .modern-list li::before {
          content: '➤';
          position: absolute;
          left: 0;
          top: 0.1em;
          color: #60a5fa; /* blue-400 */
          font-size: 0.9em;
        }

        /* Trim last-child margins */
        .trim > :last-child,
        .trim ul > :last-child,
        .trim li > :last-child {
          margin-bottom: 0 !important;
        }

        /* Print-specific fixes */
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html, body {
            padding: 0 !important;
            margin: 0 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-root {
            min-height: auto !important;
            height: 100% !important;
          }
          .no-print-shadow {
            box-shadow: none !important;
            border: none !important;
          }
          .a4 {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          header, section, .avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          h1, h2, h3 {
            break-after: avoid;
            page-break-after: avoid;
          }
        }
      `}</style>

      <div
        className="a4 no-print-shadow mx-auto"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        }}
      >
        {/* Sidebar */}
        <aside
          className="bg-slate-800 text-white"
          style={{
            width: '40%',
            padding: '10mm',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <header className="mb-5 trim avoid-break">
            <h1 className="text-2xl font-bold wrap">
              {personal?.firstName || ''} {personal?.lastName || ''}
            </h1>
            {personal?.title && (
              <p className="text-blue-300 text-sm mt-1 wrap">{personal.title}</p>
            )}
          </header>

          <section className="mb-6 trim avoid-break">
            <h2 className="text-lg font-semibold mb-3 text-blue-300 uppercase tracking-wider">CONTACT</h2>
            <ul className="text-sm">
              {contacts.map((c, idx) => (
                <li key={idx} className="contact-row wrap">
                  <span className="icon-cell">
                    <span className="glyph-icon text-blue-300">{c.icon}</span>
                  </span>
                  <span className="wrap">{c.value}</span>
                </li>
              ))}
            </ul>
          </section>

          {skills.length > 0 && (
            <section className="mb-6 trim avoid-break">
              <h2 className="text-lg font-semibold mb-3 text-blue-300 uppercase tracking-wider">SKILLS</h2>
              <ul className="modern-list text-sm wrap">
                {skills.map((skill, index) => (
                  <li key={index}>{typeof skill === 'string' ? skill : skill?.name}</li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-6 trim avoid-break">
              <h2 className="text-lg font-semibold mb-3 text-blue-300 uppercase tracking-wider">EDUCATION</h2>
              <ul className="text-sm">
                {education.map((edu, index) => (
                  <li key={index} className="mb-3 wrap" style={{ display: 'block' }}>
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-slate-300">{edu.school}</p>
                    <p className="text-slate-400 text-xs">{edu.year}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {projects.length > 0 && (
            <section className="trim avoid-break">
              <h2 className="text-lg font-semibold mb-3 text-blue-300 uppercase tracking-wider">PROJECTS</h2>
              <ul className="text-sm">
                {projects.map((project, index) => (
                  <li key={index} className="mb-3 wrap" style={{ display: 'block' }}>
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    <p className="text-slate-300 text-xs mt-1">{project.description}</p>
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                      <p className="text-slate-400 text-xs mt-1">
                        {project.technologies.join(' • ')}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Main */}
        <main
          className="bg-white"
          style={{
            width: '60%',
            padding: '10mm',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {personal?.summary && (
            <section className="mb-6 trim avoid-break">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-blue-400 pb-2">About Me</h2>
              <p className="text-gray-700 text-sm leading-relaxed wrap">{personal.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-6 trim avoid-break">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-blue-400 pb-2">Experience</h2>
              <ul className="modern-list">
                {experience.map((exp, index) => {
                  const points = typeof exp.description === 'string'
                    ? exp.description.split('\n').map(s => s.trim()).filter(Boolean)
                    : Array.isArray(exp.description)
                      ? exp.description.filter(Boolean)
                      : [];

                  return (
                    <li key={index} className="wrap" style={{ display: 'block' }}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base font-semibold text-gray-800">{exp.position}</h3>
                        <span className="text-xs text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-blue-600 text-sm font-medium mb-2">{exp.company}</p>
                      {points.length > 0 && (
                        <ul className="modern-list ml-2">
                          {points.map((point, i) => (
                            <li key={i} className="text-gray-600 text-sm wrap">{point}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="trim avoid-break">
              <h2 className="text-2xl font-bold text-slate-900 mb-3 border-b-2 border-blue-400 pb-2">Certifications</h2>
              <ul className="modern-list">
                {certifications.map((cert, index) => (
                  <li key={index} className="wrap" style={{ display: 'block' }}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-800 text-sm font-medium">{cert.name}</span>
                      {cert.issued && <span className="text-xs text-gray-500">{cert.issued}</span>}
                    </div>
                    {cert.org && <p className="text-gray-600 text-xs mt-1">{cert.org}</p>}
                    {cert.id && <p className="text-gray-500 text-xs">ID: {cert.id}</p>}
                    {cert.url && (
                      <p className="text-blue-600 text-xs wrap">{cert.url}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
















// Template3.jsx
const Template3 = ({ data }) => {
  const { personal, experience = [], education = [], skills = [], projects = [] } = data || {};

  const SectionTitle = ({ children }) => (
    <h2 className="text-center text-sm font-semibold text-gray-800 tracking-widest mb-4 uppercase">
      {children}
    </h2>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed p-8" style={{ fontSize: '11pt' }}>
      <style>{`
        /* Universal safe wrapping */
        .wrap { word-break: break-word; overflow-wrap: anywhere; hyphens: auto; }

        /* Let flex children actually wrap instead of overflowing */
        .flex-min0 > * { min-width: 0; }

        /* Modern, PDF-safe bullets via pseudo-element */
        .modern-list { list-style: none; padding: 0; margin: 0; }
        .modern-list li { position: relative; padding-left: 1.2em; line-height: 1.35; margin-bottom: 4px; }
        .modern-list li::before { content: '➤'; position: absolute; left: 0; top: 0.1em; font-size: 0.9em; color: #2563eb; }

        /* Contact line wraps on small widths */
        .contact-inline { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; align-items: center; }
        .contact-inline > span { min-width: 0; }
        .contact-sep { color: #9ca3af; }
      `}</style>

      {/* Header with improved line separators */}
      <header className="text-center py-6 border-b-2 border-gray-300">
        <h1 className="text-3xl font-thin mb-4 tracking-wide wrap">
          {personal?.firstName || ''} <span className="font-normal">{personal?.lastName || ''}</span>
        </h1>
        <div className="contact-inline text-gray-600">
          <span className="wrap">{personal?.email || ''}</span>
          <span className="contact-sep">|</span>
          <span className="wrap">{personal?.phone || ''}</span>
          <span className="contact-sep">|</span>
          <span className="wrap">{personal?.location || ''}</span>
        </div>
      </header>

      {/* Professional Summary */}
      {personal?.summary && (
        <section className="py-6">
          <p className="text-center text-gray-700 max-w-3xl mx-auto wrap">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Experience with darker border */}
      {experience.length > 0 && (
        <section className="py-4 border-t-2 border-gray-300">
          <SectionTitle>Experience</SectionTitle>
          <ul className="space-y-4">
            {experience.map((exp, index) => (
              <li key={index}>
                <div className="flex items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-baseline flex-min0">
                      <h3 className="text-base font-medium text-gray-900 wrap">{exp?.position}</h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">{exp?.duration}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1 wrap">{exp?.company}</p>

                    {/* Modern bullets for the description points */}
                    <ul className="modern-list">
                      {exp?.description
                        ?.split('\n')
                        .filter(point => point.trim())
                        .map((point, i) => (
                          <li key={i} className="text-gray-700 text-sm wrap">{point}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education with darker border */}
      {education.length > 0 && (
        <section className="py-4 border-t-2 border-gray-300">
          <SectionTitle>Education</SectionTitle>
          <ul className="space-y-3">
            {education.map((edu, index) => (
              <li key={index}>
                <div className="flex items-start">
                  <div className="w-full">
                    <div className="flex justify-between items-baseline flex-min0">
                      <h3 className="text-base font-medium text-gray-900 wrap">{edu?.degree}</h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">{edu?.year}</span>
                    </div>
                    <p className="text-gray-600 text-sm wrap">{edu?.school}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills with darker border */}
      {skills.length > 0 && (
        <section className="py-4 border-t-2 border-gray-300">
          <SectionTitle>Skills</SectionTitle>
          <ul className="modern-list grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
            {skills.map((skill, index) => (
              <li key={index} className="text-gray-700 wrap">
                {typeof skill === 'string' ? skill : skill?.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects with darker border */}
      {projects.length > 0 && (
        <section className="py-4 border-t-2 border-gray-300">
          <SectionTitle>Projects</SectionTitle>
          <ul className="space-y-4">
            {projects.map((project, index) => (
              <li key={index}>
                <div className="flex items-start">
                  <div className="w-full">
                    <h3 className="text-base font-medium text-gray-900 mb-1 wrap">{project?.name}</h3>

                    {/* Modern bullets for project description points */}
                    <ul className="modern-list">
                      {project?.description
                        ?.split('\n')
                        .filter(point => point.trim())
                        .map((point, i) => (
                          <li key={i} className="text-gray-700 text-sm wrap">{point}</li>
                        ))}
                    </ul>

                    {project?.technologies?.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1 wrap">
                        <span className="font-medium">Technologies:</span>{' '}
                        {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};







// Template4.jsx
// Unified to ONE icon source: text glyphs (✉, ☎, 📍) for both screen and print.
// No external icon imports. No mixed sources. Modern, PDF-safe list markers included.

const Template4 = ({ data }) => {
  const { personal, experience = [], education = [], skills = [], projects = [] } = data || {};

  // Contact rows rendered from a single, explicit mapping
  const contactRows = [
    { glyph: '✉', value: personal?.email || '' },
    { glyph: '☎', value: personal?.phone || '' },
    { glyph: '📍', value: personal?.location || '' },
  ];

  return (
    <div
      className="template4-root"
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '15mm',
        fontFamily: "'Calibri', 'Arial', sans-serif",
        color: '#333',
        backgroundColor: 'white',
        boxSizing: 'border-box',
        lineHeight: 1.4
      }}
    >
      <style>{`
        /* Universal safe wrapping */
        .wrap { word-break: break-word; overflow-wrap: anywhere; hyphens: auto; }

        /* Let flex children wrap instead of overflowing */
        .flex-min0 > * { min-width: 0; }

        /* Inline contact row and wrapping across lines */
        .contact-inline {
          display: flex;
          flex-wrap: wrap;
          gap: 8mm;
          justify-content: center;
          align-items: center;
        }

        /* Icon + text alignment */
        .contact-row {
          display: grid;
          grid-template-columns: 1.2em 1fr;
          column-gap: 2mm;
          align-items: center;
        }
        .icon-cell {
          width: 1.2em;
          height: 1.2em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .glyph-icon {
          display: inline-block;
          font-size: 1em;
          line-height: 1;
          transform: translateY(0.04em); /* subtle optical baseline alignment */
        }

        /* Modern, PDF-safe bullets via pseudo-element */
        .modern-list { list-style: none; padding: 0; margin: 0; }
        .modern-list li {
          position: relative;
          padding-left: 1.2em;
          line-height: 1.35;
          margin-bottom: 1mm;
        }
        .modern-list li::before {
          content: '➤';
          position: absolute;
          left: 0;
          top: 0.1em;
          font-size: 0.9em;
          color: #3498db; /* accent color */
        }

        /* Trim last-child margins in tight sections */
        .trim > :last-child,
        .trim ul > :last-child,
        .trim li > :last-child { margin-bottom: 0 !important; }
      `}</style>

      {/* Header Section */}
      <header
        className="trim"
        style={{
          textAlign: 'center',
          marginBottom: '8mm',
          borderBottom: '2px solid #2c3e50',
          paddingBottom: '4mm'
        }}
      >
        <h1
          className="wrap"
          style={{
            fontSize: '22pt',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '2mm',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {personal?.firstName || ''} {personal?.lastName || ''}
        </h1>

        <div className="contact-inline" style={{ fontSize: '10pt' }}>
          {contactRows.map((row, i) => (
            <div className="contact-row" key={i}>
              <span className="icon-cell">
                <span className="glyph-icon" aria-hidden>{row.glyph}</span>
              </span>
              <span className="wrap">{row.value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Professional Summary */}
      {personal?.summary && (
        <section className="trim" style={{ marginBottom: '8mm' }}>
          <h2 style={sectionTitleStyle}>PROFESSIONAL SUMMARY</h2>
          <p className="wrap" style={{ fontSize: '11pt' }}>
            {personal.summary}
          </p>
        </section>
      )}

      {/* Skills Section - modern bullets */}
      {skills.length > 0 && (
        <section className="trim" style={{ marginBottom: '8mm' }}>
          <h2 style={sectionTitleStyle}>SKILLS & EXPERTISE</h2>
          <ul className="modern-list" style={{ fontSize: '11pt' }}>
            {skills.map((skill, index) => (
              <li key={index} className="wrap">
                {typeof skill === 'string' ? skill : skill?.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="trim" style={{ marginBottom: '8mm' }}>
          <h2 style={sectionTitleStyle}>PROFESSIONAL EXPERIENCE</h2>
          <div style={{ fontSize: '11pt' }}>
            {experience.map((exp, index) => (
              <div key={index} style={{ marginBottom: '5mm' }}>
                <div className="flex-min0" style={betweenStyle}>
                  <span className="wrap" style={{ fontWeight: 'bold' }}>{exp?.position}</span>
                  <span style={italicGray}>{exp?.duration}</span>
                </div>
                <div className="wrap" style={blueAccent}>
                  {exp?.company}
                </div>
                <ul className="modern-list">
                  {exp?.description
                    ?.split('\n')
                    .filter(point => point.trim())
                    .map((point, i) => (
                      <li key={i} className="wrap">{point}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="trim" style={{ marginBottom: '8mm' }}>
          <h2 style={sectionTitleStyle}>EDUCATION</h2>
          <div style={{ fontSize: '11pt' }}>
            {education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '3mm' }}>
                <div className="flex-min0" style={betweenStyle}>
                  <span className="wrap" style={{ fontWeight: 'bold' }}>{edu?.degree}</span>
                  <span style={italicGray}>{edu?.year}</span>
                </div>
                <div className="wrap" style={blueAccent}>{edu?.school}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="trim">
          <h2 style={sectionTitleStyle}>PROJECTS</h2>
          <div style={{ fontSize: '11pt' }}>
            {projects.map((project, index) => (
              <div key={index} style={{ marginBottom: '5mm' }}>
                <div className="wrap" style={{ fontWeight: 'bold' }}>{project?.name}</div>
                <ul className="modern-list" style={{ margin: '2mm 0' }}>
                  {project?.description
                    ?.split('\n')
                    .filter(point => point.trim())
                    .map((point, i) => (
                      <li key={i} className="wrap">{point}</li>
                    ))}
                </ul>
                {project?.technologies?.length > 0 && (
                  <div className="wrap" style={{ fontSize: '10pt', color: '#666' }}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* Inline style objects */
const sectionTitleStyle = {
  fontSize: '14pt',
  fontWeight: 'bold',
  color: '#2c3e50',
  borderBottom: '1px solid #ddd',
  paddingBottom: '2mm',
  marginBottom: '3mm',
  textTransform: 'uppercase'
};
const betweenStyle = { display: 'flex', justifyContent: 'space-between', columnGap: '4mm', marginBottom: '1mm' };
const italicGray = { color: '#666', fontStyle: 'italic', flexShrink: 0 };
const blueAccent = { fontWeight: 500, color: '#3498db', marginBottom: '2mm' };












// Template5.jsx


const Template5 = ({ data }) => {
  const {
    personal,
    experience = [],
    education = [],
    skills = [],
    projects = []
  } = data || {};

  return (
    <div className="template5-root max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed print:bg-white">
      {/* Embedded CSS */}
      <style>{`
        /* Universal safe wrapping */
        .wrap { word-break: break-word; overflow-wrap: anywhere; hyphens: auto; }

        /* Let flex children shrink instead of overflowing */
        .flex-min0 > * { min-width: 0; }
        .no-shrink { flex-shrink: 0; }

        /* Modern list: no native bullets, arrow marker via ::before */
        .modern-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .modern-list li {
          position: relative;
          padding-left: 1.2em;       /* space for the marker */
          margin-bottom: 0.4rem;
          line-height: 1.45;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .modern-list li::before {
          content: '➤';
          position: absolute;
          left: 0;
          top: 0.15em;                /* vertical align tweak */
          color: #16a34a;             /* Tailwind green-600 */
          font-size: 0.9em;
        }

        /* Keep each section with its title together on one page */
        .avoid-break {
          break-inside: avoid-page;
          page-break-inside: avoid;
        }
        /* Trim last-child margins to prevent ghost extra page */
        .trim > :last-child,
        .trim ul > :last-child,
        .trim li > :last-child {
          margin-bottom: 0 !important;
        }

        @page {
          size: A4;
          margin: 12mm;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .template5-root {
            width: 210mm;
            margin: 0 auto !important;
          }
          /* Prevent min-height quirks pushing a phantom second page */
          .print-minh-auto { min-height: auto !important; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-green-700 text-white p-8 trim avoid-break">
        <div className="flex items-center justify-between print:flex-wrap print:gap-4">
          <div className="flex-min0">
            <h1 className="text-3xl font-bold mb-2 wrap">
              {personal?.firstName || ""} {personal?.lastName || ""}
            </h1>
            <div className="space-y-1 text-green-100">
              <p className="wrap">✉ {personal?.email || ""}</p>
              <p className="wrap">☎ {personal?.phone || ""}</p>
              <p className="wrap">📍 {personal?.location || ""}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 print-minh-auto">
        {/* Professional Summary */}
        {personal?.summary && (
          <section className="mb-8 trim avoid-break">
            <h2 className="text-2xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200 wrap">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg wrap">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <section className="mb-8 trim avoid-break">
            <h2 className="text-2xl font-bold text-green-700 mb-6 pb-2 border-b-2 border-green-200 wrap">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-green-400 pl-6 avoid-break"
                >
                  <div className="bg-gray-50 p-6 rounded-r-lg">
                    <div className="flex justify-between items-start mb-3 flex-min0">
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 wrap">
                          {exp.position}
                        </h3>
                        <p className="text-green-600 font-medium text-lg wrap">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full no-shrink">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="modern-list text-gray-700">
                      {exp.description
                        ?.split("\n")
                        .filter((line) => line.trim())
                        .map((point, i) => (
                          <li key={i} className="wrap">
                            {point}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8 trim avoid-break">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-200 wrap">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 avoid-break"
                  >
                    <h3 className="font-semibold text-gray-900 wrap">
                      {edu.degree}
                    </h3>
                    <p className="text-green-600 font-medium wrap">
                      {edu.school}
                    </p>
                    <p className="text-sm text-gray-500 no-shrink">
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Skills */}
          {skills.length > 0 && (
            <section className="mb-8 trim avoid-break">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b border-green-200 wrap">
                Core Skills
              </h2>
              <ul className="modern-list text-gray-800">
                {skills.map((skill, idx) => (
                  <li key={idx} className="wrap">
                    {typeof skill === "string" ? skill : skill?.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Key Projects */}
        {projects.length > 0 && (
          <section className="trim avoid-break">
            <h2 className="text-2xl font-bold text-green-700 mb-6 pb-2 border-b-2 border-green-200 wrap">
              Key Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200 avoid-break"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 wrap">
                    {project.name}
                  </h3>
                  <ul className="modern-list text-gray-700 mb-4">
                    {project.description
                      ?.split("\n")
                      .filter((line) => line.trim())
                      .map((point, i) => (
                        <li key={i} className="wrap">
                          {point}
                        </li>
                      ))}
                  </ul>
                  {project.technologies?.length > 0 && (
                    <div className="text-sm wrap">
                      <strong>Technologies:</strong>{" "}
                      {project.technologies.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};







const Template6 = ({ data }) => {
  const {
    personal,
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data || {};

  const Section = ({ title, children }) => (
    <section className="mb-6 avoid-break">
      <h2 className="text-xl font-semibold text-blue-600 mb-3 border-b border-gray-300 pb-1">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg wrap"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        maxWidth: '210mm',
      }}
    >
      <style>{`
        .wrap {
          word-break: break-word;
          overflow-wrap: anywhere;
          hyphens: auto;
        }
        .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .modern-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .modern-list li {
          position: relative;
          padding-left: 1.2em;
          margin-bottom: 0.35rem;
          line-height: 1.5;
        }
        .modern-list li::before {
          content: '➤';
          position: absolute;
          left: 0;
          top: 0.1em;
          color: #2563eb;
          font-size: 0.9em;
        }
        .trim > :last-child {
          margin-bottom: 0 !important;
        }
      `}</style>

      {/* Header */}
      <header className="bg-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2 wrap">
          {personal?.firstName || ''} {personal?.lastName || ''}
        </h1>
        <div className="flex flex-wrap items-center gap-x-2 text-sm wrap">
          <span className="wrap">{personal?.email || ''}</span>
          <span className="mx-2 opacity-50">|</span>
          <span className="wrap">{personal?.phone || ''}</span>
          <span className="mx-2 opacity-50">|</span>
          <span className="wrap">{personal?.location || ''}</span>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personal?.summary && (
          <Section title="Professional Summary">
            <p className="text-gray-700 wrap">{personal.summary}</p>
          </Section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <Section title="Professional Experience">
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="trim">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 wrap">{exp?.position}</h3>
                    <span className="text-sm text-gray-600 wrap">{exp?.duration}</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2 wrap">{exp?.company}</p>
                  <ul className="modern-list wrap">
                    {(exp?.description?.split('\n').filter(Boolean) || []).map((point, i) => (
                      <li key={i} className="text-gray-700 text-sm wrap">{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <Section title="Education">
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="trim">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 wrap">{edu?.degree}</h3>
                      <p className="text-blue-600 wrap">{edu?.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 wrap">{edu?.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Section title="Skills">
            <ul className="modern-list grid grid-cols-2 gap-x-4 gap-y-1 wrap">
              {skills.map((skill, index) => (
                <li key={index} className="text-gray-700 wrap">
                  {typeof skill === 'string' ? skill : skill?.name}
                  {typeof skill === 'object' && skill?.level && (
                    <span className="text-gray-500 ml-1">({skill.level})</span>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="trim">
                  <h3 className="font-semibold text-gray-900 mb-1 wrap">{project?.name}</h3>
                  <ul className="modern-list wrap">
                    {(project?.description?.split('\n').filter(Boolean) || []).map((point, i) => (
                      <li key={i} className="text-gray-700 text-sm wrap">{point}</li>
                    ))}
                  </ul>
                  {project?.technologies?.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1 wrap">
                      <span className="font-medium">Technologies:</span>{' '}
                      {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <Section title="Certifications">
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="trim">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 wrap">{cert?.name}</h3>
                    <span className="text-sm text-gray-600 wrap">{cert?.date}</span>
                  </div>
                  <p className="text-blue-600 wrap">{cert?.issuer}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};




const Template6Alt = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    link: '',
    education: '',
    skills: '',
    experience: '',
    projects: '',
    summary: '',
    awards: '',
    certifications: '',
    languages: '',
    interests: '',
    objective: '',
  });
  const [resumeMd, setResumeMd] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResumeMd('');
    try {
      await new Promise((r) => setTimeout(r, 500));
      setResumeMd('✅ Your AI-powered resume is ready!');
    } catch (err) {
      console.error(err);
      setError('⚠️ Error generating resume.');
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(2);
    doc.line(20, 15, 190, 15);
    doc.setFontSize(22);
    doc.setFont("times new roman", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text(form.name || 'Your Name', 20, 30);
    doc.setFont("times new roman", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const contactDetails = `${form.phone} | ${form.email} | ${form.link}`;
    doc.text(contactDetails, 20, 37);
    let currentY = 47;
    const blockGap = 2;
    const lineHeight = 6;
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginBottom = 20;
    const addSection = (title, content, isLast = false) => {
      if (content) {
        doc.setFont("times new roman", "bold");
        doc.setFontSize(14);
        doc.setLineHeightFactor(1.5);
        if (currentY + 10 >= pageHeight - marginBottom) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(`${title}:`, 20, currentY);
        currentY += 6;
        doc.setFont("times new roman", "normal");
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(content, 180);
        lines.forEach(line => {
          if (currentY + lineHeight >= pageHeight - marginBottom) {
            doc.addPage();
            currentY = 20;
          }
          doc.text(line, 20, currentY);
          currentY += lineHeight;
        });
        currentY += blockGap;
        if (!isLast) {
          if (currentY + 5 >= pageHeight - marginBottom) {
            doc.addPage();
            currentY = 20;
          }
          doc.setDrawColor(0, 102, 204);
          doc.setLineWidth(0.5);
          doc.line(20, currentY, 190, currentY);
          currentY += 7;
        }
      }
    };
    addSection('Objective', form.objective);
    addSection('Professional Summary', form.summary);
    addSection('Skills', form.skills);
    addSection('Experience', form.experience);
    addSection('Education', form.education);
    addSection('Projects', form.projects);
    addSection('Certifications', form.certifications);
    addSection('Languages', form.languages);
    addSection('Interests', form.interests);
    addSection('Awards', form.awards, true);
    addSection('Objective', form.objective);
    addSection('Professional Summary', form.summary);
    addSection('Skills', form.skills);
    addSection('Experience', form.experience);
    addSection('Education', form.education);
    addSection('Projects', form.projects);
    addSection('Certifications', form.certifications);
    addSection('Languages', form.languages);
    addSection('Interests', form.interests);
    addSection('Awards', form.awards, true);
    doc.save(`${form.name}_Resume.pdf`);
  };
  return (
    <div className="resume-builder-container">
      <h1 className="resume-title">📝 AI-Powered Resume Builder</h1>
      <p className="resume-subtitle">Generate a professional resume instantly.</p>
      <div className="resume-form">
        {Object.entries(form).map(([key, value]) => {
          let placeholder = `Enter your ${key}`;
          let helper = "";
          let inputType = "text";
          if (key === "email") {
            inputType = "email";
            placeholder = "e.g. john@example.com";
          }
          if (key === "phone") {
            inputType = "tel";
            placeholder = "e.g. +91 1234567890";
          }
          if (key === "link") {
            inputType = "url";
            placeholder = "e.g. LinkedIn, GitHub, Portfolio";
            helper = "Add your LinkedIn, GitHub or portfolio URL here.";
          }
          if (key === "skills") {
            placeholder = "e.g. HTML, CSS, JavaScript";
            helper = "Separate skills with commas.";
          }
          if (["education", "experience", "projects", "interests", "languages", "certifications", "awards"].includes(key)) {
            placeholder = `Use bullet points or numbers for ${key}`;
            helper = "Add multiple items using bullets or numbers.";
          }
          if (key === "objective") {
            placeholder = "Write your career objective";
          }
          if (key === "summary") {
            placeholder = "Write a short professional summary";
          }
          if (key === "name") {
            placeholder = "Your full name";
          }
          const isTextarea = [
            "education",
            "experience",
            "projects",
            "interests",
            "languages",
            "certifications",
            "awards",
            "objective",
            "summary",
          ].includes(key);
          return (
            <div key={key} className="form-group mb-4">
              <label className="block text-sm font-medium mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isTextarea ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  rows={key === "summary" ? 4 : 2}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              ) : (
                <input
                  type={inputType}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              )}
              {helper && (
                <span className="text-xs text-gray-500 block mt-1">{helper}</span>
              )}
            </div>
          );
        })}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="generate-btn mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {resumeMd && (
        <div className="resume-preview-section">
          <h2>📄 Resume Preview</h2>
          <div className="resume-preview" id="resume-preview">
            <div className="top-line"></div>
            <h1 className="resume-name">{form.name || 'Your Name'}</h1>
            <p className="resume-contact">📞 {form.phone} | ✉️ {form.email} | {form.link}</p>
            {[
              { label: 'Objective', key: 'objective' },
              { label: 'Professional Summary', key: 'summary' },
              { label: 'Skills', key: 'skills' },
              { label: 'Experience', key: 'experience' },
              { label: 'Education', key: 'education' },
              { label: 'Projects', key: 'projects' },
              { label: 'Certifications', key: 'certifications' },
              { label: 'Languages', key: 'languages' },
              { label: 'Interests', key: 'interests' },
              { label: 'Awards', key: 'awards' },
            ].map(({ label, key }) =>
              form[key] ? (
                <div key={key}>
                  <h3 className="section-heading">{label}</h3>
                  <p>{form[key]}</p>
                  <div className="blue-line"></div>
                </div>
              ) : null
            )}
          </div>
          <button onClick={handleDownload} className="download-btn mt-4">Download PDF</button>
        </div>
      )}
    </div>
  );
};

const Router = ({ getTemplateComponent, templates }) => (
  <Routes>
    <Route
      path="/builder/:templateId"
      element={
        <ResumeBuilderPage
          getTemplateComponent={getTemplateComponent}
          templates={templates}
        />
      }
    />
  </Routes>
);

const componentMap = {
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
};

export const templates = templatesMeta.map(t => ({
  ...t,
  component: componentMap[t.componentId]
}));

const templateMap = {};
templates.forEach(t => {
  templateMap[t.id] = t.component;
});

export const getTemplateComponent = (templateId) => {
  return templateMap[templateId] || null;
};

export {
  DownloadButton,
  ResumeForm,
  ResumePreview,
  // TemplateCard,
  ResumeBuilderPage,
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
  Template6Alt,
  Router
};

export default ResumeBuilderPage;
