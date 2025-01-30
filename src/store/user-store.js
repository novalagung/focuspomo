import {create} from "zustand/index";

const useUserStore = create((set) => ({
    session: '',
    email: '',
}))

export default useUserStore;