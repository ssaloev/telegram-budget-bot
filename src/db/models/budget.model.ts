import mongoose, {
    Schema,
    HydratedDocument,
    Model,
} from 'mongoose';

export interface IBudgetFields {
    channelId: number;
    mainBudget: number;
}

export interface IBudgetMethods {
    subtractMainBudget(value: number, modifiedType: string): number;
    addMainBudget(value: number, modifiedType: string): number;
}

export type BudgetDocument = HydratedDocument<IBudgetFields, IBudgetMethods>;

const BudgetSchema = new Schema<IBudgetFields, Model<HydratedDocument<IBudgetFields, IBudgetMethods>>, IBudgetMethods>({
    channelId: { type: Number, required: true },
    mainBudget: { type: Number, required: true },
});

BudgetSchema.methods.subtractMainBudget = function (
    this: BudgetDocument,
    value: number,
    modifiedType: String,
): number {
    this.mainBudget -= Math.abs(value);
    if (this.mainBudget < 0) {
        this.mainBudget = 0;
    }
    return this.mainBudget;
};

BudgetSchema.methods.addMainBudget = function (
    this: BudgetDocument,
    value: number,
    modifiedType: String,
): number {

    const oldBudget = this.mainBudget;

    this.mainBudget += value;

    return this.mainBudget;
};

export const Budget = mongoose.model('Budget', BudgetSchema);
