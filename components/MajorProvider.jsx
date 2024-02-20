// contexts/MajorContext.js
"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const MajorContext = createContext();

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
    const [major, setMajor] = useState(null);
    const [admin, setAdmin] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch major from URL query parameters
        const majorQueryParam = router.query?.major;
        if (majorQueryParam) {
            setMajor(majorQueryParam);
        }
    }, [router.query?.major]);

    const updateMajor = (newMajor) => {
        setMajor(newMajor);
    };

    const updateAdmin = (newAdmin) => { // Add method to update admin
        setAdmin(newAdmin);
    };

    return (
        <MajorContext.Provider value={{ major, setMajor, updateMajor, admin, updateAdmin }}>
            {children}
        </MajorContext.Provider>
    );
};
