import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/Shared/Schema/LoginSchema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { token, password, confirmPassword } = body;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired reset link." },
                { status: 400 }
            );
        }

        const validated = ResetPasswordSchema.safeParse({ password, confirmPassword });
        if (!validated.success) {
            const msg = validated.error.issues[0]?.message || "Invalid password";
            return NextResponse.json(
                { success: false, message: msg },
                { status: 400 }
            );
        }

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        }); if (!resetToken || resetToken.expiresAt < new Date()) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired reset link. Please request a new one." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(validated.data.password, 10);


        // basically a way to run multiple database operations as one single unit.
        // if any of the operations fail, the entire transaction will be rolled back.
        await prisma.$transaction([
            prisma.user.update({
                where: { id: resetToken.userId },
                data: { password: hashedPassword },
            }),
            prisma.passwordResetToken.delete({
                where: { id: resetToken.id },
            }),
        ]);

        return NextResponse.json({
            success: true,
            message: "Password has been reset successfully. You can now log in.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}