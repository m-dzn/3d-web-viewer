import { useMeshStore } from "@/store";
import { ThreeEvent } from "@react-three/fiber";
import { Select } from "@react-three/postprocessing";
import { useState } from "react";
import { Object3D, Object3DEventMap } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  gltf?: GLTF;
}

const Model = ({ gltf }: ModelProps) => {
  return (
    gltf && (
      <group>
        {Object.entries(gltf.scene.children).map(([key, mesh]) => {
          return <Mesh key={key} mesh={mesh} />;
        })}
      </group>
    )
  );
};

const Mesh = ({
  mesh,
}: {
  mesh: Object3D<Object3DEventMap>;
  color?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const { setCurrentMesh } = useMeshStore();

  const handleSelect = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    setCurrentMesh(event.object);
  };

  return (
    <Select enabled={hovered} onPointerDown={handleSelect}>
      <primitive
        object={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </Select>
  );
};

export default Model;
