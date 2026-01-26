import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export const MESSAGES_TO_KEEP = 100;
export const TELEGRAM_MAX_RETRIES = 3;

interface SettingsState {
    notificationsEnabled: boolean;
    powerOffMessage: string;
    powerOnMessage: string;
    language: 'en' | 'ru';
    telegramChatId: string;
}

const initialState: SettingsState = {
    notificationsEnabled: true,
    powerOffMessage: 'Power is OFF',
    powerOnMessage: 'Power is ON',
    language: 'en',
    telegramChatId: '',
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
        setTelegramChatId: (state, action: PayloadAction<string>) => {
            state.telegramChatId = action.payload;
        },
    },
});

export const {
    setNotificationsEnabled,
    setPowerOffMessage,
    setPowerOnMessage,
    setLanguage,
    setTelegramChatId,
} = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectNotificationsEnabled = (state: RootState) => state.settings.notificationsEnabled;
export const selectTelegramChatId = (state: RootState) => state.settings.telegramChatId;
