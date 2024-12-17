"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReference = generateReference;
function generateReference() {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
//# sourceMappingURL=tranx.js.map