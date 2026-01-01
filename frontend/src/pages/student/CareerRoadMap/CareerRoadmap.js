// import React, { useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import careerData from "../data/careerData";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas"; // ✅ Fixed: Uncommented
// import "./CareerDetail.css";
// import { motion } from "framer-motion";

// export default function CareerRoadmap() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const career = careerData.find((c) => c.id.toString() === id) || location.state?.career;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!career) return <div className="p-10 text-center">Career not found</div>;

//   const handleDownload = async () => {
//     const input = document.getElementById("career-roadmap");
    
//     try {
//       // ✅ We use await to ensure the canvas is generated before proceeding
//       const canvas = await html2canvas(input, { 
//         scale: 2, 
//         useCORS: true,
//         logging: false,
//         // Optional: ensures animations are finished before capture
//         onclone: (clonedDoc) => {
//            clonedDoc.getElementById("career-roadmap").style.transform = "none";
//         }
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
      
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       // Add first page
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       // Add subsequent pages if content is long
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`${career.title.replace(/\s+/g, '_')}_Roadmap.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Failed to generate PDF. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
//       <motion.div
//         id="career-roadmap"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
//       >
//         <h1 className="text-3xl font-bold mb-2 text-blue-700">{career.title}</h1>
//         <p className="mb-6 text-gray-700">{career.description}</p>

//         {/* Skills */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 Skills Required</h3>
//           <ul className="list-disc pl-5 space-y-1 text-gray-700">
//             {career.skills.map((s, i) => <li key={i}>{s}</li>)}
//           </ul>
//         </div>

//         {/* Roadmap */}
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">🎓 Education Roadmap</h3>
//           <ol className="list-decimal pl-5 space-y-1 text-gray-700">
//             {career.roadmap.map((step, i) => <li key={i}>{step}</li>)}
//           </ol>
//         </div>

//         {/* Salary */}
//         <div className="mb-8">
//           <h4 className="text-xl font-semibold text-green-700">
//             💰 Expected Salary: <span className="font-normal">{career.salary}</span>
//           </h4>
//         </div>
//       </motion.div>

//       <div className="max-w-4xl mx-auto mt-6 flex gap-4 justify-center">
//         <button
//           onClick={handleDownload}
//           className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
//         >
//           📄 Download PDF
//         </button>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow transition"
//         >
//           ⬅️ Back
//         </button>
//       </div>
//     </div>
//   );
// }