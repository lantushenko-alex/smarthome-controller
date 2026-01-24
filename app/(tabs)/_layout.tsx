import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('home.title'),
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="logs"
                options={{
                    title: t('logs.title'),
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('settings.title'),
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}
