'use client'

import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900">ERP System</h1>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-900 hover:text-gray-700">
                Login
              </a>
              <a
                href="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Manage Your Business</span>{' '}
                    <span className="block text-indigo-600 xl:inline">Efficiently</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Our ERP system helps you streamline your business processes and improve efficiency.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get Started
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Jobs
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Press
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Privacy
              </a>
            </div>
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                Terms
              </a>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 0v24H0V0h24zm-4.1 24h-4.2v-9.3h-3.1V10.9h3.1V8.5c0-2.9 2.4-5.3 5.3-5.3h3.1v3.1h-3.1c-.5 0-.9.4-.9.9v2.4h4v3.1h-4v9.3z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.7-1.6 2-2.8-.9.6-1.9 1-3 1.2C19.1 2.7 17.9 2 16.5 2c-2.5 0-4.6 2-4.6 4.6 0 .4 0 .7.1 1C7.7 7.3 4.1 5.4 1.7 2.7c-.4.6-.6 1.3-.6 2.1 0 1.5.8 2.8 2 3.6-.7 0-1.3-.2-1.9-.5 0 2.2 1.6 4 3.7 4.5-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.4 4.5 3.4-1.6 1.3-3.5 2-5.7 2-.4 0-.8 0-1.1-.1 2 1.3 4.3 2 6.8 2 8.1 0 12.6-6.7 12.6-12.6v-.6c.9-.6 1.7-1.5 2.3-2.4z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8 11.4.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.5-1.2-1.3-1.5-1.3-1.5-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-6.1 0-1.3.5-2.4 1.3-3.3-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3C9 7.5 10.5 7 12 7c1.5 0 3.1.5 4.5 1.3 2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3-.1 3.3.8.9 1.3 2 1.3 3.3 0 4.8-2.7 5.8-5.3 6.1.4.3.7 1 .7 2.1v3.1c0 .3.2.7.8.6C20.6 21.7 24 17.3 24 12 24 5.4 18.6 0 12 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}