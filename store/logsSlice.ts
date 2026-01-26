import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MESSAGES_TO_KEEP } from '@/store/settingsSlice';

export interface PowerEvent {
    id: string;
    type: 'off' | 'on' | 'error';
    timestamp: number;
    message?: string;
}

interface LogsState {
    events: PowerEvent[];
}

const initialState: LogsState = {
    events: [],
};

const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<PowerEvent>) => {
            state.events.unshift(action.payload);
            if (state.events.length > MESSAGES_TO_KEEP) {
                state.events = state.events.slice(0, 100);
            }
        },
    },
});

export const { addEvent } = logsSlice.actions;

export default logsSlice.reducer;
