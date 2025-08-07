import { History } from "../../models/history.model";
import {GetHistoryForPeriod} from "./types";

export async function getHistoryForPeriod(data: GetHistoryForPeriod) {
    const filter = {
        channelId: data.channelId,
        createdAt: {
            $gte: data.from,
            $lte: data.to,
        },
    }
    return History.find(filter).exec();
}