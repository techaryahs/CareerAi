// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#020B24] text-white pt-16 pb-8 px-6 md:px-16">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <img
              src="/logo.png"
              alt="CareerGenAI"
              className="w-12 h-12 rounded-full"
            />

            <h2 className="text-2xl font-bold">
              CareerGenAI
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed text-sm">
            Empowering students with AI-driven career guidance,
            personalized roadmaps, and expert mentorship to shape
            a successful future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="hover:text-white transition"
              >
                Career Journey
              </Link>
            </li>

            <li>
              <Link
                to="/careerquiz"
                className="hover:text-white transition"
              >
                Career Quiz
              </Link>
            </li>

            <li>
              <Link
                to="/free-counseling"
                className="hover:text-white transition"
              >
                Free Counseling
              </Link>
            </li>

            <li>
              <Link
                to="/pricing"
                className="hover:text-white transition"
              >
                Premium Plans
              </Link>
            </li>

          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Services
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link
                to="/student-guidance"
                className="hover:text-white transition"
              >
                Student Guidance
              </Link>
            </li>

            <li>
              <Link
                to="/services/study-abroad"
                className="hover:text-white transition"
              >
                Study Abroad
              </Link>
            </li>

            <li>
              <Link
                to="/india-vs-abroad"
                className="hover:text-white transition"
              >
                India vs Abroad
              </Link>
            </li>

            <li>
              <Link
                to="/services/dropout"
                className="hover:text-white transition"
              >
                Dropout Career Help
              </Link>
            </li>

            <li>
              <Link
                to="/resume-templates"
                className="hover:text-white transition"
              >
                Resume Templates
              </Link>
            </li>

            <li>
              <Link
                to="/consult"
                className="hover:text-white transition"
              >
                Expert Consultation
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400 text-sm">
            <p>📞 +91 9619901999</p>
            <p>📞 +91 8657869659</p>
            <p>✉️ careergenai9@gmail.com</p>

            <p>
              📍 Gauri Complex, 601, Sector 11,
              CBD Belapur, Navi Mumbai,
              Maharashtra 400614
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">

            <a
              href="https://www.instagram.com/careergenai_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/showcase/careergenai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 transition-all duration-300"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 mt-14 pt-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Aryahs World Infotech (OPC) Pvt Ltd.
            All Rights Reserved.
          </p>

          {/* Policy Links */}
          <div className="flex gap-6 text-sm text-gray-400">

            <Link
              to="/terms-condition"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;