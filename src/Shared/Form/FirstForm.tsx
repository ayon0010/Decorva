"use client";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
    firstName: string;
    lastName: string;
};

const FirstForm = () => {
    const [show, setShow] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 global-b-bottom">
                <h3 className="text-lg leading-[100%]">Full name</h3>
                <div
                    onClick={() => setShow(!show)}
                    className="flex items-center gap-2 text-sm leading-[100%] cursor-pointer"
                >
                    <Pen className="w-4 h-4 cursor-pointer" />
                    Edit
                </div>
            </div>

            <div className="mt-1 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                        First name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        className="w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base"
                        {...register("firstName")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                        Last name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        className="w-full p-3 rounded-sm border border-black/70 placeholder:text-base text-base"
                        {...register("lastName")}
                    />
                </div>
            </div>

            {show && (
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-4 rounded-sm transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
                >
                    Save Changes
                </button>
            )}
        </form>
    );
};

export default FirstForm;
