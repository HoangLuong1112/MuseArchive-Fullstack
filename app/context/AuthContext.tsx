'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Account } from '@/types/song_final';

type AuthContextType = {
    currentUser: Account | null;
    isLoading: boolean;
    login: (user: Account, access: string, refresh: string) => void;
    logout: () => void;
    setCurrentUser: React.Dispatch<React.SetStateAction<Account | null>>;
    getAccessToken: () => Promise<string | null>;
};

//Context để xác nhận tài khoản
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<Account | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user và token từ localStorage khi mở lại trang
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const access = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');

        if (storedUser && access && refresh) 
            setCurrentUser(JSON.parse(storedUser));
        else
            logout(); //nếu thiếu bất kỳ cái gì thì logout

        setIsLoading(false); // Đặt isLoading thành false đánh dấu đã load xong currentUser
        /*currentUser có thể vẫn là null trong khi đang được load từ localStorage. Điều đó 
        khiến useEffect hiểu nhầm là chưa đăng nhập và tự động router.push('/loginpage') quá sớm bên /app/page.tsx
        nên mới tạo thêm cái isLoading để đánh dấu */
    }, []);

    // Lưu vào localStorage khi có thay đổi
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = (user: Account, access: string, refresh: string) => {
        setCurrentUser(user);
        console.log('Token access receive: ', access);
        console.log('Token refresh receive: ', refresh);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    //lấy token và tự động refresh nếu hết hạn
    const getAccessToken = async (): Promise<string | null> => {
        const access = localStorage.getItem('accessToken');
        const refresh = localStorage.getItem('refreshToken');

        //rỗng thì logout
        if (!access || !refresh) {
            logout();
            return null;
        }

        try {
            //  1. Xác minh access token
            const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/token/verify/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: access }),
            });
            if (verifyRes.ok)
                return access;

            //  2. Nếu access token hết hạn thì xài refresh
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ refresh }),
            });
            if(!refreshRes.ok) {
                logout();
                return null;
            } else {
                console.log('JUST REFRESH TOKEN');
            }

            const data = await refreshRes.json();
            localStorage.setItem('accessToken', data.access);
            return data.access;

        } catch (error) {
            console.error('Lỗi xác minh token: ', error);
            logout();
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, login, logout, setCurrentUser, getAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
