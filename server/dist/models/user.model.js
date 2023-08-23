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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let User = class User {
    // Instance method to check if passwords match
    comparePasswords(hashedPassword, candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(candidatePassword, hashedPassword);
        });
    }
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, minlength: 8, maxLength: 32, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'default.png' }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'local' }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
User = __decorate([
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.pre)('save', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash password if the password is new or was updated
            if (!this.isModified('password'))
                return;
            // Hash password with costFactor of 12
            this.password = yield bcryptjs_1.default.hash(this.password, 12);
        });
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
        },
    })
    // Export the User class to be used as TypeScript type
], User);
exports.User = User;
// Create the user model from the User class
const userModel = (0, typegoose_1.getModelForClass)(User);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map