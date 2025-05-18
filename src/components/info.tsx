"use client";
import { Canvas } from "@react-three/fiber";
import { useBox, Physics } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const skills = [
  "React", "Next.js", "Remix", "Tanstack", "SvelteKit",
  "Typescript", "Redux", "Zustand", "Zod"
];

function JengaBrick({
  position,
  rotation,
  skill,
  readyToFall
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  skill: string;
  readyToFall: boolean;
}) {
  const [ref, api] = useBox(() => ({
    position,
    rotation,
    args: [2, 0.5, 0.6],
    type: "Static",
  }));

  useEffect(() => {
    if (readyToFall) {
      // Set mass and apply impulse to simulate fall
      api.mass.set(1);
      api.type.set("Dynamic");
      api.applyImpulse(
        [Math.random() * 2 - 1, 5 + Math.random() * 2, Math.random() * 2 - 1],
        [0, 0, 0]
      );
    }
  }, [api, readyToFall]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[2, 0.5, 0.6]} />
      <meshStandardMaterial color="#888" />
      <Text
        position={[0, 0, 0.36]}
        fontSize={0.3}
        color="#ffe81f"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </mesh>
  );
}

function JengaTower({ readyToFall }: { readyToFall: boolean }) {
  const layers = 3;
  const bricksPerLayer = 3;
  let skillIndex = 0;

  return (
    <group>
      {[...Array(layers)].map((_, layer) =>
        [...Array(bricksPerLayer)].map((_, i) => {
          const x = (i - 1) * 1.2;
          const y = layer * 0.7;
          const z = layer % 2 === 0 ? 0 : (i - 1) * 1.2;
          const rot = layer % 2 === 0 ? [0, 0, 0] : [0, Math.PI / 2, 0];
          const skill = skills[skillIndex++];
          return (
            <JengaBrick
              key={`${layer}-${i}`}
              position={[x, y, z]}
              rotation={rot}
              skill={skill}
              readyToFall={readyToFall}
            />
          );
        })
      )}
    </group>
  );
}

export default function Info() {
  const [fallen, setFallen] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (fallen) {
      const timeout = setTimeout(() => setShowList(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [fallen]);

  return (
    <section className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pt-0 mt-8">
      {/* Education Section */}
      <div>
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium mb-8">
          <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src="/uwaterloo_logo_black.png"
              alt="University of Waterloo logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl font-medium">University of Waterloo</h3>
              <span className="text-gray-400">2022 - 2027</span>
            </div>
            <p className="text-gray-300">
              Bachelor&apos;s Degree of Math (BMath) in Computer Science, Combinatorics and Optimization Joint
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h2 className="text-3xl sm:text-3xl lg:text-4xl font-medium mb-8 pt-10">
          <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <div style={{ width: "100%", height: "350px", margin: "auto" }}>
          {!showList ? (
            <div
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              onClick={() => setFallen(true)}
            >
              <Canvas camera={{ position: [0, 3, 10], fov: 50 }} shadows>
                <ambientLight intensity={0.7} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Physics gravity={[0, -9.81, 0]}>
                  <JengaTower readyToFall={fallen} />
                </Physics>
              </Canvas>
              <div style={{ textAlign: "center", color: "#fff", marginTop: 8 }}>
                Click the tower!
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {skills.map((skill, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  className="border border-white bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
                >
                  {skill}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
