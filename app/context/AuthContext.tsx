'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Account } from '@/types/song';

type AuthContextType = {
    currentUser: Account | null;
    login: (user: Account) => void;
    logout: () => void;
    setCurrentUser: React.Dispatch<React.SetStateAction<Account | null>>;
};
//Context để xác nhận tài khoản
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<Account | null>(null);

    // Load từ localStorage khi mở lại trang
    useEffect(() => {
        const stored = localStorage.getItem('currentUser');
        if (stored) setCurrentUser(JSON.parse(stored));
    }, []);

    // Lưu vào localStorage khi có thay đổi
    useEffect(() => {
        if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
        localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = (user: Account) => {
        setCurrentUser(user);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
