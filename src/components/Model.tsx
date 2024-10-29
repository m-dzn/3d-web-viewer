"use client";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ModelProps {
  gltf?: GLTF;
}

const Model = ({ gltf, ...rest }: ModelProps) => {
  return gltf && <primitive {...rest} object={gltf.scene} />;
};

export default Model;
