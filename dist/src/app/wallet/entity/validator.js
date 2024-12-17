"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Withdrawal = exports.TransferFund = exports.FundWallet = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FundWallet {
}
exports.FundWallet = FundWallet;
__decorate([
    (0, class_validator_1.IsCurrency)(),
    __metadata("design:type", Number)
], FundWallet.prototype, "amount", void 0);
class TransferFund {
    constructor() {
        this.currency = "NGN";
    }
}
exports.TransferFund = TransferFund;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], TransferFund.prototype, "recipient", void 0);
__decorate([
    (0, class_validator_1.IsCurrency)(),
    __metadata("design:type", Number)
], TransferFund.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransferFund.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransferFund.prototype, "description", void 0);
class BankDetails {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BankDetails.prototype, "bankCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BankDetails.prototype, "bankName", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", String)
], BankDetails.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BankDetails.prototype, "accountName", void 0);
class Withdrawal {
    constructor() {
        this.currency = "NGN";
    }
}
exports.Withdrawal = Withdrawal;
__decorate([
    (0, class_validator_1.IsCurrency)(),
    __metadata("design:type", Number)
], Withdrawal.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Withdrawal.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Withdrawal.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BankDetails),
    __metadata("design:type", Object)
], Withdrawal.prototype, "bankDetails", void 0);
//# sourceMappingURL=validator.js.map