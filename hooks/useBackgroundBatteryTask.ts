import * as Battery from 'expo-battery';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
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

        return BackgroundTask.BackgroundTaskResult.Success;
    } catch (error) {
        console.error('Background task failed:', error);
        store.dispatch(
            addEvent({
                id: Date.now().toString(),
                type: 'error',
                timestamp: Date.now(),
                message: error instanceof Error ? error.message : String(error),
            })
        );
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
});

export async function registerBackgroundBatteryTask() {
    return BackgroundTask.registerTaskAsync(BACKGROUND_BATTERY_TASK, {
        minimumInterval: 60, // 1 minute, although it will delay to 15 mins
    });
}

//this is not actually used because we need this task running all the time
export async function unregisterBackgroundBatteryTask() {
    return BackgroundTask.unregisterTaskAsync(BACKGROUND_BATTERY_TASK);
}
