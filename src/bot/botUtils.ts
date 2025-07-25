const amountRegex = '-?\\d+';
const categoryRegex = '[\\p{L}\\p{N}_]+\\s*';
const fullPattern = `^(${amountRegex})\\/(${categoryRegex})$`;
export function isActionAct(text) {
    return new RegExp(fullPattern, 'iu').test(text);
}

export function replyWhenMessageInWrongFormat(): string {
    return `Не правильный ввод данных ‼️
Пожалуйста введите данные в формате: 

+СУММА/категория 
или
-СУММА/категория

Примеры: 
500/зарплата
-100/Обед

================

Воридкунии нодурусти маълумот‼️
Барои ворид кардани маълумот дуруст, формати зеринро истифода баред:

+МАБЛАҒ/категория
екин
-МАБЛАҒ/категория 

Намунаҳо:
500/маош
-100/рахпули
    `;
}