import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface SecureState {
    telegramKey: string;
}

const initialState: SecureState = {
    telegramKey: '',
};

const secureSlice = createSlice({
    name: 'secure',
    initialState,
    reducers: {
        setTelegramKey: (state, action: PayloadAction<string>) => {
            state.telegramKey = action.payload;
        },
    },
});

export const { setTelegramKey } = secureSlice.actions;

export default secureSlice.reducer;

export const selectTelegramKey = (state: RootState) => state.secure.telegramKey;
