import { create } from 'zustand'

const useGameStore = create((set) => ({
    laps: 0,
    currentCheckpoint: 0,
    totalCheckpoints: 4, // Total number of checkpoints on the track
    item: null,
    speed: 0,

    passCheckpoint: (index) => set((state) => {
        const nextCheckpoint = (state.currentCheckpoint + 1) % state.totalCheckpoints
        if (index === nextCheckpoint) {
            // If we passed the last checkpoint (start/finish line), increment lap
            if (nextCheckpoint === 0) {
                return { currentCheckpoint: nextCheckpoint, laps: state.laps + 1 }
            }
            return { currentCheckpoint: nextCheckpoint }
        }
        return {}
    }),

    setItem: (item) => set({ item }),
    setSpeed: (speed) => set({ speed }),
}))

export default useGameStore
