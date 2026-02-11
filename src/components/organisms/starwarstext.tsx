"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type StarWarsCrawlProps = { scale: number; titleSize: number };
function StarWarsCrawl({ scale, titleSize }: StarWarsCrawlProps) {
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
          size={titleSize}
          height={0.17}
          bevelEnabled
          bevelThickness={0.04}
          bevelSize={0.015}
          bevelOffset={0}
          bevelSegments={5}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          jerry zhu
          <meshStandardMaterial 
            color={hovered ? "#fffbe1" : "#ffe81f"} 
            emissive={hovered ? "#ffe81f" : "#000"} 
            emissiveIntensity={hovered ? 0.55 : 0} 
          />
        </Text3D>
      </group>

      {/* Resume Button - Primary (Lighter Yellow) */}
      <group position={[-3.5, -3.5, -1]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => window.open("/ZhuJerryResume.pdf", "_blank")}
          onPointerOver={() => { document.body.style.cursor = "pointer"; setHoveredLeft(true); }}
          onPointerOut={() => { document.body.style.cursor = "auto"; setHoveredLeft(false); }}
        >
          <boxGeometry args={[3, 0.6, 0.3]} />
          <meshStandardMaterial color={hoveredLeft ? "#666" : "#555"} />
        </mesh>
        <Text3D
        font="/starjedi_regular.json"
        size={0.45}
        height={0.08}
        position={[-1.15, -0.3, 0.4]}
        >
        resume
        <meshStandardMaterial color={hoveredLeft ? "#888" : "#f9facd"} emissive={hoveredLeft ? "#ffeb3b" : "#000"} emissiveIntensity={hoveredLeft ? 0.5 : 0} />
        </Text3D>
      </group>

      {/* Interactive Button - Secondary (Gray/Outline) */}
      <group position={[4.5, -3.5, -1]}>
        <mesh
          castShadow
          receiveShadow
          onClick={() => router.push("/interactive")}
          onPointerOver={() => { document.body.style.cursor = "pointer"; setHoveredRight(true); }}
          onPointerOut={() => { document.body.style.cursor = "auto"; setHoveredRight(false); }}
        >
          <boxGeometry args={[5, 0.6, 0.3]} />
          <meshStandardMaterial 
            color={hoveredRight ? "#666" : "#555"} 
            transparent
            opacity={hoveredRight ? 0.9 : 0.7}
          />
        </mesh>
        <Text3D
        font="/starjedi_regular.json"
        size={0.45}
        height={0.08}
        position={[-2.3, -0.3, 0.4]}
        >
        interactive
        <meshStandardMaterial 
          color={hoveredRight ? "#ccc" : "#999"} 
          emissive={hoveredRight ? "#666" : "#000"} 
          emissiveIntensity={hoveredRight ? 0.3 : 0} 
        />
        </Text3D>
      </group>
    </group>
  );
}

export default function StarWarsText() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [titleSize, setTitleSize] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setScale(width / 2000);
        
        // Calculate responsive title size equivalent to clamp(2.25rem, 6vw, 4.5rem)
        // Convert rem to pixels (assuming 16px base): 2.25rem = 36px, 4.5rem = 72px
        // 6vw = 6% of viewport width
        const minSize = 36; // 2.25rem
        const preferredSize = width * 0.06; // 6vw
        const maxSize = 72; // 4.5rem
        const clampedSize = Math.max(minSize, Math.min(preferredSize, maxSize));
        // Convert to 3D scale (original size was 1, which corresponds to ~72px at base scale)
        setTitleSize(clampedSize / 72);
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
          <StarWarsCrawl scale={scale} titleSize={titleSize} />
        </Suspense>
      </Canvas>
    </div>
  );
}
