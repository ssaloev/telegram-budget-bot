import mongoose, { Schema, Document } from 'mongoose';
import { History } from './history.model';

export interface IBudgetFields {
    channelId: number;
    mainBudget: number;
}

export interface IBudget extends Document, IBudgetFields {}

const BudgetSchema = new Schema<IBudget>({
    channelId: { type: Number, required: true },
    mainBudget: { type: Number, required: true },
});

BudgetSchema.methods.subtractMainBudget = function subtractMainBudget(value: number) {
    this.mainBudget -= Math.abs(value);
    if (this.mainBudget < 0) {
        this.mainBudget = 0;
    }
    console.log(this.mainBudget);
    return this.mainBudget;
}

BudgetSchema.methods.addMainBudget = function subtractMainBudget(value: number) {
    this.mainBudget += value;
    return this.mainBudget;
}

// @todo
// budgetSchema.pre('save', async function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }
//
//     const original = await this.constructor.findById(this._id).lean();
//     const modifiedFields = {};
//
//     for (const key in this._doc) {
//         if (this.isModified(key)) {
//             modifiedFields[key] = this[key];
//         }
//     }
//
//     if (Object.keys(modifiedFields).length > 0) {
//         await History.create({
//             // @todo
//         });
//     }
//     next();
// });

export const Budget = mongoose.model('Budget', BudgetSchema);