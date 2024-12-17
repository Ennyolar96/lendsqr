import { db, model } from "@/global/database";
import { AuthUser } from "../auth/entity";
import { Method, PaymentStatus } from "../transaction/entity";
import { TransactionServices } from "../transaction/services";
import { fundWallet, transferFund, withdraw } from "./entity";
import { generateReference } from "@/global/helper";

const transServices = new TransactionServices();
export class WalletServices {
  public async fundWallet(data: fundWallet, user: AuthUser) {
    try {
      const wallet = await db(model.wallet).where({ user: user.id }).first();

      await db.transaction(async (trx) => {
        await trx(model.transaction).insert({
          wallet: wallet.id,
          amount: data.amount,
          transactionType: Method.fund,
          reference: generateReference(),
          status: PaymentStatus.PENDING,
          metadata: { payment_method: "Wallet funding" },
        });

        await trx(model.wallet)
          .where({ id: wallet.id })
          .increment("balance", data.amount);
      });

      return { message: "Funding successful" };
    } catch (error) {
      throw error;
    }
  }

  public async withdrawalFund(data: withdraw, user: AuthUser) {
    try {
      const wallet = await db(model.wallet).where({ user: user.id }).first();

      if (wallet.balance < data.amount) {
        throw new Error("Insufficient balance");
      }

      await db.transaction(async (trx) => {
        await trx(model.wallet)
          .where({ id: wallet.id })
          .decrement("balance", data.amount);

        await trx(model.transaction).insert({
          wallet_id: wallet.id,
          amount: -data.amount,
          transactionType: Method.withdrawal,
          reference: generateReference(),
          status: PaymentStatus.PENDING,
          metadata: { bankDetails: data.bankDetails },
        });
      });

      return { message: "Withdrawal successful" };
    } catch (error) {
      throw error;
    }
  }

  public async userBalance(user: AuthUser) {
    try {
      const userWallet = await db(model.wallet)
        .where({ user: user.id })
        .first()
        .orderBy("updatedAt", "desc");

      if (!userWallet) {
        throw new Error("User wallet not found");
      }

      return userWallet.balance;
    } catch (error) {
      throw error;
    }
  }

  public async transferFund(data: transferFund, user: AuthUser): Promise<void> {
    try {
      const senderWallet = await db(model.wallet)
        .where({ user: user.id })
        .first();

      if (senderWallet.balance < data.amount) {
        throw new Error("Insufficient balance");
      }

      const recipient = await db(model.user)
        .where({ id: data.recipient })
        .first();

      if (!recipient) {
        throw new Error("Recipient not found");
      }

      const recipientWallet = await db(model.wallet)
        .where({ user: recipient.id })
        .first();

      await db.transaction(async (trx) => {
        await trx(model.wallet)
          .where({ id: senderWallet.id })
          .decrement("balance", data.amount);

        await trx(model.wallet)
          .where({ id: recipientWallet.id })
          .increment("balance", data.amount);

        const reference = generateReference();
        await trx(model.transaction).insert([
          {
            wallet: senderWallet.id,
            amount: -data.amount,
            transactionType: Method.transfer,
            reference: `${reference}-debit`,
            status: PaymentStatus.SUCCESS,
            metadata: { recipient: data.recipient, note: data.description },
          },
          {
            wallet: recipientWallet.id,
            amount: data.amount,
            transactionType: Method.transfer,
            reference: `${reference}-credit`,
            status: PaymentStatus.SUCCESS,
            metadata: { sender: user.email, note: data.description },
          },
        ]);
      });
      return senderWallet;
    } catch (error) {
      throw error;
    }
  }
}
