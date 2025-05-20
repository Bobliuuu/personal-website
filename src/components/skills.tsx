"use client";

import { Canvas } from "@react-three/fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

const skills = [
  "React", "Next.js", "Remix", "Typescript", "SvelteKit",
  "Tanstack", "Redux", "Zustand", "Zod", "test1", "test2", 
  "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"
];

const BRICKS_PER_ROW = 5;

function StaticBrick({ position, skill, scale }: { position: [number, number, number]; skill: string; scale: number }) {
  return (
    <mesh position={position.map((v) => v * scale) as [number, number, number]}>
      <boxGeometry args={[3 * scale, 0.8 * scale, 0.9 * scale]} />
      <meshStandardMaterial color="#444" />
      <Text
        position={[0, 0, 0.5 * scale]}
        fontSize={0.4 * scale}
        color="#ffe81f"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </mesh>
  );
}

function FallingBrick({ position, skill, scale }: { position: [number, number, number]; skill: string; scale: number }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position.map((v) => v * scale) as [number, number, number],
    args: [3 * scale, 0.8 * scale, 0.9 * scale],
  }));

  useEffect(() => {
    const x = (Math.random() - 0.5) * 3 * scale;
    const y = (2 + Math.random() * 3) * scale;
    const z = (Math.random() - 0.5) * 3 * scale;
    api.applyImpulse([x, y, z], [0, 0, 0]);
  }, [api, scale]);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[3 * scale, 0.8 * scale, 0.9 * scale]} />
      <meshStandardMaterial color="#444" />
      <Text
        position={[0, 0, 0.5 * scale]}
        fontSize={0.4 * scale}
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
    position: [0, -1, 0],
  }));
  return null;
}

function BrickWall({ falling, scale }: { falling: boolean; scale: number }) {
  return (
    <>
      {skills.map((skill, index) => {
        const row = Math.floor(index / BRICKS_PER_ROW);
        const col = index % BRICKS_PER_ROW;
        const x = (col - (BRICKS_PER_ROW - 1) / 2) * 3.4;
        const y = row * -1.1 + 2;
        const z = 0;
        const pos: [number, number, number] = [x, y, z];
        return falling ? (
          <FallingBrick key={index} position={pos} skill={skill} scale={scale} />
        ) : (
          <StaticBrick key={index} position={pos} skill={skill} scale={scale} />
        );
      })}
    </>
  );
}

export default function Skills() {
  const [falling, setFalling] = useState(false);
  const [showList, setShowList] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(Math.max(0.4, Math.min(1, width / 1200)));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (falling) {
      const timeout = setTimeout(() => setShowList(true), 3000);
      return () => clearTimeout(timeout);
    }
  }, [falling]);

  return (
    <section className="w-full mx-auto px-12 sm:px-16 lg:px-24 mt-12 mb-12">
      <h2 className="animate-glow text-4xl font-semibold mb-8 text-center text-transparent bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text">
        Skills
      </h2>

      {!showList ? (
        <div
          ref={containerRef}
          onClick={() => setFalling(true)}
          className="w-full"
          style={{ height: `${400 * scale}px`, cursor: 'pointer', borderRadius: '0.75rem', overflow: 'hidden' }}
        >
          <Canvas camera={{ position: [0, 4 * scale, 14 * scale], fov: 50 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5 * scale, 10 * scale, 5 * scale]} intensity={1.2} castShadow />
            {falling ? (
              <Physics gravity={[0, -9.81, 0]}>
                <Ground />
                <BrickWall falling scale={scale} />
              </Physics>
            ) : (
              <BrickWall falling={false} scale={scale} />
            )}
          </Canvas>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center rounded-xl overflow-hidden" style={{ height: `${400 * scale}px` }}>
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
