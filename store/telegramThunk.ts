import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import {
    selectNotificationsEnabled,
    selectTelegramChatId,
    TELEGRAM_MAX_RETRIES,
} from './settingsSlice';
import { selectTelegramKey } from './secureSlice';
import { addEvent } from './logsSlice';

export const sendTelegramNotification = createAsyncThunk(
    'telegram/sendNotification',
    async (text: string, { getState, dispatch }) => {
        try {
            const state = getState() as RootState;

            const notificationsEnabled = selectNotificationsEnabled(state);
            const telegramChatId = selectTelegramChatId(state);
            const token = selectTelegramKey(state);

            // If not configured, do nothing
            if (!notificationsEnabled || !telegramChatId || !token) {
                return;
            }

            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            let lastError: Error | null = null;

            for (let i = 0; i < TELEGRAM_MAX_RETRIES; i++) {
                try {
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

                    return; // Success
                } catch (error) {
                    lastError = error as Error;
                    console.warn(`Telegram send attempt ${i + 1} failed`, error);
                }
            }

            if (lastError) {
                throw lastError;
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error('Failed to send telegram notification after all attempts', error);
            dispatch(addEvent({
                id: Date.now().toString(),
                type: 'error',
                timestamp: Date.now(),
                message: `Telegram: ${errorMessage}`,
            }));
            throw error;
        }
    }
);
