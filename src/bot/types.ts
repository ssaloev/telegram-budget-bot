export const ACTION_TYPES = {
    ADD_BUDGET: 'ADD_BUDGET',
    SUBTRACT_BUDGET: 'SUBTRACT_BUDGET',
} as const;
export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

export interface ActionChannelData {
    value: number;
    actionType: ActionType;
    modifiedType: string;
}