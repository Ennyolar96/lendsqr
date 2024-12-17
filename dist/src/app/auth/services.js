"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const argon = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../global/database");
class AuthService {
    async CreateNewUser(data) {
        try {
            const existingUser = await (0, database_1.db)(database_1.model.user)
                .where({ email: data.email })
                .first();
            if (existingUser) {
                throw new Error("email already in use");
            }
            const hashedPassword = await this.hashPassword(data.password);
            const username = data.email.split("@")[0];
            const result = await database_1.db.transaction(async (trx) => {
                const user = await trx(database_1.model.user)
                    .insert({
                    ...data,
                    username,
                    password: hashedPassword,
                })
                    .then(() => trx(database_1.model.user).where({ username }).first());
                await trx(database_1.model.wallet).insert({
                    user: user.id,
                    balance: 0,
                    currency: "NGN",
                });
                delete user.password;
                return user;
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async login(data) {
        try {
            const user = await (0, database_1.db)(database_1.model.user).where({ email: data.email }).first();
            if (!user) {
                throw new Error("incorrect credential or user not found");
            }
            const isPasswordValid = await argon.verify(user.password, data.password);
            if (!isPasswordValid) {
                throw new Error("Incorrect password! try again");
            }
            const token_details = {
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
        }
        catch (error) {
            throw error;
        }
    }
    async hashPassword(password) {
        return argon.hash(password);
    }
    async assignToken(user) {
        return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=services.js.map