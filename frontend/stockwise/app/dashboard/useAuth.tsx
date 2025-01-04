"use client";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { User } from '@/lib/types'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const token = null;
        if (token) {
            setUser({ 
                id: 1,
                name: 'John Doe', 
                email: 'johndoe@example.com', 
                role: 'user', 
                status: 'active' 
            });
        } else {
            setUser(null);
        }
    }, []);

    const login = () => {
        localStorage.setItem("token", "abc");
        setUser({ 
            id: 1,
            name: 'John Doe', 
            email: 'johndoe@example.com',
            role: 'user',
            status: 'active'
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    
    return { user, loading }
}