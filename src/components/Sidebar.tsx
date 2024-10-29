"use client";
import { useState } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

import { useUploadGLTF } from "@/hooks";
import { GLTFRecord } from "@/types";

import UploadButton from "./UploadButton";
import ModelList from "./ModelList";

interface SidebarProps {
  onChangeModel: (model: GLTFRecord) => void;
}

const Sidebar = ({ onChangeModel }: SidebarProps) => {
  const { handleUploadGLTF } = useUploadGLTF();

  const [list, setList] = useState<GLTFRecord[]>([]);
  const addGLTFToList = (fileName: string, gltf: GLTF) => {
    setList((prev) => [...prev, { name: fileName, gltf }]);
  };
  console.log(list);

  return (
    <aside className="w-80 h-screen bg-surface p-4 flex flex-col gap-4">
      <UploadButton
        leftIcon={<p>+</p>}
        onFileChange={(event) => handleUploadGLTF(event, addGLTFToList)}
      >
        3D 모델 추가
      </UploadButton>
      <ModelList models={list} onChangeModel={onChangeModel} />
    </aside>
  );
};

export default Sidebar;
