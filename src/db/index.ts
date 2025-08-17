import mongoose from "mongoose";

export async function main() {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/telegramBotBudget";

    await mongoose.connect(mongoUri, {
        authSource: "admin"
    });
}
