import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LogsScreen() {
    const { t } = useTranslation();
    const events = useSelector((state: RootState) => state.logs.events);

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ThemedView style={styles.eventItem}>
                        <IconSymbol
                            name={
                                item.type === 'off'
                                    ? 'bolt.slash.fill'
                                    : item.type === 'on'
                                    ? 'bolt.fill'
                                    : 'exclamationmark.triangle.fill'
                            }
                            size={24}
                            color={
                                item.type === 'off'
                                    ? '#F44336'
                                    : item.type === 'on'
                                    ? '#4CAF50'
                                    : '#FF9800'
                            }
                        />
                        <ThemedView style={styles.eventDetails}>
                            <ThemedText type="defaultSemiBold">
                                {item.type === 'off'
                                    ? t('logs.powerOff')
                                    : item.type === 'on'
                                    ? t('logs.powerOn')
                                    : t('logs.error')}
                            </ThemedText>
                            {item.message && (
                                <ThemedText style={styles.message}>
                                    {item.message}
                                </ThemedText>
                            )}
                            <ThemedText style={styles.timestamp}>
                                {new Date(item.timestamp).toLocaleString()}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>
                )}
                ListEmptyComponent={
                    <ThemedView style={styles.emptyContainer}>
                        <ThemedText>{t('logs.empty')}</ThemedText>
                    </ThemedView>
                }
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    eventDetails: {
        marginLeft: 15,
    },
    timestamp: {
        fontSize: 12,
        opacity: 0.6,
    },
    message: {
        fontSize: 14,
        marginTop: 2,
        opacity: 0.8,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
});
