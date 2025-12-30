import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import {
  FaFilePdf,
  FaLock,
  FaSpinner,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import PremiumPlans from "../../../components/PremiumPlans/PremiumPlans";
import { useAuth } from "../../../context/AuthContext";
export default function FinalReportPage() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const { user } = useAuth();
  const userId = user?._id || user?.id;
  const isPremium = user?.isPremium === true;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  // 1. FETCH DATA
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/progress/get-progress/${userId}`
        );
        if (res.data.success) setReportData(res.data.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, [userId, navigate, API_URL]);

  // =========================================================
  // 2. PROFESSIONAL PDF GENERATOR ENGINE (FIXED OVERFLOWS)
  // =========================================================
  const generateCareerPDF = () => {
    if (!reportData) return;

    const doc = new jsPDF("p", "mm", "a4");
    const results = reportData.stageResults || {};

    // Page Geometry
    const pageWidth = doc.internal.pageSize.width; // ~210mm
    const pageHeight = doc.internal.pageSize.height; // ~297mm
    const margin = 20;
    const maxContentWidth = pageWidth - margin * 2;

    let yPos = 0; // Tracks vertical position

    // --- HELPER: ADD HEADER ---
    const addHeader = () => {
      doc.setFillColor(37, 99, 235); // Blue
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Career Assessment Report", margin, 20);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Student: ${user.name || "N/A"}`, margin, 32);

      const dateStr = new Date().toLocaleDateString();
      const dateWidth = doc.getTextWidth(dateStr);
      doc.text(dateStr, pageWidth - margin - dateWidth, 32);

      yPos = 50; // Start content below header
    };

    // --- HELPER: ADD FOOTER ---
    const addFooter = (pageNumber) => {
      const footerText = "CareerGenAI - Confidential Student Report";
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text(footerText, margin, pageHeight - 10);
      doc.text(`Page ${pageNumber}`, pageWidth - margin - 10, pageHeight - 10);
    };

    // --- HELPER: CHECK PAGE BREAK ---
    const checkPageBreak = (neededHeight) => {
      // If current Y + needed height > Page Height - Bottom Margin
      if (yPos + neededHeight > pageHeight - margin) {
        doc.addPage();
        yPos = 30; // Reset to top margin on new page
        return true;
      }
      return false;
    };

    // --- HELPER: SECTION TITLE ---
    const addSectionTitle = (title) => {
      checkPageBreak(20); // Ensure space for title

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(37, 99, 235);
      doc.text(title, margin, yPos);

      // Underline
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);

      yPos += 15;
    };

    // --- HELPER: KEY-VALUE PAIR (HANDLES WRAPPING) ---
    const addField = (label, value) => {
      const lineHeight = 7;
      const valueStr = Array.isArray(value) ? value.join(", ") : value || "N/A";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);

      // Calculate Label Width
      const labelText = `${label}: `;
      const labelWidth = doc.getTextWidth(labelText);

      // Calculate Remaining Width for Value
      // We subtract a small buffer (2mm) to prevent right-edge touching
      const valueMaxWidth = maxContentWidth - labelWidth - 2;

      // Split Value into lines if it's too long
      doc.setFont("helvetica", "normal");
      const valueLines = doc.splitTextToSize(valueStr, valueMaxWidth);

      // Calculate total height needed for this block
      const blockHeight = valueLines.length * lineHeight;

      // Check if we need a new page
      checkPageBreak(blockHeight);

      // 1. Print Label
      doc.setFont("helvetica", "bold");
      doc.text(labelText, margin, yPos);

      // 2. Print Value (Line by Line)
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(valueLines, margin + labelWidth, yPos);

      // Move Y position down based on how many lines the value took
      yPos += blockHeight;
    };

    // --- HELPER: LONG TEXT BLOCK (HANDLES PARAGRAPHS) ---
    const addTextBlock = (text) => {
      if (!text) return;
      const lineHeight = 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);

      // Split entire paragraph into lines that fit the width
      const lines = doc.splitTextToSize(text, maxContentWidth);

      // Iterate through lines to handle page breaks mid-paragraph
      lines.forEach((line) => {
        if (checkPageBreak(lineHeight)) {
          // If page break happened, font settings reset, so re-apply if needed
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(60, 60, 60);
        }
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });

      yPos += 5; // Add extra space after block
    };

    // ================= START PDF GENERATION =================

    addHeader();

    // Executive Summary
    addSectionTitle("Executive Summary");
    addTextBlock(
      "This report synthesizes your aptitude, interests, and personality traits across three key educational stages to provide a holistic career recommendation based on AI analysis."
    );

    // --- STAGE 5-7 ---
    if (results.stage5to7) {
      const data = results.stage5to7;
      addSectionTitle("1. Early Education Profile (Grade 5-7)");
      addField("Archetype", data.title || data.category);
      addField("Key Interests", data.subjects || data.specificInterests);

      yPos += 5;
      doc.setFont("helvetica", "bolditalic");
      doc.setFontSize(10);
      doc.text("AI Analysis:", margin, yPos);
      yPos += 6;
      addTextBlock(data.description || data.actionLog);
    }

    // --- STAGE 8-10 ---
    if (results.stage8to10) {
      const data = results.stage8to10;
      addSectionTitle("2. Stream Selection (Grade 8-10)");
      addField("Recommended Stream", data.title || data.recommendedStream);
      addField("Career Matches", data.careers || data.topCareers);

      yPos += 5;
      doc.setFont("helvetica", "bolditalic");
      doc.setFontSize(10);
      doc.text("Strategic Insight:", margin, yPos);
      yPos += 6;
      addTextBlock(data.description || data.analysis);
    }

    // --- STAGE 11-12 ---
    if (results.stage11to12) {
      const data = results.stage11to12;
      addSectionTitle("3. Professional Path (Grade 11-12)");
      addField("Target Path", data.finalPath || data.careerPath);
      addField("Aptitude Score", data.score ? `${data.score} / 150` : "N/A");

      yPos += 5;
      // Optional details
    }

    // Footer on every page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter(i);
    }

    doc.save(`${user.name || "Student"}_Career_Report.pdf`);
  };

  // ---------------- UI RENDER ----------------
  const handleDownload = () => {
    if (!isPremium) setShowPremiumPopup(true);
    else generateCareerPDF();
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );

  const results = reportData?.stageResults || {};

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50 px-6 py-12">
      {showPremiumPopup && (
        <PremiumPlans onClose={() => setShowPremiumPopup(false)} />
      )}

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-100 max-w-2xl w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600"></div>

        <div className="mb-6 flex justify-center">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600">
            <FaFilePdf size={40} />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
          Final Career Report
        </h1>
        <p className="text-gray-500 mb-8">
          Comprehensive AI analysis of your journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
          <StatusCard title="5th-7th" done={!!results.stage5to7} />
          <StatusCard title="8th-10th" done={!!results.stage8to10} />
          <StatusCard title="11th-12th" done={!!results.stage11to12} />
        </div>

        <button
          onClick={handleDownload}
          className={`w-full md:w-auto px-8 py-3 rounded-xl text-lg font-bold flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105 shadow-lg ${
            isPremium ? "bg-blue-600 text-white" : "bg-yellow-500 text-white"
          }`}
        >
          {isPremium ? (
            <>
              <FaDownload /> Download PDF
            </>
          ) : (
            <>
              <FaLock /> Unlock Report
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StatusCard({ title, done }) {
  return (
    <div
      className={`p-3 rounded-lg border ${
        done ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        {done ? (
          <FaCheckCircle className="text-green-500" />
        ) : (
          <FaTimesCircle className="text-gray-400" />
        )}
        <span
          className={`text-sm font-bold ${
            done ? "text-green-700" : "text-gray-500"
          }`}
        >
          {title}
        </span>
      </div>
      <p className="text-xs text-gray-400 ml-6">
        {done ? "Completed" : "Pending"}
      </p>
    </div>
  );
}
