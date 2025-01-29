import {create} from "zustand/index";

const useTagStore = create((set) => ({
    tags: [
        { 'id': 'new tag', name: 'New tag', color: '#f3f3f3' },
        { 'id': 'study', name: 'Study', color: '#e2ebfe' },
        { 'id': 'reading', name: 'Reading', color: '#d1d3f6' },
        { 'id': 'indonesian', name: 'Indonesian', color: '#f2dcd0' },
        { 'id': 'exercise', name: 'Exercise', color: '#f1f7d1' },
        { 'id': 'mindfulness', name: 'Mindfulness', color: '#fdf6d7' },
    ],
    activeTag: 'study'
}))

export default useTagStore;