import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
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

  // ✅ Mock version to always succeed!
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setResumeMd('');

    try {
      await new Promise((r) => setTimeout(r, 500)); // simulate API delay
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

  // --- Common reusable helper ---
  const addSection = (title, content, isLast = false) => {
    if (content) {
      // Add heading
      doc.setFont("times new roman", "bold");
      doc.setFontSize(14);

      if (currentY + 10 >= pageHeight - marginBottom) {
        doc.addPage();
        currentY = 20;
      }

      doc.text(`${title}:`, 20, currentY);
      currentY += 6;

      // Add lines
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

      // Add line separator unless it's the last section
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
  addSection('Awards', form.awards, true); // ✅ Last one skips line

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
          if (
            ["education", "experience", "projects", "interests", "languages", "certifications", "awards"].includes(key)
          ) {
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
            <p className="resume-contact">
              📞 {form.phone} | ✉️ {form.email} | {form.link}
            </p>

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

          <button onClick={handleDownload} className="download-btn mt-4">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
