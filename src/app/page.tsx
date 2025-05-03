"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import AutoScrollCarousel from "@/components/AutoScrollCarousel";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, BrainCircuit, Lock, Gem } from "lucide-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import ParticlesBackground from "@/components/Particles";
import Image from "next/image";

// import dynamic from "next/dynamic";
// 动态加载3D组件以减少初始加载
// const Dynamic3DModel = dynamic(() => import("@/components/Particles"), {
//   ssr: false,
//   loading: () => <div className="w-full h-[500px] bg-transparent rounded-3xl" />
// });

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
const partners = [
  { name: "Phala Network", logo: "/partners/Phala Network.png" },
  { name: "AWS", logo: "/partners/aws.png" },
  { name: "HXC", logo: "/partners/hxc.png" },
  { name: "PolyU Innohub", logo: "/partners/innohub.png" },
]
const knowledgeAssets = [
  {
    type: "Research Paper",
    title: "Blockchain-based Knowledge Provenance",
    author: "Dr. Zhang et al.",
    image: "/showcase/paper1.png",
    desc: "Peer-reviewed paper on blockchain for academic attribution",
    status: "Tokenized"
  },
  {
    type: "Investment Report",
    title: "Web3 Knowledge Economy Outlook 2024",
    author: "Echo Analytics",
    image: "/showcase/report1.jpg",
    desc: "Comprehensive analysis of knowledge tokenization trends",
    status: "Available"
  },
  {
    type: "Patent",
    title: "TEE-based Knowledge Access Control",
    author: "Echo Labs",
    image: "/showcase/patent1.jpg",
    desc: "Patent pending for privacy-preserving knowledge access",
    status: "Licensable"
  },
  {
    type: "Book",
    title: "The Tokenized Knowledge Revolution",
    author: "Prof. Li",
    image: "/showcase/book1.jpg",
    desc: "First edition with NFT-based ownership verification",
    status: "Sold Out"
  },
  {
    type: "White Paper",
    title: "RWA for Intellectual Property",
    author: "Echo Core Team",
    image: "/showcase/whitepaper.png",
    desc: "Technical specification for IP tokenization standard",
    status: "Free Access"
  }
]
const academic = [
  { name: "The Hong Kong Polytechnic University", logo: "/logos/polyu.png" },
  { name: "The Chinese University of Hong Kong", logo: "/logos/cuhk.png" },
  { name: "The Hong Kong University of Science and Technology", logo: "/logos/hkust.png" },
  { name: "Nanyang Technological University", logo: "/logos/ntu.png" },
]
const question = [
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
]
export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // 视差效果
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
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
        {/* <div className="absolute inset-0 z-0 bg-transparent">
          <Dynamic3DModel />
        </div> */}
        <ParticlesBackground />
        <div className="relative z-10">
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
                <Image
                  src="/hero.jpg"
                  alt="Abstract Knowledge"
                  fill
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 rounded-3xl border-2 border-cyan-500/30 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_50px_rgba(59,130,246,0.3)] pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 mb-24"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-cyan-300">
              Knowledge Assets Showcase
            </h3>
            
            {/* 横向滚动容器 */}
            <div className="relative max-w-7xl mx-auto">
              {/* 渐变遮罩 */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900/80 to-transparent z-10 pointer-events-none blur-sm animate-pulse"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900/80 to-transparent z-10 pointer-events-none blur-sm animate-pulse"></div>
              
              {/* 自动滚动容器 */}
              <div className="overflow-hidden relative">
                <AutoScrollCarousel>
                  {knowledgeAssets.map((item, index) => (
                    <div 
                      key={index}
                      className="w-[calc(20%-12px)] flex-shrink-0 mx-1.5" // 每次显示两个，间距3
                    >
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="h-full bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <div className="h-48 relative overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.title}
                            fill
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            {/* 模糊背景 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-md rounded-lg"></div>
                            <div className="relative">
                              <span className="text-xs font-semibold text-cyan-400">{item.type}</span>
                              <h4 className="text-lg font-bold text-white line-clamp-1">{item.title}</h4>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-1 bg-gray-900/80 rounded-full text-xs font-medium text-cyan-400">
                            {item.status}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-400 mb-2">By {item.author}</p>
                          <p className="text-gray-300 text-sm line-clamp-2">{item.desc}</p>
                          <button className="mt-3 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium transition-colors">
                            Coming Soon
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </AutoScrollCarousel>
              </div>
            </div>
          </motion.div>
          {/* 合作伙伴视差区域 */}
          <motion.div 
            className="py-12 relative"
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
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center p-6 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={100}
                      height={100}
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
            // style={{ y: y3 }}
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
                  We&apos;re building the infrastructure for the next generation of knowledge exchange
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
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            // style={{ y: y3 }}
            className="py-12 relative"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                  Monetization Showcase
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Real-world examples of knowledge assets generating revenue
                </p>
              </div>

              {/* 图片展示案例 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 案例1 - 专利获利 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="/showcase/patent-monetization.jpg"   
                      alt="Patent Monetization"
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <span className="text-xs font-semibold text-cyan-400 mb-1">TECHNOLOGY PATENT</span>
                      <h3 className="text-lg font-bold text-white">AI Algorithm Licensing</h3>
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-400">
                      $220K/yr
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      University of Hong Kong generates recurring revenue by licensing their patented 
                      AI algorithms through Echo&apos;s smart contract system
                    </p>
                    <div className="flex items-center text-sm text-cyan-400">
                      <span>View Case Study →</span>
                    </div>
                  </div>
                </motion.div>

                {/* 案例2 - 版权获利 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="/showcase/copyright-earnings.png" 
                      alt="Copyright Earnings"
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <span className="text-xs font-semibold text-purple-400 mb-1">DIGITAL PUBLISHING</span>
                      <h3 className="text-lg font-bold text-white">E-book Royalties</h3>
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-purple-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-purple-400">
                      $75K/quarter
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      Author monetizes out-of-print textbooks as NFT editions, earning royalties 
                      from secondary market sales and micro-licenses
                    </p>
                    <div className="flex items-center text-sm text-purple-400">
                      <span>View Case Study →</span>
                    </div>
                  </div>
                </motion.div>

                {/* 案例3 - 投研报告获利 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-gray-900/80 rounded-xl overflow-hidden border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="/showcase/research-revenue.jpg" 
                      alt="Research Revenue"
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                      <span className="text-xs font-semibold text-pink-400 mb-1">MARKET RESEARCH</span>
                      <h3 className="text-lg font-bold text-white">Crypto Market Analysis</h3>
                    </div>
                    <div className="absolute top-4 right-4 px-2 py-1 bg-pink-500/20 backdrop-blur-sm rounded-full text-xs font-medium text-pink-400">
                      $150K/month
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      Hedge fund monetizes proprietary research through tiered access 
                      subscriptions with TEE-protected content delivery
                    </p>
                    <div className="flex items-center text-sm text-pink-400">
                      <span>View Case Study →</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 更多案例链接 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <a 
                  href="#"
                  className="inline-flex items-center px-6 py-3 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  Explore More Revenue Cases
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
          {/* 团队成员背景区域 */}
          <motion.div 
            className="py-12 relative overflow-hidden"
            // style={{ y: y3 }}
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
                {academic.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center p-6 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-gray-800 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <Image
                      src={school.logo}
                      alt={school.name}
                      width={100}
                      height={100}
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
            className="py-12 relative"
            // style={{ y: y3 }}
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
                  We&apos;ve got answers to your most common queries
                </p>
              </motion.div>
              
              <div className="space-y-6">
                {question.map((faq, index) => (
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
      </div>
    </>
  );
}