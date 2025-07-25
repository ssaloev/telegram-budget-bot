export function logInfo(...params: Array<unknown>) {
    console.info('[BUDGET BOT] ', ...params);
}

export function logError(...params: Array<unknown>) {
    console.error('[BUDGET BOT] ERROR ', ...params);
}