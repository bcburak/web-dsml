"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: 'Name is required' }),
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Invalid email'),
        password: (0, zod_1.string)({ required_error: 'Password is required' })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: (0, zod_1.string)({ required_error: 'Please confirm your password' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
});
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: 'Email is required' }).email('Invalid email or password'),
        password: (0, zod_1.string)({ required_error: 'Password is required' }).min(8, 'Invalid email or password'),
    }),
});
//# sourceMappingURL=user.schema.js.map