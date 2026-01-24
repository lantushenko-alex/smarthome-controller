import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PowerEvent {
    id: string;
    type: 'off' | 'on';
    timestamp: number;
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
        },
        clearLogs: state => {
            state.events = [];
        },
    },
});

export const { addEvent, clearLogs } = logsSlice.actions;

export default logsSlice.reducer;
