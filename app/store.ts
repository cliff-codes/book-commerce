
import {create} from 'zustand'

interface CounterState{
    counter: number
    increase: (by: number) => void
    decrease: (by: number) => void
    reset:() => void
}

export const useCounterStore = create<CounterState>()((set) => ({
    counter: 1,
    increase: (by) => set((state) => ({counter: state.counter + by})),
    decrease: (by) => set((state) => ({counter: state.counter > 1 ? state.counter - by : state.counter})),
    reset: () => set(() => ({counter: 1}))
}))