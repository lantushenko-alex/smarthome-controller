import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '@/store';
import { setPowerOffMessage, setPowerOnMessage, setLanguage, setTelegramChatId } from '@/store/settingsSlice';
import { setTelegramKey } from '@/store/secureSlice';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SettingsScreen() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);
    const telegramKey = useSelector((state: RootState) => state.secure.telegramKey);

    const changeTelegramKey = (val: string) => {
        dispatch(setTelegramKey(val));
    };

    const changeLanguage = (lang: 'en' | 'ru') => {
        dispatch(setLanguage(lang));
        i18n.changeLanguage(lang);
    };

    const openLauncherChooser = () => {
        if (Platform.OS === 'android') {
            // ACTION_MAIN + CATEGORY_HOME with no component forces the chooser dialog
            Linking.sendIntent('android.intent.action.MAIN', [
                { key: 'category', value: 'android.intent.category.HOME' },
            ]).catch(() => {
                // Fallback: open Android home settings where the user can change the default app
                Linking.openSettings();
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">{t('settings.telegramToken')}</ThemedText>
                <TextInput
                    style={styles.input}
                    value={telegramKey}
                    onChangeText={changeTelegramKey}
                    placeholder={t('settings.telegramTokenPlaceholder')}
                    secureTextEntry
                />
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">{t('settings.telegramChatId')}</ThemedText>
                <TextInput
                    style={styles.input}
                    value={settings.telegramChatId}
                    onChangeText={val => dispatch(setTelegramChatId(val))}
                    placeholder={t('settings.telegramChatIdPlaceholder')}
                />
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">{t('settings.powerOffMsg')}</ThemedText>
                <TextInput
                    style={styles.input}
                    value={settings.powerOffMessage}
                    onChangeText={val => dispatch(setPowerOffMessage(val))}
                />
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">{t('settings.powerOnMsg')}</ThemedText>
                <TextInput
                    style={styles.input}
                    value={settings.powerOnMessage}
                    onChangeText={val => dispatch(setPowerOnMessage(val))}
                />
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="defaultSemiBold">{t('settings.language')}</ThemedText>
                <ThemedView style={styles.languageRow}>
                    <TouchableOpacity
                        style={[styles.langButton, settings.language === 'en' && styles.activeLang]}
                        onPress={() => changeLanguage('en')}
                    >
                        <ThemedText>EN</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.langButton, settings.language === 'ru' && styles.activeLang]}
                        onPress={() => changeLanguage('ru')}
                    >
                        <ThemedText>RU</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>

            {Platform.OS === 'android' && (
                <ThemedView style={styles.section}>
                    <ThemedText type="defaultSemiBold">{t('settings.launcher')}</ThemedText>
                    <ThemedText style={styles.launcherDesc}>{t('settings.changeLauncherDesc')}</ThemedText>
                    <TouchableOpacity style={styles.launcherButton} onPress={openLauncherChooser}>
                        <IconSymbol name="gearshape.fill" size={18} color="#fff" style={styles.launcherIcon} />
                        <ThemedText style={styles.launcherButtonText}>{t('settings.changeLauncher')}</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
        color: 'inherit',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 25,
    },
    languageRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    langButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 10,
        minWidth: 50,
        alignItems: 'center',
    },
    activeLang: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    launcherDesc: {
        marginTop: 6,
        marginBottom: 10,
        opacity: 0.7,
        fontSize: 13,
    },
    launcherButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
    },
    launcherIcon: {
        marginRight: 8,
    },
    launcherButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
