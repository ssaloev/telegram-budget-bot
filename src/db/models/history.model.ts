import mongoose, {
    Schema,
    HydratedDocument,
    Model,
} from 'mongoose';

export interface IHistoryFields {
    channelId: Number,
    collectionName: String,
    createdAt?: Date,
    modifiedType: String,
    actionType: String;
    budgetBefore: Number;
    budgetAfter: Number;
}

export interface IHistoryMethods {}

export type HistoryDocument = HydratedDocument<IHistoryFields, IHistoryMethods>;

const HistorySchema = new Schema<IHistoryFields, Model<HydratedDocument<IHistoryFields, IHistoryMethods>>, IHistoryMethods>({
    channelId: Number,
    collectionName: String,
    createdAt: { type: Date, default: Date.now },
    modifiedType: String,
    actionType: String,
    budgetBefore: Number,
    budgetAfter: Number,
});

export const History = mongoose.model('History', HistorySchema);
