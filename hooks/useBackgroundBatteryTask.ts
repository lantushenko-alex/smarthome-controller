import * as Battery from 'expo-battery';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { store } from '@/store';
import { setPowered } from '@/store/statusSlice';
import { addEvent } from '@/store/logsSlice';
import { sendTelegramNotification } from '@/store/telegramThunk';

export const BACKGROUND_BATTERY_TASK = 'background-battery-check';

TaskManager.defineTask(BACKGROUND_BATTERY_TASK, async () => {
    try {
        const batteryState = await Battery.getBatteryStateAsync();
        const isPowered =
            batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL;
        
        const state = store.getState();
        const currentIsPowered = state.status.isPowered;

        if (isPowered !== currentIsPowered) {
            store.dispatch(setPowered(isPowered));

            const eventType = isPowered ? 'on' : 'off';
            store.dispatch(
                addEvent({
                    id: Date.now().toString(),
                    type: eventType,
                    timestamp: Date.now(),
                })
            );

            const { notificationsEnabled, powerOffMessage, powerOnMessage } = state.settings;
            if (notificationsEnabled) {
                await store.dispatch(sendTelegramNotification(isPowered ? powerOnMessage : powerOffMessage));
            }
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch (error) {
        console.error('Background task failed:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function registerBackgroundBatteryTask() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_BATTERY_TASK, {
        minimumInterval: 60, // 1 minute
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

export async function unregisterBackgroundBatteryTask() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_BATTERY_TASK);
}
