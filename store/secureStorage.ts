import * as SecureStore from 'expo-secure-store';

const secureStorage = {
    getItem: (key: string): Promise<string | null> => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string): Promise<void> => {
        return SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string): Promise<void> => {
        return SecureStore.deleteItemAsync(key);
    },
};

export default secureStorage;
