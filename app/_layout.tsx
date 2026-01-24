import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Stack } from 'expo-router';
import { store, persistor } from '../store';
import '../i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import i18n from '../i18n';
import { useBatteryMonitor } from '../hooks/useBatteryMonitor';

function AppContent() {
    const language = useSelector((state: RootState) => state.settings.language);
    useBatteryMonitor();

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
