// src/pages/templates/ResumeBuilder3.jsx

import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function ResumeBuilder3() {
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

  const [profileImage, setProfileImage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const size = Math.min(img.width, img.height);
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;

          const ctx = canvas.getContext('2d');
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0, size, size);
          ctx.restore();

          const roundImage = canvas.toDataURL('image/png');
          setProfileImage(roundImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

const handleDownload = () => {
  const doc = new jsPDF();
  const leftX = 20;
  const rightX = 90;
  const topY = 20;

  const pageHeight = doc.internal.pageSize.getHeight();
  const marginTop = 20;
  const marginBottom = 20;
  const lineHeight = 6;
  const blockGap = 5;

  // === Top header line ===
  doc.setDrawColor(102, 0, 204); // Dark purple
  doc.setLineWidth(2);
  doc.line(20, 15, 190, 15);

  // === Photo ===
  if (profileImage) {
    doc.addImage(profileImage, 'PNG', leftX, topY, 50, 50);
  }

  // ✅ REMOVED: name below photo

  // === Right side: name + contact ===
  doc.setFont("times", "bold");
  doc.setFontSize(24);
  let rightY = topY + 20; // adjust as needed

  doc.text(form.name || 'Your Name', rightX, rightY);
  rightY += 7;

  doc.setFont("times", "normal");
  doc.setFontSize(12);

  if (form.address) {
    const addr = doc.splitTextToSize(form.address, 50);
    doc.text(addr, rightX, rightY);
    rightY += addr.length * 5 + 2;
  }

  let contactLine = '';
  if (form.phone) contactLine += form.phone;
  if (form.email) contactLine += (contactLine ? ' | ' : '') + form.email;
  if (form.link) contactLine += (contactLine ? ' | ' : '') + form.link;

  if (contactLine) {
    doc.text(contactLine, rightX, rightY);
    rightY += 5;
  }

  // === Sections below ===
  let currentY = Math.max(topY + 70, rightY + 10);

  const addSection = (title, content, isLast = false) => {
    if (content) {
      if (currentY + 10 >= pageHeight - marginBottom) {
        doc.addPage();
        currentY = marginTop;
      }

      doc.setFont("times", "bold");
      doc.setFontSize(13);
      doc.text(title.toUpperCase(), leftX, currentY);
      currentY += 7;

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(content, 170);

      lines.forEach((line) => {
        if (currentY + lineHeight >= pageHeight - marginBottom) {
          doc.addPage();
          currentY = marginTop;
        }
        doc.text(line, leftX, currentY);
        currentY += lineHeight;
      });

      currentY += blockGap;

      if (!isLast) {
        if (currentY + 5 >= pageHeight - marginBottom) {
          doc.addPage();
          currentY = marginTop;
        }

        doc.setDrawColor(102, 0, 204);
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

  doc.save(`${form.name}_Resume.pdf`);
};



  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">📸 Resume Builder (Template 3)</h1>
      <p className="text-gray-600 mb-4">Upload your photo, fill details & download a beautiful PDF with dark purple lines and page breaks.</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* === Form === */}
  <div className="space-y-4">
    {Object.entries(form).map(([key, value]) => {
      // Pick input type
      let inputType = "text";
      if (key === "email") inputType = "email";
      else if (key === "phone") inputType = "tel";
      else if (key === "link") inputType = "url";

      // Which keys are long text
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

      // Dynamic placeholders
      let placeholder = `Enter your ${key}`;
      let helper = "";

      if (key === "link") {
        placeholder = "e.g. LinkedIn, GitHub, Portfolio link";
        helper = "You can add LinkedIn, GitHub or portfolio links here.";
      }

      if (key === "skills") {
        placeholder = "e.g. Excel, Tally, JavaScript";
        helper = "Separate multiple skills with commas.";
      }

      if (
        ["education", "experience", "projects", "interests", "languages", "certifications", "awards"].includes(key)
      ) {
        placeholder = `Use bullet points or numbers to list multiple ${key}`;
        helper = "Add multiple items using bullets or numbers.";
      }

      if (key === "address") {
        placeholder = "Your full address";
      }

      if (key === "objective") {
        placeholder = "Write a short objective";
      }

      if (key === "summary") {
        placeholder = "Write a professional summary";
      }

      return (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-semibold">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>

          {isLongText ? (
            <textarea
              name={key}
              value={value}
              onChange={handleChange}
              rows={4}
              placeholder={placeholder}
              className="border border-gray-300 p-2 rounded"
            />
          ) : (
            <input
              type={inputType}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className="border border-gray-300 p-2 rounded"
            />
          )}

          {helper && (
            <span className="text-xs text-gray-500 mt-1">{helper}</span>
          )}
        </div>
      );
    })}
  </div>

  {/* === Preview stays unchanged === */}
  <div className="border border-gray-300 p-4 rounded bg-white">
    <div className="flex justify-between items-start">
      <div>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 object-cover mb-2 rounded-full"
          />
        )}
        {/* ✅ Name on left preview */}
        <h1 className="text-2xl font-bold">{form.name || 'Your Name'}</h1>
      </div>
      <div className="text-right">
        {form.address && <p>{form.address}</p>}
        {form.phone && <p>{form.phone}</p>}
        {form.email && <p>{form.email}</p>}
        {form.link && <p>{form.link}</p>}
      </div>
    </div>

    <div className="mt-6">
      {[
        "Objective",
        "Professional Summary",
        "Skills",
        "Experience",
        "Education",
        "Projects",
        "Certifications",
        "Languages",
        "Interests",
        "Awards"
      ].map((sec) =>
        form[sec.toLowerCase().replace(" ", "")] ? (
          <div key={sec}>
            <h3 className="uppercase font-bold mt-4">{sec}</h3>
            <p className="whitespace-pre-line">
              {form[sec.toLowerCase().replace(" ", "")]}
            </p>
            <div className="w-full border-t-2 border-purple-800 my-2"></div>
          </div>
        ) : null
      )}
    </div>
  </div>
</div>



      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-3 bg-purple-800 text-white rounded hover:bg-purple-900 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
