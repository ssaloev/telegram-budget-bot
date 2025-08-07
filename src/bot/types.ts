export const ACTION_TYPES = {
    ADD_BUDGET: 'ADD_BUDGET',
    SUBTRACT_BUDGET: 'SUBTRACT_BUDGET',
} as const;
export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

export const COMMAND_TYPES = {
    SHOW_BUDGET: 'SHOW_BUDGET',
    SHOW_HISTORY: 'SHOW_HISTORY',
}

export type CommandType = typeof COMMAND_TYPES[keyof typeof COMMAND_TYPES];

export interface ActionChannelData {
    value: number;
    actionType: ActionType;
    modifiedType: string;
}