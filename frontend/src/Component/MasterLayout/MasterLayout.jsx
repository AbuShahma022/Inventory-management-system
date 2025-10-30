import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { FiMessageCircle, FiX } from "react-icons/fi";
import logo from "../../assets/myIms.svg";
import { sidebarItems } from "../../Helper/Sidebar";
import { removeSessions, getUserDetailsLocal } from "../../Helper/SessionHelper";
import { useSelector } from "react-redux";
import AIAgentComponent from "./AIAgentComponent";

function MasterLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const navigate = useNavigate();

  const userFromStore = useSelector((state) => state.userDetails.user);
  const userFromLocal = getUserDetailsLocal();
  const user = userFromStore || userFromLocal;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (index) =>
    setActiveMenu(activeMenu === index ? null : index);

  const onLogout = () => {
    removeSessions();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7fb] text-gray-800">

      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 
          ${isSidebarOpen ? "w-64" : "w-20"} flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              isSidebarOpen ? "w-32" : "w-10"
            }`}
          />
        </div>

        {/* Sidebar Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.subMenu.length === 0 ? (
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-3 px-5 text-sm font-medium cursor-pointer 
                    hover:bg-blue-50 transition-all ${
                      isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
                    }`
                  }
                >
                  {item.icon}
                  {isSidebarOpen && <span>{item.title}</span>}
                </NavLink>
              ) : (
                <div>
                  <div
                    onClick={() => toggleSubMenu(index)}
                    className={`flex items-center justify-between py-3 px-5 cursor-pointer 
                    hover:bg-blue-50 transition-all text-sm font-medium`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {isSidebarOpen && <span>{item.title}</span>}
                    </div>
                    {isSidebarOpen && (
                      <span
                        className={`text-xs transition-transform ${
                          activeMenu === index ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    )}
                  </div>
                  {activeMenu === index && (
                    <div className="ml-10 mt-1 space-y-1">
                      {item.subMenu.map((sub, i) => (
                        <NavLink
                          key={i}
                          to={sub.url}
                          className={({ isActive }) =>
                            `flex items-center gap-2 text-sm py-2 px-3 rounded-md 
                            hover:bg-blue-50 transition-all ${
                              isActive
                                ? "bg-blue-100 text-blue-700 font-semibold"
                                : "text-gray-700"
                            }`
                          }
                        >
                          {sub.icon}
                          {isSidebarOpen && <span>{sub.title}</span>}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-200 py-3 px-5">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-red-500 hover:text-red-600 text-sm font-medium"
          >
            <AiOutlineLogout size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-sm border-b border-gray-200 px-6 h-16">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            <AiOutlineMenu size={22} />
          </button>

          <Link to="/profile" className="flex items-center gap-3">
            <img
              src={user?.photo || "/default-user.png"}
              alt="user"
              className="w-8 h-8 rounded-full border border-gray-300 object-cover"
            />
            <span className="font-medium text-sm">
              {user?.firstname || "Guest"}
            </span>
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* ✅ AI Assistant Floating Button */}
      {!isAgentOpen && (
        <button
          onClick={() => setIsAgentOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 
          text-white p-4 rounded-full shadow-xl hover:scale-110 transition z-[1000]"
        >
          <FiMessageCircle size={22} />
        </button>
      )}

      {/* ✅ AI Chat Panel */}
     {isAgentOpen && (
  <div className=" bottom-6 right-6 w-[350px] md:w-[420px] h-[600px]
  bg-white rounded-2xl fixed shadow-2xl border border-gray-200 z-[1000] flex flex-col">

    <div className="flex items-center justify-between px-4 py-3 border-b bg-white font-semibold">
      Inventra Core Assistant
      <button onClick={() => setIsAgentOpen(false)} className="text-gray-500 hover:text-gray-700">
        <FiX size={20} />
      </button>
    </div>

    <AIAgentComponent />
  </div>
        )}
    </div>
  );
}

export default MasterLayout;
