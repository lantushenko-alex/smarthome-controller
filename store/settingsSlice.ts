import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export const MESSAGES_TO_KEEP = 100;
export const TELEGRAM_TOKEN_KEY = 'telegram_bot_api_key';

interface SettingsState {
    notificationsEnabled: boolean;
    powerOffMessage: string;
    powerOnMessage: string;
    language: 'en' | 'ru';
    telegramChatId: string;
    telegramKey: string; // WARNING: This field is blacklisted in store/index.ts and NOT persisted in ordinary storage.
}

const initialState: SettingsState = {
    notificationsEnabled: true,
    powerOffMessage: 'Power is OFF',
    powerOnMessage: 'Power is ON',
    language: 'en',
    telegramChatId: '',
    telegramKey: '',
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
        setTelegramKey: (state, action: PayloadAction<string>) => {
            state.telegramKey = action.payload;
        },
    },
});

export const {
    setNotificationsEnabled,
    setPowerOffMessage,
    setPowerOnMessage,
    setLanguage,
    setTelegramChatId,
    setTelegramKey,
} = settingsSlice.actions;

export default settingsSlice.reducer;

export const selectNotificationsEnabled = (state: RootState) => state.settings.notificationsEnabled;
export const selectTelegramChatId = (state: RootState) => state.settings.telegramChatId;
export const selectTelegramKey = (state: RootState) => state.settings.telegramKey;
