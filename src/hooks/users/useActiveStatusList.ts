import { create } from "zustand";

interface ActiveStatusList {
    members: string[],
    add: (id: string) => void,
    remove: (id: string) => void,
    set: (ids: string[]) => void,
}

const useActiveStatusList = create<ActiveStatusList>((set) => ({
    members: [],
    add: (id) => set((state) => ({
        members: [...state.members, id]
    })),
    remove: (id) => set((state) => ({
        members: state.members.filter((memberId) => memberId !== id)
    })),
    set: (ids) => set(() => ({
        members: ids
    }))
}));

export default useActiveStatusList;