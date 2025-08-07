import {Budget, IBudgetFields} from "../../models/budget.model";
import {createHistory} from "../history";

export async function createBudget(data: IBudgetFields) {
    const newBudget = new Budget(data);

    await createHistory({
        channelId: data.channelId,
        currentBudget: data.mainBudget,
    })

    return newBudget.save();
}

