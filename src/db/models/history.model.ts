import mongoose, {
    Schema,
    HydratedDocument,
    Model,
} from 'mongoose';

export interface IHistoryFields {
    channelId: number,
    createdAt?: Date,
    modifiedType?: string,
    currentBudget: number;
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
