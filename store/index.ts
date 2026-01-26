import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import settingsReducer from './settingsSlice';
import logsReducer from './logsSlice';
import statusReducer from './statusSlice';
import secureReducer from './secureSlice';
import secureStorage from './secureStorage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings', 'logs'], // status should not be persisted as it depends on current battery state
};

const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage,
};

const securePersistConfig = {
    key: 'secure',
    storage: secureStorage,
};

const rootReducer = combineReducers({
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    logs: logsReducer,
    status: statusReducer,
    secure: persistReducer(securePersistConfig, secureReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
