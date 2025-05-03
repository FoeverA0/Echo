"use client";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 -z-1 h-screen w-full overflow-hidden bg-transparent">
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { 
          enable: false, 
          zIndex: -1 
        },
        fpsLimit: 60, // 限制帧率
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1200
            }
          },
          color: {
            value: ["#00FFFF", "#FF00FF", "#00FF00"]
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false
            }
          },
          links: {  // 注意：新版已从line_linked改为links
            enable: true,
            distance: 200,
            color: "#888",
            opacity: 0.4,
            width: 1,
            consent: true, // 保持连接稳定
            blink: false // 禁止闪烁
          },
          move: {
            enable: true,
            speed: 0.2, // 进一步降低速度
            direction: "none",
            random: false,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
              enable: false
            },
            trail: {
              enable: true, // 启用轨迹效果
              length: 10, // 轨迹长度
              fillColor: "#000000"
            }
          },
          collisions: {
            enable: true, // 启用粒子碰撞
            mode: "bounce" // 碰撞时反弹
          }
        },
        interactivity: {
          detect_on: "window", // 改为window更可靠
          events: {
            onhover: {
              enable: true,
              mode: "grab" // 改为grab模式更平滑
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: {
              enable: true,
              delay: 200, // 防抖延迟
              // debounce: {
              //   enabled: true,
              //   delay: 500
              // }
            }
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.8
              }
            },
            push: {
              particles_nb: 4,
              quantity: 2 // 减少推送数量
            }
          }
        },
        retina_detect: true,
        smooth: true, // 启用平滑动画
        background: {
          color: "transparent"
        }
        
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      }}
    />
    </div>
  );
}