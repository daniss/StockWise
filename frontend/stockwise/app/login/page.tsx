"use client";

import React, { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const githubLogin = async () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/github';
    };

    const googleLogin = async () => {
        window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_GOOGLE_REDIRECT_URI&response_type=code&scope=email%20profile';
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            if (response.status === 200) {
                // put token in cookie
                document.cookie = `token=${response.data.token}`;
                console.log('Logged in');
                router.push('/dashboard');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Sign In</h1>

                {error && (
                    <div className="mb-4 text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={githubLogin}
                        className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex items-center justify-center mb-4"
                    >
                        <FaGithub className="mr-2" />
                        Login with GitHub
                    </button>
                    <button
                        onClick={googleLogin}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 flex items-center justify-center"
                    >
                        <FaGoogle className="mr-2" />
                        Login with Google
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <a href="/register" className="text-sm text-indigo-600 hover:underline">Don't have an account? Register</a>
                </div>
            </div>
        </div>
    );
};