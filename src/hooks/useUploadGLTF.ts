import { ChangeEvent } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export const useUploadGLTF = () => {
  const handleUploadGLTF = (
    event: ChangeEvent<HTMLInputElement>,
    setGltf: (fileName: string, gltf: GLTF) => void
  ) => {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    if (file && file.name.endsWith(".glb")) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const arrayBuffer = readerEvent.target?.result;

        if (!arrayBuffer) return;

        const loader = new GLTFLoader();
        const draco = new DRACOLoader();
        draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        loader.setDRACOLoader(draco);

        loader.parse(arrayBuffer, "", (loadedGltf) => {
          setGltf(file.name, loadedGltf);
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert(".glb 파일을 업로드해주세요");
    }
  };

  return { handleUploadGLTF };
};
