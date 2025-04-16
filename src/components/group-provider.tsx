"use client";
import React, {FC} from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "@/store";

interface IProps {
    children: React.ReactNode;
}

const GroupProvider:FC<IProps> = ({children}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default GroupProvider;