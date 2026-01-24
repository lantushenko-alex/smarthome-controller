import { useEffect } from 'react';
import * as Battery from 'expo-battery';
import { useDispatch, useSelector } from 'react-redux';
import { setPowered } from '@/store/statusSlice';
import { addEvent } from '@/store/logsSlice';
import { sendTelegramNotification } from '@/store/telegramThunk';
import { RootState, AppDispatch } from '@/store';

export function useBatteryMonitor() {
    const dispatch = useDispatch<AppDispatch>();
    const isPowered = useSelector((state: RootState) => state.status.isPowered);
    const { notificationsEnabled, powerOffMessage, powerOnMessage, telegramChatId } = useSelector(
        (state: RootState) => state.settings
    );

    useEffect(() => {
        let subscription: Battery.Subscription | null = null;

        const updateBatteryStatus = (batteryState: Battery.BatteryState) => {
            const powered =
                batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL;

            if (powered !== isPowered) {
                dispatch(setPowered(powered));

                const eventType = powered ? 'on' : 'off';
                dispatch(
                    addEvent({
                        id: Date.now().toString(),
                        type: eventType,
                        timestamp: Date.now(),
                    })
                );

                if (notificationsEnabled) {
                    dispatch(sendTelegramNotification(powered ? powerOnMessage : powerOffMessage));
                }
            }
        };

        // Initial check
        Battery.getBatteryStateAsync().then(updateBatteryStatus);

        // Subscribe to changes
        subscription = Battery.addBatteryStateListener(({ batteryState }) => {
            updateBatteryStatus(batteryState);
        });

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [dispatch, isPowered, notificationsEnabled, powerOffMessage, powerOnMessage, telegramChatId]);
}
