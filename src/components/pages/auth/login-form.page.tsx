"use client";
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {AppleIcon, GoogleIcon} from "@/components/icons";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {useAppDispatch, useAppSelector} from "@/store";
import {login} from "@/store/slices/auth.slice";

interface IFormData {
    email: string;
    password: string;
}

const INITIAL_FORM_DATA: IFormData = {
    email: '',
    password: ''
}

const LoginFormPage = () => {
    const dispatch = useAppDispatch()

    const {isLoggedIn} = useAppSelector(state => state.auth)

    const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!formData.email || !formData.password) {
            alert('Please fill in all fields')
            return
        }

        // Dispatch login action here
        dispatch(login(formData))
    }


    return (
        <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black-800">Sign In Covvo</h1>
                    <p className="mt-2 text-gray-600">
                        Welcome back, you&#39;ve been missed!
                    </p>
                </div>

                <div className="flex flex-row space-x-4">
                    <Button variant="outline" className="flex-1">
                        <GoogleIcon className="w-5 h-10 mr-2"/>
                        Sign With Google
                    </Button>
                    <Button variant="outline" className="flex-1">
                        <AppleIcon className="w-5 h-10 mr-2"/>
                        Sign With Apple
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">OR</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                                placeholder="johanparker@gmail.com"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
                                placeholder="**********"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember"/>
                            <label
                                htmlFor="remember"
                                className="text-lg font-medium text-gray-700"
                            >
                                Remember Me
                            </label>
                        </div>
                        <a href="#" className="text-lg text-red-600 hover:underline">
                            Forget Password?
                        </a>
                    </div>

                    <Button type="submit" className="w-full h-10 text-white bg-blue-600 hover:bg-blue-700">
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-lg text-gray-600">
                    Don&#39;t have an account yet?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginFormPage;