"use client"
import Link from 'next/link'
import {
    HomeIcon,
    DocumentTextIcon,
    UsersIcon,
    ChartBarIcon,
    BellIcon,
    EnvelopeIcon,
    FolderIcon,
    CogIcon,
    ShieldCheckIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import {useAppDispatch} from "@/store";
import React from "react";
import {clearAuthState} from "@/store/slices/auth.slice";

export default function Sidebar() {
    const dispatch = useAppDispatch()
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-blue-800">Client Dashboard</h1>
            </div>
            <nav className="p-4">
                <div className="mb-8">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu</h2>
                    <ul className="space-y-2">
                        <SidebarItem href="/Dashboard" icon={<HomeIcon className="h-5 w-5"/>} text="Dashboard"/>
                        <SidebarItem href="/admin/claims" icon={<DocumentTextIcon className="h-5 w-5"/>} text="Claims"/>
                        <SidebarItem href="/admin/users" icon={<UsersIcon className="h-5 w-5"/>} text="Users"/>
                        <SidebarItem href="/admin/reports" icon={<ChartBarIcon className="h-5 w-5"/>} text="Reports"/>
                        <SidebarItem href="/admin/notifications" icon={<BellIcon className="h-5 w-5"/>}
                                     text="Notifications"/>
                        <SidebarItem href="/admin/messages" icon={<EnvelopeIcon className="h-5 w-5"/>} text="Messages"/>
                        <SidebarItem href="/admin/files" icon={<FolderIcon className="h-5 w-5"/>} text="File Manager"/>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Support</h2>
                    <ul className="space-y-2">
                        <SidebarItem href="/admin/settings" icon={<CogIcon className="h-5 w-5"/>} text="Settings"/>
                        <SidebarItem href="/admin/verifications" icon={<ShieldCheckIcon className="h-5 w-5"/>}
                                     text="Verifications"/>
                        <li className="w-full">
                            <button onClick={()=>dispatch(clearAuthState())}
                                  className="w-full flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <span className="mr-3">
                                    <ArrowLeftOnRectangleIcon className="h-5 w-5"/>
                                </span>
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

function SidebarItem({href, icon, text}: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <li>
            <Link href={href}
                  className="flex items-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <span className="mr-3">{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    )
}