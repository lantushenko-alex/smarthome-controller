import { useEffect } from 'react';
import * as Battery from 'expo-battery';
import { useDispatch, useSelector } from 'react-redux';
import { setPowered } from '@/store/statusSlice';
import { addEvent } from '@/store/logsSlice';
import { RootState } from '@/store';
import * as SecureStore from 'expo-secure-store';

const TELEGRAM_TOKEN_KEY = 'telegram_bot_api_key';

export function useBatteryMonitor() {
  const dispatch = useDispatch();
  const isPowered = useSelector((state: RootState) => state.status.isPowered);
  const { notificationsEnabled, powerOffMessage, powerOnMessage } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    let subscription: Battery.Subscription | null = null;

    const updateBatteryStatus = (batteryState: Battery.BatteryState) => {
      const powered = batteryState === Battery.BatteryState.CHARGING || batteryState === Battery.BatteryState.FULL;

      if (powered !== isPowered) {
        dispatch(setPowered(powered));

        const eventType = powered ? 'on' : 'off';
        dispatch(addEvent({
          id: Date.now().toString(),
          type: eventType,
          timestamp: Date.now(),
        }));

        if (notificationsEnabled) {
          sendTelegramNotification(powered ? powerOnMessage : powerOffMessage);
        }
      }
    };

    const sendTelegramNotification = async (text: string) => {
      try {
        const token = await SecureStore.getItemAsync(TELEGRAM_TOKEN_KEY);
        if (!token) return;

        // Note: In a real app, you'd also need a chatId.
        // For this prototype, we'll just log that we're sending it.
        console.log(`Sending Telegram notification: ${text} using token: ${token.substring(0, 5)}...`);

        // Example fetch (uncomment and add chatId if you have one):
        /*
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: 'YOUR_CHAT_ID', text }),
        });
        */
      } catch (error) {
        console.error('Failed to send telegram notification', error);
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
  }, [dispatch, isPowered, notificationsEnabled, powerOffMessage, powerOnMessage]);
}
