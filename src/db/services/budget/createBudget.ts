import {Budget, IBudgetFields} from "../../models/budget.model";

export async function createBudget(data: IBudgetFields) {
    const newBudget = new Budget(data);
    return newBudget.save();
}

