import mongoose, { Schema, Document } from 'mongoose';
import { History } from './history.model';


export interface IBudget extends Document {
    channelId: number;
    mainBudget: number;
    additionalBudget: number;
}

const BudgetSchema = new Schema<IBudget>({
    channelId: { type: Number, required: true },
    mainBudget: { type: Number, required: true },
    additionalBudget: { type: Number, required: true },
});

BudgetSchema.methods.getFullBudget = function getFullBudget() {
    return this.mainBudget + this.additionalBudget;
}

BudgetSchema.methods.subtractMainBudget = function subtractMainBudget(value: number) {
    this.mainBudget = subtract(this.mainBudget, value);
    return this.mainBudget;
}

BudgetSchema.methods.subtractAdditionalBudget = function subtractAdditionalBudget(value: number) {
    this.additionalBudget = subtract(this.additionalBudget, value);
    return this.additionalBudget;
}

function subtract(from: number, value: number) {
    from -= value;
    if (from < 0) {
        from = 0;
    }

    return from;

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