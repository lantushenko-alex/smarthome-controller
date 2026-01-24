import React from 'react';
import { StyleSheet, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { setNotificationsEnabled } from '@/store/settingsSlice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isPowered = useSelector((state: RootState) => state.status.isPowered);
    const notificationsEnabled = useSelector((state: RootState) => state.settings.notificationsEnabled);

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.statusContainer}>
                <IconSymbol
                    size={100}
                    name={isPowered ? 'bolt.fill' : 'bolt.slash.fill'}
                    color={isPowered ? '#4CAF50' : '#F44336'}
                />
                <ThemedText type="subtitle" style={styles.statusLabel}>
                    {t('home.status')}
                </ThemedText>
                <ThemedText type="title" style={[styles.statusValue, { color: isPowered ? '#4CAF50' : '#F44336' }]}>
                    {isPowered ? t('home.powered') : t('home.notPowered')}
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.row}>
                <ThemedText type="defaultSemiBold">{t('home.notifications')}</ThemedText>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={value => {
                        dispatch(setNotificationsEnabled(value));
                    }}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusLabel: {
        marginTop: 20,
        opacity: 0.7,
    },
    statusValue: {
        marginTop: 10,
        fontSize: 32,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ccc',
    },
});
