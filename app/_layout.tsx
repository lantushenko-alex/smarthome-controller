import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Stack } from 'expo-router';
import { store, persistor, RootState } from '../store';
import i18n from '../i18n';
import { useBatteryMonitor } from '../hooks/useBatteryMonitor';
import { registerBackgroundBatteryTask } from '../hooks/useBackgroundBatteryTask';

function AppContent() {
    const language = useSelector((state: RootState) => state.settings.language);
    useBatteryMonitor();

    useEffect(() => {
        registerBackgroundBatteryTask().catch(err => console.error('Failed to register background task', err));
    }, []);

    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppContent />
            </PersistGate>
        </Provider>
    );
}
