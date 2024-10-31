import { create } from "zustand";
import { Object3D } from "three";

interface MeshStoreState {
  currentMesh: Object3D | null;
  setCurrentMesh: (currentMesh: Object3D) => void;
}

export const useMeshStore = create<MeshStoreState>((set) => ({
  currentMesh: null,
  setCurrentMesh: (currentMesh) => set({ currentMesh }),
}));
