import * as SecureStore from 'expo-secure-store';

// SecureStore keys must be non-empty and contain only [A-Za-z0-9._-].
// redux-persist commonly uses keys like "persist:secure" (":" is invalid), so we map them.
const toSecureStoreKey = (key: string): string => {
    const trimmed = key.trim();
    if (!trimmed) {
        return '__empty__';
    }

    // Replace any disallowed character (including ":") with "_"
    return trimmed.replace(/[^A-Za-z0-9._-]/g, '_');
};

const secureStorage = {
    getItem: (key: string): Promise<string | null> => {
        return SecureStore.getItemAsync(toSecureStoreKey(key));
    },
    setItem: (key: string, value: string): Promise<void> => {
        const mappedKey = toSecureStoreKey(key);
        return SecureStore.setItemAsync(mappedKey, value);
    },
    removeItem: (key: string): Promise<void> => {
        return SecureStore.deleteItemAsync(toSecureStoreKey(key));
    },
};

export default secureStorage;
