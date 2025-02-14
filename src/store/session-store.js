import {create} from "zustand/index";

const useSessionStore = create((set) => ({
    tag: 'Study',
    focusDurationLabel: '00:07', // '25:00',
    focusDuration: 7, // 25 * 60,
    shortBreakDurationLabel: '00:05', // '05:00',
    shortBreakDuration: 5, // 3 * 60,
    longBreakDurationLabel: '00:07', // '25:00',
    longBreakDuration: 7, // 25 * 60,

    activeSessionActivity: 'inactive', // focus / short break / long break
    activeStopwatch: 0,
    focusRepeatCount: 3,
    focusCompleted: 0,

    showModal: ''
}))

export default useSessionStore;