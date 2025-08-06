import mongoose, {
    Schema,
    HydratedDocument,
    Model,
} from 'mongoose';
import { History } from './history.model';

export interface IBudgetFields {
    channelId: number;
    mainBudget: number;
}

export interface IBudgetMethods {
    subtractMainBudget(value: number): number;
    addMainBudget(value: number): number;
}

export type BudgetDocument = HydratedDocument<IBudgetFields, IBudgetMethods>;

const BudgetSchema = new Schema<IBudgetFields, Model<HydratedDocument<IBudgetFields, IBudgetMethods>>, IBudgetMethods>({
    channelId: { type: Number, required: true },
    mainBudget: { type: Number, required: true },
});

BudgetSchema.methods.subtractMainBudget = function (
    this: BudgetDocument,
    value: number
): number {
    this.mainBudget -= Math.abs(value);
    if (this.mainBudget < 0) {
        this.mainBudget = 0;
    }
    return this.mainBudget;
};

BudgetSchema.methods.addMainBudget = function (
    this: BudgetDocument,
    value: number
): number {
    this.mainBudget += value;
    return this.mainBudget;
};

export const Budget = mongoose.model('Budget', BudgetSchema);
