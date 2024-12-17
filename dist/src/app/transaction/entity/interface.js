"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["SUCCESS"] = "successful";
    PaymentStatus["PROCESSING"] = "processing";
    PaymentStatus["REFUNDED"] = "refunded";
    PaymentStatus["REVERSED"] = "reversed";
    PaymentStatus["REJECTED"] = "rejected";
    PaymentStatus["REJECTED_BY_SYSTEM"] = "rejected_by_system";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var Method;
(function (Method) {
    Method["withdrawal"] = "Withdrawal";
    Method["transfer"] = "Transfer";
    Method["deposit"] = "Deposit";
    Method["fund"] = "Fund";
})(Method || (exports.Method = Method = {}));
//# sourceMappingURL=interface.js.map