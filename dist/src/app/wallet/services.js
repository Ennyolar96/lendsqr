"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletServices = void 0;
const database_1 = require("../../global/database");
const entity_1 = require("../transaction/entity");
const services_1 = require("../transaction/services");
const helper_1 = require("../../global/helper");
const transServices = new services_1.TransactionServices();
class WalletServices {
    async fundWallet(data, user) {
        try {
            const wallet = await (0, database_1.db)(database_1.model.wallet).where({ user: user.id }).first();
            await database_1.db.transaction(async (trx) => {
                await trx(database_1.model.transaction).insert({
                    wallet: wallet.id,
                    amount: data.amount,
                    transactionType: entity_1.Method.fund,
                    reference: (0, helper_1.generateReference)(),
                    status: entity_1.PaymentStatus.PENDING,
                    metadata: { payment_method: "Wallet funding" },
                });
                await trx(database_1.model.wallet)
                    .where({ id: wallet.id })
                    .increment("balance", data.amount);
            });
            return { message: "Funding successful" };
        }
        catch (error) {
            throw error;
        }
    }
    async withdrawalFund(data, user) {
        try {
            const wallet = await (0, database_1.db)(database_1.model.wallet).where({ user: user.id }).first();
            if (wallet.balance < data.amount) {
                throw new Error("Insufficient balance");
            }
            await database_1.db.transaction(async (trx) => {
                await trx(database_1.model.wallet)
                    .where({ id: wallet.id })
                    .decrement("balance", data.amount);
                await trx(database_1.model.transaction).insert({
                    wallet_id: wallet.id,
                    amount: -data.amount,
                    transactionType: entity_1.Method.withdrawal,
                    reference: (0, helper_1.generateReference)(),
                    status: entity_1.PaymentStatus.PENDING,
                    metadata: { bankDetails: data.bankDetails },
                });
            });
            return { message: "Withdrawal successful" };
        }
        catch (error) {
            throw error;
        }
    }
    async userBalance(user) {
        try {
            const userWallet = await (0, database_1.db)(database_1.model.wallet)
                .where({ user: user.id })
                .first()
                .orderBy("updatedAt", "desc");
            if (!userWallet) {
                throw new Error("User wallet not found");
            }
            return userWallet.balance;
        }
        catch (error) {
            throw error;
        }
    }
    async transferFund(data, user) {
        try {
            const senderWallet = await (0, database_1.db)(database_1.model.wallet)
                .where({ user: user.id })
                .first();
            if (senderWallet.balance < data.amount) {
                throw new Error("Insufficient balance");
            }
            const recipient = await (0, database_1.db)(database_1.model.user)
                .where({ id: data.recipient })
                .first();
            if (!recipient) {
                throw new Error("Recipient not found");
            }
            const recipientWallet = await (0, database_1.db)(database_1.model.wallet)
                .where({ user: recipient.id })
                .first();
            await database_1.db.transaction(async (trx) => {
                await trx(database_1.model.wallet)
                    .where({ id: senderWallet.id })
                    .decrement("balance", data.amount);
                await trx(database_1.model.wallet)
                    .where({ id: recipientWallet.id })
                    .increment("balance", data.amount);
                const reference = (0, helper_1.generateReference)();
                await trx(database_1.model.transaction).insert([
                    {
                        wallet: senderWallet.id,
                        amount: -data.amount,
                        transactionType: entity_1.Method.transfer,
                        reference: `${reference}-debit`,
                        status: entity_1.PaymentStatus.SUCCESS,
                        metadata: { recipient: data.recipient, note: data.description },
                    },
                    {
                        wallet: recipientWallet.id,
                        amount: data.amount,
                        transactionType: entity_1.Method.transfer,
                        reference: `${reference}-credit`,
                        status: entity_1.PaymentStatus.SUCCESS,
                        metadata: { sender: user.email, note: data.description },
                    },
                ]);
            });
            return senderWallet;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.WalletServices = WalletServices;
//# sourceMappingURL=services.js.map