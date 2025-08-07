import {IHistoryFields, History} from "../../models/history.model";

export async function createHistory(data: IHistoryFields) {
    const history = new History(data);
    return history.save();
}