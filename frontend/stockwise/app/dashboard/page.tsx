"use client";
import { Card } from '@/components/shared/Card'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { DashboardChart } from '@/components/dashboard/DashboardChart'
import { useEffect } from 'react'
import axios from 'axios'
import { get } from 'http';
import { Sidebar } from '@/components/layout/Sidebar'
import { useState } from 'react'

interface DashboardData {
    stockValue: number
    organizations: number
    totalUsers: number
    lowStockItems: number
    lastUpdated: string
  }

function DashboardPage({ children }: { children: React.ReactNode }) {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const [collapsed, setCollapsed] = useState(false)

    
    return (
        <div className="space-y-6">
        <div
          className={`flex-1 transition-all duration-300 ${
            collapsed ? 'ml-16' : 'ml-64'
          }`}
        >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Stock Value"
              value="$124,200"
              change="+14.6%"
              trend="up"
            />
            <StatsCard
              title="Organizations"
              value="48"
              change="+7.4%"
              trend="up"
            />
            <StatsCard
              title="Total Users"
              value="2,300"
              change="+2.3%"
              trend="up"
            />
            <StatsCard
              title="Low Stock Alerts"
              value="12"
              change="+4"
              trend="down"
              alert
            />
            </div>
        </div>
        </div>

    )
  }

export default DashboardPage