import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { RootState } from './index';
import {
    selectNotificationsEnabled,
    selectTelegramChatId,
    selectTelegramKey,
    setTelegramKey,
    TELEGRAM_TOKEN_KEY,
} from './settingsSlice';

export const sendTelegramNotification = createAsyncThunk(
    'telegram/sendNotification',
    async (text: string, { getState, dispatch }) => {
        try {
            const state = getState() as RootState;

            const notificationsEnabled = selectNotificationsEnabled(state);
            const telegramChatId = selectTelegramChatId(state);

            let token = selectTelegramKey(state);
            if (!token) {
                token = (await SecureStore.getItemAsync(TELEGRAM_TOKEN_KEY)) || '';
                if (token) {
                    dispatch(setTelegramKey(token));
                }
            }

            // If not configured, do nothing
            if (!notificationsEnabled || !telegramChatId || !token) {
                return;
            }

            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text,
                }),
            });

            if (!res.ok) {
                const details = await res.text().catch(() => '');
                throw new Error(`Telegram sendMessage failed: ${res.status} ${res.statusText} ${details}`);
            }
        } catch (error) {
            console.error('Failed to send telegram notification', error);
            throw error;
        }
    }
);
