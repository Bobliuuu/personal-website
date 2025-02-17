import { createSlice } from '@reduxjs/toolkit';

const storeMode = (newMode: string): void => {
    localStorage.setItem('mode', newMode);
};

// ChatGPT helping me with reducers fr
export const modeSlice = createSlice({
    name: 'mode',
    initialState: 'light',
    reducers: {
        setMode: (state: any, action): void => {
            const save = action.payload;
            state.mode = save;
            storeMode(save);
        }
    }
})


export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;