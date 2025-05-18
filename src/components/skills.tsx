"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const skills = [
  "React", "Next.js", "Remix", "Typescript", "SvelteKit",
  "Tanstack", "Redux", "Zustand", "Zod", "test1", "test2", 
  "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"
];

const BRICKS_PER_ROW = 5;

function StaticBrick({
    position,
    skill,
  }: {
    position: [number, number, number];
    skill: string;
  }) {
    return (
      <mesh position={position}>
        <boxGeometry args={[3, 0.8, 0.9]} /> {/* Increased size */}
        <meshStandardMaterial color="#444" />
        <Text
          position={[0, 0, 0.5]}  // Move text forward to match new depth
          fontSize={0.4}          // Slightly larger text
          color="#ffe81f"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </mesh>
    );
  }

  function FallingBrick({
    position,
    skill,
  }: {
    position: [number, number, number];
    skill: string;
  }) {
    const [ref, api] = useBox(() => ({
      mass: 1,
      position,
      args: [3, 0.8, 0.9], // Match size
    }));
  
    useEffect(() => {
        const x = (Math.random() - 0.5) * 3; // was 10
        const y = 2 + Math.random() * 3;   // was 4–7
        const z = (Math.random() - 0.5) * 3; // was 10
        api.applyImpulse([x, y, z], [0, 0, 0]);
      }, [api]);      
  
    return (
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.9]} />
        <meshStandardMaterial color="#444" />
        <Text
          position={[0, 0, 0.5]} // Adjust forward for visibility
          fontSize={0.4}
          color="#ffe81f"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </mesh>
    );
  }
  

function Ground() {
  usePlane(() => ({
    rotation: [-Math.PI /    2, 0, 0],
    position: [0, -3, 0],
  }));
  return null;
}

function BrickWall({ falling }: { falling: boolean }) {
  return (
    <>
  {skills.map((skill, index) => {
    const row = Math.floor(index / BRICKS_PER_ROW);
    const col = index % BRICKS_PER_ROW;
    const x = (col - (BRICKS_PER_ROW - 1) / 2) * 3.4;  // Wider than 3
    const y = row * -1.1 + 2;                          // Negative to go down, centered better
    const z = 0;
    const pos: [number, number, number] = [x, y, z];

    return falling ? (
      <FallingBrick key={index} position={pos} skill={skill} />
    ) : (
      <StaticBrick key={index} position={pos} skill={skill} />
    );
  })}
</>

  );
}

export default function Skills() {
  const [falling, setFalling] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (falling) {
      const timeout = setTimeout(() => setShowList(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [falling]);

  return (
    <section className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 mt-12 mb-12">
      <h2 className="animate-glow text-4xl font-semibold mb-8 text-center text-transparent bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text">
        Skills
      </h2>

      {!showList ? (
        <div
          onClick={() => setFalling(true)}
          className="w-full h-[400px] cursor-pointer rounded-xl overflow-hidden"
        >
          <Canvas camera={{ position: [0, 4, 14], fov: 50 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
            {falling ? (
              <Physics gravity={[0, -9.81, 0]}>
                <Ground />
                <BrickWall falling />
              </Physics>
            ) : (
              <BrickWall falling={false} />
            )}
          </Canvas>
        </div>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center rounded-xl overflow-hidden">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <Button
                key={i}
                variant="secondary"
                className="border border-white bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="animate-glow text-center text-lg mt-4">
        Click above! 
      </div>
    </section>
  );
}
