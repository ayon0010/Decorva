import { RegisterSchema } from "@/Shared/Schema/LoginSchema";
import { RegisterFormData } from "@/app/(Auth)/register/page";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data: RegisterFormData = await req.json();
    const validatedField = RegisterSchema.safeParse(data);

    if (!validatedField.success) {
        return NextResponse.json({ success: false, errors: validatedField.error.format(), message: 'Something Went Wrong' }, { status: 400 });
    }
    const { data: validatedData } = validatedField;

    const { password, repeatPassword, ...rest } = validatedData;

    if (password !== repeatPassword) {
        return NextResponse.json({ success: false, message: 'Passwords do not match' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email: rest.email
        },
    })
    if (existingUser) {
        return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const newUser = await prisma.user.create({
        data: {
            ...rest,
            password: hashedPassword,
            billingAddress: {
                create: {
                    firstName: "",
                    lastName: "",
                    company: "",
                    address1: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                    phone: "",
                }
            },
            shippingAddress: {
                create: {
                    firstName: "",
                    lastName: "",
                    company: "",
                    address1: "",
                    city: "",
                    state: "",
                    postcode: "",
                    country: "",
                    phone: "",
                }
            }
        },
    });

    if (!newUser) {
        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data, message: 'User Created Successfully' }, { status: 200 });
}