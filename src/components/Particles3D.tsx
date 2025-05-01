"use client"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

export default function Particles3D() {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 3 },
          size: { value: 3 },
          shape: { type: "circle" },
          color: { value: ["#00FFFF", "#FF00FF"] },
          opacity: { value: 0.5 },
          links: { enable: true, distance: 150, color: "#888" }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }
          }
        }
      }}
    />
  )
}