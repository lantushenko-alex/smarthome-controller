import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    notificationsEnabled: boolean;
    powerOffMessage: string;
    powerOnMessage: string;
    language: 'en' | 'ru';
}

const initialState: SettingsState = {
    notificationsEnabled: true,
    powerOffMessage: 'Power is OFF',
    powerOnMessage: 'Power is ON',
    language: 'en',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
            state.notificationsEnabled = action.payload;
        },
        setPowerOffMessage: (state, action: PayloadAction<string>) => {
            state.powerOffMessage = action.payload;
        },
        setPowerOnMessage: (state, action: PayloadAction<string>) => {
            state.powerOnMessage = action.payload;
        },
        setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
            state.language = action.payload;
        },
    },
});

export const { setNotificationsEnabled, setPowerOffMessage, setPowerOnMessage, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
