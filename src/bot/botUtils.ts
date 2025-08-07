import {ACTION_TYPES, COMMAND_TYPES} from "./types";
import type { ActionType, ActionChannelData, CommandType } from "./types";
import {logInfo} from "../utils/log";

const amountRegex = '-?\\d+';
const categoryRegex = '[\\p{L}\\p{N}_]+\\s*';
const fullPattern = `^(${amountRegex})\\/(${categoryRegex})$`;

export const locale = {
    handle: 'Обрабатываем/Коркард ⌛',
    handled: 'Обрабатали/Хисоб кардем ✅',
    yourBudget: 'БАЛАНС 💵: ',
    history: 'История 🗓️: ',
    trySubtractFromEmpty: 'Баланс 0',
    error: 'Ошибка/Хатоги шуд ❌',
    addedToChannel: 'Бот по подсчету вашего бюджета добавлен ✅',
};

export function isActionAct(text?: string) {
    if (!text) {
        return false;
    }
    return new RegExp(fullPattern, 'iu').test(text);
}

function getRegexpForCommands() {
    const keys = Object.keys(COMMAND_TYPES) as Array<keyof typeof COMMAND_TYPES>
    const allCommands = keys.reduce((acc, key, index, arr) => {
        const value = COMMAND_TYPES[key];

        if (index === arr.length - 1) {
            return acc + `${value}`
        }

        return `${acc}${value}|`
    }, '')

    return new RegExp(`^/${allCommands}$`, 'ig');

}

export function isCommandAct(text?: string) {
    if (!text) {
        return false;
    }
    return getRegexpForCommands().test(text);
}

export function getActionData(text: string): ActionChannelData {
    const matchAll = text.matchAll(new RegExp(fullPattern, 'iug'));
    const allMatchList = Array.from(matchAll);
    const matchList = allMatchList[0];
    return {
        value: +matchList[1],
        actionType: detectActionType(text),
        modifiedType: matchList[2],
    };
}

export function getCommand(text: string): CommandType {
   return text.replace('/', '').toUpperCase();
}

export function detectActionType(text: string): ActionType {
    return text[0] === '-' ? ACTION_TYPES.SUBTRACT_BUDGET : ACTION_TYPES.ADD_BUDGET;
}



export function replyWhenMessageInWrongFormat(): string {
    return `Не правильный ввод данных ‼️
Пожалуйста введите данные в формате: 

СУММА/категория 
или
-СУММА/категория

Примеры: 
500/зарплата
-100/Обед

================

Воридкунии нодурусти маълумот‼️
Барои ворид кардани маълумот дуруст, формати зеринро истифода баред:

МАБЛАҒ/категория
екин
-МАБЛАҒ/категория 

Намунаҳо:
500/маош
-100/рахпули
    `;
}