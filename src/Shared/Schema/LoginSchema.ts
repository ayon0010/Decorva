import z from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string().min(8, "Repeat Password must be at least 8 characters long")
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],  //It sets the error on repeatPassword field
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(8, "Current Password must be at least 8 characters long"),
    newPassword: z.string().min(8, "New Password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(8, "Confirm New Password must be at least 8 characters long"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});