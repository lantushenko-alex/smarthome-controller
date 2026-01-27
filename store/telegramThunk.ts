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
            const telegramChatIds = selectTelegramChatId(state).split(',').map(id => id.trim()).filter(id => id.length > 0);
            const token = selectTelegramKey(state);

            // If not configured, do nothing
            if (!notificationsEnabled || telegramChatIds.length === 0 || !token) {
                return;
            }

            const url = `https://api.telegram.org/bot${token}/sendMessage`;
            let lastError: Error | null = null;

            for (const chatId of telegramChatIds) {
                let success = false;
                for (let i = 0; i < TELEGRAM_MAX_RETRIES; i++) {
                    try {
                        const res = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text,
                            }),
                        });

                        if (!res.ok) {
                            const details = await res.text().catch(() => '');
                            throw new Error(`Telegram sendMessage failed for ${chatId}: ${res.status} ${res.statusText} ${details}`);
                        }

                        success = true;
                        break; // Success for this chatId
                    } catch (error) {
                        lastError = error as Error;
                        console.warn(`Telegram send attempt ${i + 1} failed for ${chatId}`, error);
                    }
                }
                if (!success) {
                    // We continue to other chat IDs even if one fails, but we'll record the last error
                    console.error(`Failed to send telegram notification to ${chatId} after all attempts`);
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
