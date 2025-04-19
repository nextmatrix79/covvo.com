"use client";
import React, {FC, useEffect} from 'react';
import Sidebar from "@/components/layouts/sidebar";
import Header from "@/components/layouts/header";
import {useAppDispatch, useAppSelector} from "@/store";
import {useRouter} from "next/navigation";

interface IProps {
    children: React.ReactNode;
}

const ProtectedLayout: FC<IProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {isLoggedIn} = useAppSelector(state => state.auth)

    const [isRedirecting, setIsRedirecting] = React.useState<boolean>(false);

    useEffect(() => {
        if (!isLoggedIn) {
            setIsRedirecting(true)
        } else {
            setIsRedirecting(false)
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(isRedirecting) {
            router.push('/auth/sign-in')
        }
    }, [isRedirecting]);

    if (isRedirecting) {
        return (
            <div className="flex flex-col justify-center items-center w-full min-h-screen">
                <div className="text-2xl font-bold">You are not logged in. redirecting</div>
            </div>
        );
    } else {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar/>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header/>
                    <main className="flex-1 overflow-y-auto bg-grey-50">
                        {children}
                    </main>
                </div>
            </div>
        );
    }
};

export default ProtectedLayout;