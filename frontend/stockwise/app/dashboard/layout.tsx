'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}