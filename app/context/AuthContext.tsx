'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Account } from '@/types/song';
import { apiRequest } from '@/app/lib/api';

type AuthContextType = {
	currentUser: Account | null;
	accessToken: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	setCurrentUser: (user: Account) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<Account | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);

	// Load từ localStorage khi mở lại
	useEffect(() => {
		const storedUser = localStorage.getItem('currentUser');
		const storedToken = localStorage.getItem('accessToken');
		if (storedUser) setCurrentUser(JSON.parse(storedUser));
		if (storedToken) setAccessToken(storedToken);
	}, []);

	// Lưu vào localStorage
	useEffect(() => {
		if (currentUser && accessToken) {
			localStorage.setItem('currentUser', JSON.stringify(currentUser));
			localStorage.setItem('accessToken', accessToken);
		} else {
			localStorage.removeItem('currentUser');
			localStorage.removeItem('accessToken');
		}
	}, [currentUser, accessToken]);

	const login = async (username: string, password: string) => {
		try {
			const tokenRes = await apiRequest('token/', 'POST', { username, password });
			const access = tokenRes.access;
			setAccessToken(access);

			const profile = await apiRequest('profile/', 'GET', undefined, access);
			setCurrentUser(profile);
		} catch (err) {
			throw new Error('Đăng nhập thất bại');
		}
	};

	const logout = () => {
		setAccessToken(null);
		setCurrentUser(null);
		localStorage.removeItem('accessToken');
		localStorage.removeItem('currentUser');
	};

	return (
		<AuthContext.Provider value={{ currentUser, accessToken, login, logout, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
