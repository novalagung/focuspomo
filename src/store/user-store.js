import {create} from "zustand/index";

const useUserStore = create((set) => ({
    session: '',
}))

export default useUserStore;