import { AuthUser, signIn, signUp } from "./entity";
import * as argon from "argon2";
import { IUser } from "../user/entity";
import jwt from "jsonwebtoken";
import { db, model } from "@/global/database";
import { Fetcher } from "@/global/helper";

export class AuthService {
  public async CreateNewUser(data: signUp) {
    try {
      // unable to confirm if use is been mark under blacklist because that is no access to the authentication token
      // const fetchPost = Fetcher("post", process.env.ADJUTOR_API);
      // const apiResponse = await fetchPost(
      //   `https://adjutor.lendsqr.com/v2/verification/karma/${data.email}`
      // );

      // if (apiResponse.status === "success") {
      //   throw new Error("Account marks un blacklist");
      // }

      const existingUser = await db(model.user)
        .where({ email: data.email })
        .first();

      if (existingUser) {
        throw new Error("email already in use");
      }

      const hashedPassword = await this.hashPassword(data.password);
      const username = data.email.split("@")[0];

      const result = await db.transaction(async (trx) => {
        const user = await trx(model.user)
          .insert({
            ...data,
            username,
            password: hashedPassword,
          })
          .then(() => trx(model.user).where({ username }).first());

        await trx(model.wallet).insert({
          user: user.id,
          balance: 0,
          currency: "NGN",
        });

        delete user.password;
        return user;
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async login(data: signIn): Promise<IUser> {
    try {
      const user = await db(model.user).where({ email: data.email }).first();

      if (!user) {
        throw new Error("incorrect credential or user not found");
      }

      const isPasswordValid = await argon.verify(user.password, data.password);

      if (!isPasswordValid) {
        throw new Error("Incorrect password! try again");
      }

      const token_details: AuthUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };

      const token = await this.assignToken(token_details);
      delete user.password;
      return {
        ...user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return argon.hash(password);
  }

  private async assignToken(user: AuthUser) {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
  }
}
