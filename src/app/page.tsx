"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { Stars, Rocket, BrainCircuit, Lock, Gem } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import Particles from "@/components/Particles";
import Particles3D from "@/components/Particles3D" // 使用方案2
import dynamic from "next/dynamic";

// 动态加载3D组件以减少初始加载
const Dynamic3DModel = dynamic(() => import("@/components/Particles3D"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-900/50 rounded-3xl" />
});

const features = [
  {
    title: "On-Chain Ownership",
    desc: "Every piece of knowledge is registered immutably on the blockchain, ensuring transparent and verifiable authorship.",
    icon: <Gem className="w-10 h-10 text-cyan-400" />,
    uri: "/features/ownership.jpg",
  },
  {
    title: "Privacy-Preserved Access",
    desc: "With Trusted Execution Environments (TEE), knowledge usage is secure, auditable, and confidential.",
    icon: <Lock className="w-10 h-10 text-purple-400" />,
    uri: "/features/privacy.png",
  },
  {
    title: "Tokenized Knowledge Markets",
    desc: "Fractionalize, bundle, and trade your knowledge as real-world assets (RWA) in a decentralized economy.",
    icon: <BrainCircuit className="w-10 h-10 text-pink-400" />,
    uri: "/features/market.png",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  // 星空效果
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);
  
  useEffect(() => {
    // 生成随机星星
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.5
    }));
    setStars(newStars);
    
    // 星星闪烁效果
    const interval = setInterval(() => {
      setStars(prev => prev.map(star => ({
        ...star,
        opacity: Math.max(0.3, Math.min(1, star.opacity + (Math.random() * 0.4 - 0.2))),
      }))
    );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div 
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white font-sans overflow-hidden relative"
      >
        {/* 3D粒子背景 */}
        <div className="absolute inset-0 z-0">
          <Dynamic3DModel />
        </div>
        
        {/* 动态星空背景 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.2)`
              }}
            />
          ))}
        </div>

        {/* 炫光文字特效 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500 opacity-20 blur-[100px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-500 opacity-20 blur-[80px] rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500 opacity-15 blur-[70px] rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          {/* 英雄区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 左侧标题和描述 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-text-shine">
                  Echo
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">
                  Knowledge as
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.5)_100%)] bg-[length:200%_auto] animate-text-shine">
                  Real-World Assets
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="mt-8 text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-2 py-1 rounded-lg border border-cyan-500/30">
                  Revolutionizing knowledge ownership
                </span>{" "}
                through blockchain, AI, and TEE technology. We empower creators to{" "}
                <span className="text-cyan-300 font-medium">own</span>,{" "}
                <span className="text-purple-300 font-medium">monetize</span>, and{" "}
                <span className="text-pink-300 font-medium">share</span> their intelligence in a fair, decentralized ecosystem.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-10 flex gap-4"
              >
                <Button className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-300">
                  <span className="relative z-10">Discover Our Vision</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </Button>
                
                <Button variant="outline" className="relative overflow-hidden group border-2 border-cyan-400/50 bg-transparent text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Join Waitlist
                  </span>
                  <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </motion.div>
            </motion.div>

            {/* 右侧3D模型 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="relative w-full h-[500px] lg:h-[700px]"
              style={{ y: y1 }}
            >
              <img
                src="/hero.jpg"
                alt="Abstract Knowledge"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 rounded-3xl border-2 border-cyan-500/30 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(59,130,246,0.3)] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>

        {/* 合作伙伴视差区域 */}
        <motion.div 
          className="py-24 relative"
          style={{ y: y2 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-16"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Trusted By Industry Leaders
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
              {[
                { name: "Phala Network", logo: "/partners/Phala Network.png" },
                { name: "AWS", logo: "/partners/aws.png" },
                { name: "HXC", logo: "/partners/hxc.png" },
                { name: "PolyU Innohub", logo: "/partners/innohub.png" },
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                  <p className="mt-4 text-sm text-gray-400 text-center font-medium">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* 背景装饰元素 */}
          <div className="absolute -left-20 top-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute -right-20 bottom-1/4 w-60 h-60 bg-cyan-500/20 rounded-full blur-[100px]"></div>
        </motion.div>

        {/* 核心特性区域 */}
        <motion.div 
          className="py-24 relative"
          style={{ y: y3 }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Revolutionizing Knowledge Economy
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We're building the infrastructure for the next generation of knowledge exchange
              </p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden group bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-all duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{feature.desc}</p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-4"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-cyan-400 font-medium">Learn more</span>
                      <span className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 rounded-full group-hover:bg-cyan-500/20 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 团队成员背景区域 */}
        <motion.div 
          className="py-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Academic Excellence
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our team comes from world-class institutions pushing the boundaries of Web3 research
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
              {[
                { name: "The Hong Kong Polytechnic University", logo: "/logos/polyu.png" },
                { name: "The Chinese University of Hong Kong", logo: "/logos/cuhk.png" },
                { name: "The Hong Kong University of Science and Technology", logo: "/logos/hkust.png" },
                { name: "Nanyang Technological University", logo: "/logos/ntu.png" },
              ].map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <p className="mt-4 text-sm text-gray-400 text-center font-medium leading-tight">{school.name}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-lg text-center text-gray-300 max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              We are a team of blockchain and AI experts from leading institutions. Our members have contributed to groundbreaking research in Real-World Assets (RWA) and Web3 protocols, primarily on SUI but also on Ethereum and other chains.
            </motion.p>
          </div>
        </motion.div>

        {/* FAQ 区域 */}
        <motion.div 
          className="py-24 relative"
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Have Questions?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We've got answers to your most common queries
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What is Echo?",
                  answer: "Echo is a platform that transforms knowledge into tokenized digital assets using blockchain and AI.",
                  icon: <BrainCircuit className="w-6 h-6 text-cyan-400" />
                },
                {
                  question: "How does Echo ensure privacy?",
                  answer: "We use Trusted Execution Environments (TEE) to ensure secure and auditable knowledge usage.",
                  icon: <Lock className="w-6 h-6 text-purple-400" />
                },
                {
                  question: "Can I trade knowledge assets?",
                  answer: "Yes, Echo allows you to fractionalize, bundle, and trade knowledge as real-world assets.",
                  icon: <Gem className="w-6 h-6 text-pink-400" />
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden bg-gray-900/60 p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {faq.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-gray-400">{faq.answer}</p>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 页脚 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="py-16 text-center relative overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-5xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Ready to Transform Knowledge?
              </span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-black px-10 py-6 rounded-full text-xl font-bold shadow-lg transform transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-6 h-6" />
                  Join the Waitlist
                </span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
            
            <div className="mt-16 text-sm text-gray-500">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
              Built with ❤️ by the Echo Protocol Team — Empowering Knowledge as an Investable Asset.
            </div>
          </div>
          
          {/* 装饰元素 */}
          <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
            <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px]"></div>
          </div>
        </motion.div>
      </div>
    </>
  );
}