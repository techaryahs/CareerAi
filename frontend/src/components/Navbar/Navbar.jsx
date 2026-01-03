import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle, FaUser, FaHistory, FaChartLine, FaSignOutAlt, FaChevronDown, FaPhoneAlt } from "react-icons/fa";

// =========================
// 🟢 NAVIGATION CONFIG
// =========================
const NAV_CONFIG = {
  common: [
    { title: "Home", path: "/", roles: ["student", "consultant", "admin", "guest"] }, 
    { title: "Career Journey", path: "/services", roles: ["student", "guest"] },
  ],
  student: [
    { title: "Career Journey", path: "/services" },
  ],
  teacher: [
    { title: "Dashboard", path: "/teacher-dashboard" },
  ],
  consultant: [
    { title: "Dashboard", path: "/consultant-dashboard" },
  ],
  parent: [
    { title: "Dashboard", path: "/parent-dashboard" },
  ],
  admin: [
    { title: "Admin Dashboard", path: "/admin-dashboard" },
    { title: "Users", path: "/admin/users" },
  ]
};

const DROPDOWN_LINKS = {
  student: [
    { title: "History", path: "/history", icon: FaHistory },
    { title: "My Activity", path: "/my-activity", icon: FaChartLine },
  ],
  parent: [
    { title: "Parent Dashboard", path: "/parent-dashboard", icon: FaChartLine },
  ],
  teacher: [],
  consultant: [],
  admin: []
};

