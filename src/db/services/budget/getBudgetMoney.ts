import {findBudgetByChannelId} from "./findBudgetByChannelId";

export async function getBudgetMoney(id: number) {
    const budget = await findBudgetByChannelId(id);
    if (budget) {
        return budget.mainBudget;
    }
}

