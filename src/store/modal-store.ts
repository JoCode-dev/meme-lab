import { create } from "zustand";

interface ModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useModalStore;
