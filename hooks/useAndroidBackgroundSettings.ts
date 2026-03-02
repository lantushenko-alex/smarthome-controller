import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addEvent } from '@/store/logsSlice';
import { AppDispatch } from '@/store';

const ANDROID_BATTERY_SETTINGS_KEY = 'hasPromptedAndroidBatterySettings';

/**
 * This hook prompts the user to disable battery optimizations for the app on Android.
 * This is necessary to ensure the app can reliably detect power changes and send notifications
 * while running in the background, as Android's battery saving features might otherwise
 * kill the background task or restrict its network access.
 *
 * It shows an alert only once (tracked via AsyncStorage) and only on Android devices.
 */
export function useAndroidBackgroundSettings() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (Platform.OS !== 'android') {
            return;
        }

        const checkSettings = async () => {
            try {
                const hasPrompted = await AsyncStorage.getItem(ANDROID_BATTERY_SETTINGS_KEY);
                if (hasPrompted) {
                    return;
                }

                Alert.alert(
                    t('backgroundSettings.title'),
                    t('backgroundSettings.message'),
                    [
                        {
                            text: t('backgroundSettings.openSettings'),
                            onPress: async () => {
                                await Linking.openSettings();
                                await AsyncStorage.setItem(ANDROID_BATTERY_SETTINGS_KEY, 'true');
                            },
                        },
                        {
                            text: t('backgroundSettings.later'),
                            style: 'cancel',
                        },
                    ]
                );
            } catch (error) {
                dispatch(
                    addEvent({
                        id: Date.now().toString(),
                        type: 'error',
                        timestamp: Date.now(),
                        message: `Failed to check background settings: ${error instanceof Error ? error.message : String(error)}`,
                    })
                );
            }
        };

        checkSettings();
    }, [t, dispatch]);
}
