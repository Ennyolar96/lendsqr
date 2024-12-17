"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const Fetcher = (method, token) => {
    return async (uri, payload) => {
        try {
            const headers = token
                ? { Authorization: `Bearer ${token}` }
                : {};
            const response = await (0, axios_1.default)({
                method,
                url: uri,
                headers,
                ...(method === "get" || method === "delete"
                    ? { params: payload }
                    : { data: payload }),
            });
            return response.data;
        }
        catch (error) {
            throw error;
        }
    };
};
exports.Fetcher = Fetcher;
//# sourceMappingURL=fetcher.js.map