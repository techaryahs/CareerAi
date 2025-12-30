// src/pages/templates/ResumeBuilder2.jsx
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ResumeBuilder2 = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    link: '',
    address: '',
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

  // ✅ MOCKED — No backend call for now
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResumeMd('');

    try {
      await new Promise((r) => setTimeout(r, 500)); // simulate network delay
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

    const leftX = 20;
    const rightX = 120;
    let leftY = 30;

    doc.setFont("times", "bold");
    doc.setFontSize(35);
    doc.text(form.name || 'Your Name', leftX, leftY);
    leftY += 8;

    doc.setFont("times", "italic");
    doc.setFontSize(12);
    if (form.summary) {
      const summaryLines = doc.splitTextToSize(form.summary, 80);
      doc.text(summaryLines, leftX, leftY);
      leftY += summaryLines.length * 5 + 8;
    }

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    const contactWidth = 80;
    let rightY = 37;

    if (form.address) {
      const addressLines = doc.splitTextToSize(form.address, contactWidth);
      doc.text(addressLines, rightX, rightY);
      rightY += addressLines.length * 5 + 2;
    }

    if (form.phone) {
      doc.text(form.phone, rightX, rightY);
      rightY += 5;
    }
    if (form.email) {
      doc.text(form.email, rightX, rightY);
      rightY += 5;
    }
    if (form.link) {
      doc.text(form.link, rightX, rightY);
      rightY += 5;
    }

    rightY += 13;

    const addLeftSection = (title, content) => {
      if (content) {
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text(title.toUpperCase(), leftX, leftY);
        leftY += 6;

        doc.setFont("times", "normal");
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(content, 80);
        doc.text(lines, leftX, leftY);
        leftY += lines.length * 5 + 10;
      }
    };

    const addRightSection = (title, content) => {
      if (content) {
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text(title.toUpperCase(), rightX, rightY);
        rightY += 6;

        doc.setFont("times", "normal");
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(content, 80);
        doc.text(lines, rightX, rightY);
        rightY += lines.length * 5 + 10;
      }
    };

    addLeftSection("Experience", form.experience);
    addLeftSection("Education", form.education);
    addLeftSection("Projects", form.projects);

    addRightSection("Objective", form.objective);
    addRightSection("Skills", form.skills);
    addRightSection("Certifications", form.certifications);
    addRightSection("Awards", form.awards);
    addRightSection("Languages", form.languages);
    addRightSection("Interests", form.interests);

    doc.save(`${form.name}_TwoColumn_Resume.pdf`);
  };

  return (
    <div className="resume-builder-container">
      <h1 className="resume-title">📜 Classic Resume Builder</h1>
      <p className="resume-subtitle">
        Generate a timeless, professional resume — clean & classic.
      </p>

      <div className="resume-form space-y-4">
        {Object.entries(form).map(([key, value]) => {
          let inputType = "text";
          if (key === "email") inputType = "email";
          if (key === "phone") inputType = "tel";
          if (key === "link") inputType = "url";

          const isLongText = [
            "address",
            "education",
            "skills",
            "experience",
            "projects",
            "summary",
            "awards",
            "certifications",
            "languages",
            "interests",
            "objective"
          ].includes(key);

          let placeholder = `Enter your ${key}`;
          let helper = "";

          if (key === "link") {
            placeholder = "e.g. LinkedIn, GitHub, Portfolio";
            helper = "Add your LinkedIn, GitHub or portfolio link.";
          }
          if (key === "skills") {
            placeholder = "e.g. HTML, CSS, JavaScript";
            helper = "Separate multiple skills with commas.";
          }
          if (["education", "experience", "projects", "interests", "languages", "certifications", "awards"].includes(key)) {
            placeholder = `Use bullet points or numbers for ${key}`;
            helper = "Use bullet points or numbers to add multiple items.";
          }
          if (key === "address") {
            placeholder = "Your full address";
          }
          if (key === "objective") {
            placeholder = "Write a short career objective";
          }
          if (key === "summary") {
            placeholder = "Write your professional summary";
          }

          return (
            <div key={key} className="form-group">
              <label className="block font-semibold mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>

              {isLongText ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  rows={4}
                  placeholder={placeholder}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              ) : (
                <input
                  type={inputType}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              )}

              {helper && (
                <span className="text-xs text-gray-500 mt-1 block">{helper}</span>
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
          <h2 className="text-xl font-bold mb-4">📄 Resume Preview</h2>

          <div className="flex flex-col md:flex-row border border-gray-300 rounded p-6 w-full max-w-5xl gap-8 bg-white shadow">
            {/* LEFT COLUMN */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {form.name || "Your Name"}
              </h1>
              {form.summary && (
                <p className="italic mt-1 whitespace-pre-line">
                  {form.summary}
                </p>
              )}

              <div className="mt-4" />

              {form.experience && (
                <>
                  <h3 className="uppercase font-bold mt-4">Experience</h3>
                  <p className="whitespace-pre-line">{form.experience}</p>
                </>
              )}

              {form.education && (
                <>
                  <h3 className="uppercase font-bold mt-4">Education</h3>
                  <p className="whitespace-pre-line">{form.education}</p>
                </>
              )}

              {form.projects && (
                <>
                  <h3 className="uppercase font-bold mt-4">Projects</h3>
                  <p className="whitespace-pre-line">{form.projects}</p>
                </>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1">
              <div className="text-right">
                {form.address && <p>{form.address}</p>}
                {form.phone && <p>{form.phone}</p>}
                {form.email && <p>{form.email}</p>}
                {form.link && <p>{form.link}</p>}
              </div>

              <div className="mt-4" />

              {form.objective && (
                <>
                  <h3 className="uppercase font-bold mt-4">Objective</h3>
                  <p className="whitespace-pre-line">{form.objective}</p>
                </>
              )}

              {form.skills && (
                <>
                  <h3 className="uppercase font-bold mt-4">Skills</h3>
                  <p className="whitespace-pre-line">{form.skills}</p>
                </>
              )}

              {form.certifications && (
                <>
                  <h3 className="uppercase font-bold mt-4">Certifications</h3>
                  <p className="whitespace-pre-line">{form.certifications}</p>
                </>
              )}

              {form.awards && (
                <>
                  <h3 className="uppercase font-bold mt-4">Awards</h3>
                  <p className="whitespace-pre-line">{form.awards}</p>
                </>
              )}

              {form.languages && (
                <>
                  <h3 className="uppercase font-bold mt-4">Languages</h3>
                  <p className="whitespace-pre-line">{form.languages}</p>
                </>
              )}

              {form.interests && (
                <>
                  <h3 className="uppercase font-bold mt-4">Interests</h3>
                  <p className="whitespace-pre-line">{form.interests}</p>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 px-6 py-3 bg-gray-800 text-white rounded hover:bg-black transition"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder2;
