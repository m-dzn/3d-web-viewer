"use client";
import { useState } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Model, Sidebar } from "@/components";
import { GLTFRecord } from "@/types";

export default function Home() {
  const [gltf, setGltf] = useState<GLTF | undefined>();

  const handleChangeModel = (model: GLTFRecord) => {
    setGltf(model.gltf);
  };

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Sidebar onChangeModel={handleChangeModel} />
      <main className="flex-1 flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Canvas>
          <ambientLight intensity={1.5} />
          <directionalLight position={[0, 5, 5]} />
          <OrbitControls />

          <Model gltf={gltf} />
        </Canvas>
      </main>
    </div>
  );
}
