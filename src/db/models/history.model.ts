import mongoose, {
    Schema,
    HydratedDocument,
    Model,
} from 'mongoose';
import {logInfo} from "../../utils/log";

export interface IHistoryFields {
    channelId: Number,
    createdAt?: Date,
    modifiedType?: String,
    currentBudget: Number;
}

export interface IHistoryMethods {}

export type HistoryDocument = HydratedDocument<IHistoryFields, IHistoryMethods>;

const HistorySchema = new Schema<IHistoryFields, Model<HydratedDocument<IHistoryFields, IHistoryMethods>>, IHistoryMethods>({
    channelId: Number,
    createdAt: { type: Date, default: Date.now },
    modifiedType: {type: String, default: '', required: false},
    currentBudget: Number,
});

export const History = mongoose.model('History', HistorySchema);
