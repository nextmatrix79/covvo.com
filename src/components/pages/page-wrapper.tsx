/**
 * Created by Syed Suhaib Zia
 * Created At: 4/18/25 8:55 PM
 * Version: 1.0.0
 */
"use client";
import React, {FC} from 'react';

interface IProps {
    children: React.ReactNode;
}

const PageWrapper: FC<IProps> = ({children}) => {
    return (
        <div className="min-h-screen p-8">
            <div className="mx-auto">
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;