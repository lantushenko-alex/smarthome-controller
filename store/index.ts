import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import settingsReducer from './settingsSlice';
import logsReducer from './logsSlice';
import statusReducer from './statusSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings', 'logs'], // status should not be persisted as it depends on current battery state
};

const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage,
    blacklist: ['telegramKey'], //telegram key should be stored in secure storage only
};

const rootReducer = combineReducers({
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    logs: logsReducer,
    status: statusReducer,
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
