import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
    isPowered: boolean;
}

const initialState: StatusState = {
    isPowered: true,
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setPowered: (state, action: PayloadAction<boolean>) => {
            state.isPowered = action.payload;
        },
    },
});

export const { setPowered } = statusSlice.actions;

export default statusSlice.reducer;
