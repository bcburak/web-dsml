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
exports.UserProfile = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let UserProfile = class UserProfile {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "projectTree", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "designFileName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "designFileContent", void 0);
UserProfile = __decorate([
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            // Add createdAt and updatedAt fields
            timestamps: true,
        },
    })
    // Export the User class to be used as TypeScript type
], UserProfile);
exports.UserProfile = UserProfile;
// Create the user model from the User class
const userProfileModel = (0, typegoose_1.getModelForClass)(UserProfile);
exports.default = userProfileModel;
//# sourceMappingURL=userprofile.model.js.map