"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Stars, Rocket, Code2, ShieldCheck, Home } from "lucide-react";
import { ChevronDown } from "lucide-react";
export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [language, setLanguage] = useState("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleLanguage = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
    // 这里可以添加实际的语言切换逻辑
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  const navItems = [
    { name: "Home", href: "#", icon: <Home className="w-5 h-5" /> },
    { 
      name: "Legal & Compliance", 
      href: "#legal", 
      icon: <ShieldCheck className="w-5 h-5" /> 
    },
    { name: "Dev Center", href: "#dev", icon: <Code2 className="w-5 h-5" /> },
    { name: "Launch App", href: "#app", icon: <Rocket className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* 装饰性粒子背景 */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-40">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              opacity: Math.random() * 0.5 + 0.1,
              filter: "blur(1px)",
              animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* 主导航栏 */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-2 shadow-xl" : "py-4"
        }`}
      >
        <div className={`max-w-7xl mx-auto px-6 backdrop-blur-lg rounded-full border ${
          scrolled 
            ? "bg-gray-900/80 border-gray-800/50" 
            : "bg-gray-900/50 border-gray-800/30"
        } transition-all duration-500`}>
          <div className="flex justify-between items-center">
            {/* Logo - 带微光效果 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-cyan-400/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wide relative">
                  Echo
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-cyan-400/50"
              >
                <Stars className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* 导航链接 - 带悬浮下划线 */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-800/50 rounded-full px-2 py-1">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  className="relative px-4 py-2"
                  onHoverStart={() => setActiveLink(item.name)}
                  onHoverEnd={() => setActiveLink("")}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                      activeLink === item.name 
                        ? "text-cyan-400" 
                        : "text-gray-300 hover:text-gray-100"
                    }`}
                  >
                    <span className="text-cyan-400/80">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                  
                  {activeLink === item.name && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              ))}
              {/* 右侧语言选择器 */}
              <div className="relative">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700/70 transition-colors"
                >
                  <span className="text-gray-300">{language}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                    showLanguageDropdown ? "rotate-180" : ""
                  }`} />
                </button>

                {/* 语言下拉菜单 */}
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-gray-800/90 backdrop-blur-sm border border-gray-700 overflow-hidden"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => changeLanguage("EN")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === "EN"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => changeLanguage("CN")}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === "CN"
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        简体中文
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* 移动端菜单按钮 */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-cyan-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 z-40"
          >
            <div className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* 全局样式 */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, -5px); }
          50% { transform: translate(10px, 0); }
          75% { transform: translate(5px, 5px); }
        }
      `}</style>
    </>
  );
}