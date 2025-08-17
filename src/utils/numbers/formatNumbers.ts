export function getFormatedPriceNumber(number: number, locale = 'ru-RU') {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(number);
}