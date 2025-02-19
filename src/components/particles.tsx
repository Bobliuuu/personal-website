"use client"

import { useState, useEffect } from "react"
import type { Container, Engine } from "@tsparticles/engine"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const options: ISourceOptions = {
    fpsLimit: 144,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 2,
        },
        repulse: {
          distance: 100,
          duration: 1,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.6,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          valueArea: 900,
        },
        value: 20,
      },
      opacity: {
        value: 0.3,
        random: true,
      },
      shape: {
        type: ["polygon", "circle"],
        options: {
          sides: 9,
          width: 0,
          close: true,
          fill: false,
          opacity: 0.1,
        },
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    detectRetina: true,
  }

  if (!init) {
    return null
  }

  return <Particles id="tsparticles" options={options} />
}

export default ParticlesBackground
