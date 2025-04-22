import { create } from "zustand";
import type { ShapeOpts } from "@/types";

export interface State {
  files: File[];
  shapes: ShapeOpts[];
  selectedShapeId: string | null;
}

export type Actions = {
  setFiles: (files: File[]) => void;
  addShape: (shape: ShapeOpts) => void;
  transformShape: (shapeId: string, props: Partial<ShapeOpts["props"]>) => void;
  deleteShape: (shapeId: string) => void;
  selectShape: (shapeId: string) => void;
  deselectShape: () => void;
  reset: () => void;
};

const initialState: State = {
  files: [],
  shapes: [],
  selectedShapeId: null,
};

const useStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setFiles: (files: File[]) => set({ files }),
  addShape: (shape: ShapeOpts) =>
    set((state) => ({ shapes: [...state.shapes, shape] })),
  transformShape: (shapeId: string, props: Partial<ShapeOpts["props"]>) =>
    set((state) => ({
      shapes: state.shapes.map((shape) =>
        shape.id === shapeId
          ? { ...shape, props: { ...shape.props, ...props } }
          : shape
      ),
    })),
  deleteShape: (shapeId: string) =>
    set((state) => ({
      shapes: state.shapes.filter((shape) => shape.id !== shapeId),
    })),
  selectShape: (shapeId: string) => set({ selectedShapeId: shapeId }),
  deselectShape: () => set({ selectedShapeId: null }),
  reset: () => set((state) => ({ ...state, ...initialState, files: [] })),
}));

export default useStore;
