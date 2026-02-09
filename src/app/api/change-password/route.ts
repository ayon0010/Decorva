import { ChangePasswordSchema } from "@/Shared/Schema/LoginSchema";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();
        const { userId, ...rest } = body;

        if (session?.user?.id !== userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const validated = ChangePasswordSchema.safeParse(rest);
        if (!validated.success) {
            return NextResponse.json(
                { success: false, message: validated.error.issues[0]?.message || "Invalid password" },
                { status: 400 }
            );
        }
        const { currentPassword, newPassword, confirmNewPassword } = validated.data;
        if (newPassword !== confirmNewPassword) {
            return NextResponse.json(
                { success: false, message: "Passwords do not match" },
                { status: 400 }
            );

        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const matchPassword = await bcrypt.compare(currentPassword, user.password as string);
        if (!matchPassword) {
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return NextResponse.json(
            { success: true, message: "Password changed successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Failed to change password:', error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}