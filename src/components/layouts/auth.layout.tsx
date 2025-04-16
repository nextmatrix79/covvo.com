"use client";
import React, {FC, useEffect} from 'react';
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/store";
import {useRouter} from "next/navigation";

interface IProps {
    children: React.ReactNode;
}

const AuthLayout:FC<IProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const {isLoggedIn} = useAppSelector(state => state.auth)

    useEffect(() => {
        if(isLoggedIn) {
            router.push("/")
        }
    }, [isLoggedIn]);

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Form */}
            {children}

            {/* Right Column - Illustration */}
            <div className=" flex flex-col hidden lg:flex bg-blue-50 items-center justify-center p-12">
                <div className="relative aspect-video w-full">
                    <Image
                        src="/assets/LoginImage.png"
                        alt="Insurance illustration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="max-w-lg text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        The Easiest Way to handle Insurance claims
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                        facilis! Integer nec sapien aliquam, vehicula magna vel, pharetra
                        metus.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;