import { z } from 'zod';

const authValidationSchema = z.object({
    name: z.string({
        required_error: "Name must be provided and must be a string",
    }).min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),

    email: z.string({
        required_error: "Email must be provided and must be a string",
    }).email("Email must be valid"),

    password: z.string({
        required_error: "Password must be provided and must be a string",
    }).min(6, "Password must be at least 6 characters"), 

    role: z.enum(["admin", "user"], {
        required_error: "Role must be either 'admin' or 'user'",
    }).default("user").optional(),

    isBlocked: z.boolean({
        required_error: "isBlocked flag must be provided",
    }).default(false).optional(),

});
const loginValidationSchema = z.object({

    email: z.string({
        required_error: "Email must be provided and must be a string",
    }).email("Email must be valid"),

    password: z.string({
        required_error: "Password must be provided and must be a string",
    }).min(6, "Password must be at least 6 characters"), 


});

export const authValidation = {
    authValidationSchema,
    loginValidationSchema
};
