import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    documentId: mongoose.Schema.Types.ObjectId,
    collectionName: String,
    currentData: Object,
    previousData: Object,
    modifiedAt: { type: Date, default: Date.now },
    modifiedType: String,
});

export const History = mongoose.model('History', historySchema);

