import { ChangeEventHandler, useEffect, useState } from "react";
import { Mesh, MeshStandardMaterial, TextureLoader } from "three";

import { useMeshStore } from "@/store";

const DEFAULT_COLOR = "#ffffff";
const TEXTURE_PATHS = [
  "/assets/textures/fabric-weave/fabric-weave-basecolor.png",
  "/assets/textures/leather-armor/leather-armor-basecolor.png",
  "/assets/textures/stone-floor/stone-floor-texture-basecolor.png",
];

const Toolbar = () => {
  const { currentMesh } = useMeshStore();

  /* 색상 */
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const handleChangeColor: ChangeEventHandler<HTMLInputElement> = (event) => {
    const color = event.target.value;
    setColor(color);

    const mesh = currentMesh as Mesh;
    if (mesh.material instanceof MeshStandardMaterial) {
      // material의 color를 변경
      mesh.material.color.set(color);
    }
  };

  useEffect(() => {
    if (!currentMesh) return;

    const mesh = currentMesh as Mesh;
    if (mesh.material instanceof MeshStandardMaterial) {
      setColor(`#${mesh.material.color.getHexString()}`);
    } else {
      setColor(DEFAULT_COLOR);
    }

    setSelectedMaterial(undefined);
  }, [currentMesh]);

  /* 재질 */
  const [selectedMaterial, setSelectedMaterial] = useState<number | undefined>(
    undefined
  );

  const handleMaterialChange = (index: number) => {
    setSelectedMaterial(index);
  };

  useEffect(() => {
    if (!currentMesh || selectedMaterial === undefined) return;

    const mesh = currentMesh as Mesh;
    const loader = new TextureLoader();
    const texture = loader.load(TEXTURE_PATHS[selectedMaterial]);

    if (mesh.material instanceof MeshStandardMaterial) {
      mesh.material.map = texture;
      mesh.material.needsUpdate = true;
    }
  }, [selectedMaterial]);

  return (
    <aside className="w-80 h-screen bg-surface p-4 flex flex-col gap-4 shrink-0">
      {currentMesh && (
        <>
          <h3 className="text-lg font-bold">{currentMesh?.name}</h3>
          <h6 className="font-semibold">색상 변경</h6>
          <input type="color" value={color} onChange={handleChangeColor} />
          <h6 className="font-semibold">재질 변경</h6>
          <div className="flex gap-4">
            {TEXTURE_PATHS.map((path, index) => (
              <MaterialButton
                key={path}
                path={path}
                active={index === selectedMaterial}
                onClick={() => handleMaterialChange(index)}
              />
            ))}
          </div>
        </>
      )}
    </aside>
  );
};

interface MaterialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  active?: boolean;
}

const MaterialButton = ({ path, active, ...rest }: MaterialButtonProps) => {
  const activeStyle = "border-red-500";

  return (
    <button {...rest}>
      <img
        className={`w-20 h-20 border-4 rounded-md ${active && activeStyle}`}
        src={path}
      />
    </button>
  );
};

export default Toolbar;
