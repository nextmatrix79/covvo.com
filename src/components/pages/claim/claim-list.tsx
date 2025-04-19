/**
 * Created by Syed Suhaib Zia
 * Created At: 4/18/25 8:49 PM
 * Version: 1.0.0
 */

"use client";
import React from 'react';
import PageWrapper from '../page-wrapper';
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ClaimList() {
    return (
        <PageWrapper>
            <div className="bg-white overflow-x-auto rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center gap-3 w-full">
                    <h1 className="text-lg font-semibold">All Claims</h1>
                    <div className="flex gap-2">
                        <Button>Add New</Button>
                    </div>
                </div>
                <table className="min-w-full border-separate border-spacing-0">
                    <thead className="bg-white border border-gray-200">
                    <tr>
                        <th className="px-4 py-2 text-left border border-gray-200">Policy #</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Company Name</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Company Contacts</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Policy Type</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Claimant Name</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Claimant Contacts</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Status</th>
                        <th className="px-4 py-2 text-left border border-gray-200">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-gray-200">
                        <td className="px-4 py-2">123456789</td>
                        <td className="px-4 py-2">ABC Insurance</td>
                        <td className="px-4 py-2">John Doe</td>
                        <td className="px-4 py-2">Health</td>
                        <td className="px-4 py-2">Jane Smith</td>
                        <td className="px-4 py-2">(555) 123-4567</td>
                        <td className="px-4 py-2">Pending</td>
                        <td className="px-4 py-2 space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">Actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </PageWrapper>
    );
}
