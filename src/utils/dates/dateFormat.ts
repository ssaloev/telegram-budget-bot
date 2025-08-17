export function getDayMonthYear(date: Date, locale = 'ru-RU') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date);
}