// contexts/MajorContext.js
"use client";
import { createContext, useContext, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';

const MajorContext = createContext();

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
    const [major, setMajor] = useState(null);

    return (
        <MajorContext.Provider value={{ major, setMajor }}>
            {children}
        </MajorContext.Provider>
    );
};
