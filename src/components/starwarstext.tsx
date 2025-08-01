"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type StarWarsCrawlProps = { scale: number };
function StarWarsCrawl({ scale }: StarWarsCrawlProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);
  const floatOffset = useRef(0);
  const router = useRouter();

  useFrame(({ clock }) => {
    floatOffset.current = Math.sin(clock.getElapsedTime() * 1.2) * 0.18;
    if (group.current) {
      group.current.position.y = floatOffset.current;
    }
  });

  return (
    <group ref={group} rotation={[-Math.PI / 6, 0, 0]} scale={[scale, scale, scale]}>
      {/* Title Text */}
      <group position={[-4, 2, 0]}>
        <Text3D
          font="/starjedi_regular.json"
          size={1}
          height={0.2}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          jerry zhu
          <meshStandardMaterial color={hovered ? "#fffbe1" : "#ffe81f"} emissive={hovered ? "#ffe81f" : "#000"} emissiveIntensity={hovered ? 0.7 : 0} />
        </Text3D>
      </group>

      {/* Resume Button */}
      <group position={[-3.5, -3.5, -1]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => router.push("/resume")}
          onPointerOver={() => { document.body.style.cursor = "pointer"; setHoveredLeft(true); }}
          onPointerOut={() => { document.body.style.cursor = "auto"; setHoveredLeft(false); }}
        >
          <boxGeometry args={[3, 0.7, 0.4]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        <Text3D
        font="/starjedi_regular.json"
        size={0.45}
        height={0.1}
        position={[-1.15, -0.35, 0.5]}
        >
        resume
        <meshStandardMaterial color={hoveredLeft ? "#fffbe1" : "#ffe81f"} emissive={hoveredLeft ? "#ffe81f" : "#000"} emissiveIntensity={hoveredLeft ? 0.7 : 0} />
        </Text3D>
      </group>

      {/* Interactive Button */}
      <group position={[4.5, -3.5, -1]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => router.push("/interactive")}
          onPointerOver={() => { document.body.style.cursor = "pointer"; setHoveredRight(true); }}
          onPointerOut={() => { document.body.style.cursor = "auto"; setHoveredRight(false); }}
        >
          <boxGeometry args={[5, 0.7, 0.4]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        <Text3D
        font="/starjedi_regular.json"
        size={0.45}
        height={0.1}
        position={[-2.3, -0.35, 0.5]}
        >
        interactive
        <meshStandardMaterial color={hoveredRight ? "#fffbe1" : "#ffe81f"} emissive={hoveredRight ? "#ffe81f" : "#000"} emissiveIntensity={hoveredRight ? 0.7 : 0} />
        </Text3D>
      </group>
    </group>
  );
}

export default function StarWarsText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setScale(width / 2000);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "500px",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <Canvas camera={{ position: [0, -2, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <StarWarsCrawl scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
