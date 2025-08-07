import {getHistoryForPeriod} from "./getHistoryForPeriod";


export async function getHistoryForLastMonth(channelId: number) {
    const currentDate = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(currentDate.getMonth() - 1);

    return getHistoryForPeriod({
        channelId,
        from: lastMonth,
        to: currentDate,
    });
}