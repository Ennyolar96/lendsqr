"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeSensitiveFields = void 0;
const sanitizeSensitiveFields = (data) => {
    const removePassword = (record) => {
        if (record && typeof record === "object" && "password" in record) {
            const { password, ...rest } = record;
            return rest;
        }
        return record;
    };
    if (Array.isArray(data)) {
        return data.map(removePassword);
    }
    return removePassword(data);
};
exports.sanitizeSensitiveFields = sanitizeSensitiveFields;
//# sourceMappingURL=removePassword.js.map