// =========================
// 🔵 NAVBAR COMPONENT
// =========================
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "guest";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  
  const registerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setRegisterDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setMobileMenuOpen(false);
      navigate("/login");
    }
  };

  // 🛠️ Get Links based on Role
  const getLinks = () => {
    let links = [];
    NAV_CONFIG.common.forEach(link => {
      if (link.roles.includes(role) || link.roles.includes("guest")) links.push(link);
    });
    if (NAV_CONFIG[role]) {
      links = [...links, ...NAV_CONFIG[role]];
    }
    // Remove duplicates
    return [...new Map(links.map(item => [item['path'], item])).values()];
  };

  const navLinks = getLinks();

  return (
    <nav className="bg-[#0f172a] shadow-lg sticky top-0 z-50 font-sans text-white border-b border-gray-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          
          {/* 1️⃣ LEFT: LOGO */}
          <NavLink to="/" className="flex items-center gap-3 z-10">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl ring-2 ring-indigo-400">
               <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full"/>
             </div>
            <span className="text-2xl font-bold bg-linear-to-r from-blue-200 to-white bg-clip-text text-transparent">
              CareerGenAI
            </span>
          </NavLink>

          {/* 2️⃣ CENTER: NAVIGATION LINKS (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center absolute left-0 right-0 pointer-events-none">
             <div className="pointer-events-auto flex items-center space-x-8">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path}
                    className={({ isActive }) => 
                      `text-gray-300 hover:text-white font-medium text-base transition relative py-1
                       ${isActive ? "text-white after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-400" : ""}`
                    }
                  >
                    {link.title}
                  </NavLink>
                ))}
             </div>
          </div>

          {/* 3️⃣ RIGHT: CONTACT & AUTH */}
          <div className="hidden md:flex items-center space-x-6 z-10">
            {/* Phone Numbers */}
            <div className="hidden lg:flex flex-col text-right text-xs text-gray-400">
               <a href="tel:+919619901999" className="hover:text-blue-300 transition flex items-center gap-1 justify-end">
                 <FaPhoneAlt size={10} /> +91 9619901999
               </a>
               <a href="tel:+918657869659" className="hover:text-blue-300 transition flex items-center gap-1 justify-end">
                 <FaPhoneAlt size={10} /> +91 8657869659
               </a>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-700 hidden lg:block"></div>

            {/* Auth Buttons / Profile */}
            {!user ? (
              <div className="flex items-center gap-4">
                <NavLink to="/login" className="text-gray-300 hover:text-white font-medium transition">
                  Login
                </NavLink>

                {/* Register Dropdown */}
                <div className="relative" ref={registerRef}>
                  <button 
                    onClick={() => setRegisterDropdownOpen(!registerDropdownOpen)}
                    className="flex items-center gap-1 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-900/50 hover:shadow-blue-600/50 font-medium"
                  >
                    Register <FaChevronDown size={10} className="mt-0.5" />
                  </button>
                  
                  {registerDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 text-gray-800 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">Join As</div>
                      <NavLink to="/register" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition" onClick={() => setRegisterDropdownOpen(false)}>
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FaUser /></div>
                        <div><div className="font-semibold text-gray-800">Student</div><div className="text-xs text-gray-500">Start learning</div></div>
                      </NavLink>
                      <NavLink to="/register-consultant" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition" onClick={() => setRegisterDropdownOpen(false)}>
                        <div className="bg-green-100 p-2 rounded-lg text-green-600"><FaUserCircle /></div>
                         <div><div className="font-semibold text-gray-800">Consultant</div><div className="text-xs text-gray-500">Guide careers</div></div>
                      </NavLink>
                       <NavLink to="/register-teacher" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition" onClick={() => setRegisterDropdownOpen(false)}>
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><FaChartLine /></div>
                        <div><div className="font-semibold text-gray-800">Teacher</div><div className="text-xs text-gray-500">Share knowledge</div></div>
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Logged In Profile
              <div className="group relative">
                <button 
                  className="flex items-center gap-3 text-gray-300 hover:text-white focus:outline-none transition group-hover:text-white"
                >
                  <div className="text-right hidden xl:block">
                     <div className="text-sm font-semibold text-white">{user.name || "User"}</div>
                     <div className="text-xs text-blue-300 capitalize">{role}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white ring-2 ring-gray-700 group-hover:ring-blue-500 transition shadow-lg">
                    {user.profilePic ? <img src={user.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" /> : <FaUser className="text-lg" />}
                  </div>
                </button>

                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 text-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                    
                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                       <p className="font-bold text-gray-800 truncate">{user.name}</p>
                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <NavLink to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 transition">
                      <FaUser className="text-blue-500" /> My Profile
                    </NavLink>
                    
                    {DROPDOWN_LINKS[role]?.map((link) => (
                      <NavLink key={link.path} to={link.path} className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 transition">
                        <link.icon className="text-blue-500" /> {link.title}
                      </NavLink>
                    ))}

                    <div className="border-t border-gray-100 my-1 mt-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium"
                    >
                      <FaSignOutAlt /> Sign Out
                    </button>
                  </div>
              </div>
            )}
          </div>

          {/* 4️⃣ MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center z-20">
            <button 
               onClick={() => setMobileMenuOpen(true)} 
               className="text-white hover:text-blue-400 transition p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaBars size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* 5️⃣ MOBILE DRAWER / SIDEBAR */}
      <div className={`fixed inset-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}>
         {/* Overlay */}
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
         
         {/* Sidebar Content */}
         <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#0f172a] shadow-2xl overflow-y-auto border-l border-gray-700">
            <div className="p-6">
               <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                  <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-white bg-clip-text text-transparent">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition bg-gray-800 p-2 rounded-full">
                    <FaTimes size={18} />
                  </button>
               </div>

               {/* Mobile Auth Header */}
               {user && (
                 <div className="flex items-center gap-4 mb-8 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                       {user.profilePic ? <img src={user.profilePic} alt="P" className="rounded-full" /> : user.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                       <p className="font-semibold text-white">{user.name}</p>
                       <p className="text-xs text-blue-300 capitalize">{role}</p>
                    </div>
                 </div>
               )}

               <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Navigation</p>
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.path} 
                      to={link.path} 
                      className={({ isActive }) => 
                         `block px-4 py-3 rounded-xl text-base font-medium transition ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.title}
                    </NavLink>
                  ))}
               </div>

               {/* Mobile Action Links */}
               {user ? (
                 <div className="mt-8 space-y-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Account</p>
                    <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition" onClick={() => setMobileMenuOpen(false)}>
                       <FaUser className="text-blue-500" /> My Profile
                    </NavLink>
                    {DROPDOWN_LINKS[role]?.map((link) => (
                      <NavLink key={link.path} to={link.path} className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition" onClick={() => setMobileMenuOpen(false)}>
                         <link.icon className="text-blue-500" /> {link.title}
                      </NavLink>
                    ))}
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-xl transition mt-4">
                       <FaSignOutAlt /> Sign Out
                    </button>
                 </div>
               ) : (
                 <div className="mt-8 pt-6 border-t border-gray-800 space-y-4">
                    <NavLink to="/login" className="block w-full text-center py-3 rounded-xl border border-gray-600 text-white hover:bg-gray-800 transition font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </NavLink>
                    <div className="grid grid-cols-1 gap-2">
                       <p className="text-center text-xs text-gray-500 mb-2">or Register as</p>
                       <NavLink to="/register" className="block text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm" onClick={() => setMobileMenuOpen(false)}>Student</NavLink>
                       <NavLink to="/register-consultant" className="block text-center py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition text-sm" onClick={() => setMobileMenuOpen(false)}>Consultant</NavLink>
                    </div>
                 </div>
               )}

               {/* Mobile Footer Info */}
               <div className="mt-12 text-center text-gray-500 text-xs space-y-1 pb-4">
                  <p>Need Help?</p>
                  <a href="tel:+919619901999" className="block text-blue-400">+91 9619901999</a>
                  <a href="tel:+918657869659" className="block text-blue-400">+91 8657869659</a>
               </div>
            </div>
         </div>
      </div>
    </nav>
  );
}
