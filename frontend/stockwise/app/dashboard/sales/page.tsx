'use client'

import { useState, useEffect } from 'react'
import { 
  CurrencyDollarIcon, 
  ShoppingCartIcon, 
  ArrowTrendingUpIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { SalesKpiCard } from '@/components/shared/SalesKpiCard'
import { SalesTable } from '@/components/shared/SalesTable'
import { SalesChart } from '@/components/shared/SalesChart'
import { Card } from '@/components/shared/Card'
import { Order } from '@/lib/types'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SalesData {
  totalSales: number
  orderCount: number
  revenueGrowth: number
  bestSeller: string
  recentOrders: Order[]
  monthlyTrends: MonthlyTrend[]
}

interface MonthlyTrend {
  month: string
  sales: number
}

export default function SalesPage() {
  const [salesData, setSalesData] = useState<SalesData>({
    totalSales: 0,
    orderCount: 0,
    revenueGrowth: 0,
    bestSeller: '',
    recentOrders: [],
    monthlyTrends: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const response = await axios.get('http://localhost:8080/sale/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log('Sales data:', response.data)
        setSalesData(response.data)
      } catch (error) {
        console.error('Error fetching sales data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSalesData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Sales Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your sales performance and metrics
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <SalesKpiCard
          title="Total Sales"
          value={`$${(salesData.totalSales).toLocaleString()}`}
          description="This month"
          trend="up"
          trendValue="12.5%"
          icon={CurrencyDollarIcon}
          loading={loading}
        />
        
        <SalesKpiCard
          title="Orders"
          value={salesData.orderCount.toString()}
          description="Total orders"
          trend="up"
          trendValue="8.2%"
          icon={ShoppingCartIcon}
          loading={loading}
        />
        
        <SalesKpiCard
          title="Revenue Growth"
          value={`${salesData.revenueGrowth}%`}
          description="Compared to last month"
          trend="up"
          trendValue={`${salesData.revenueGrowth}%`}
          icon={ArrowTrendingUpIcon}
          loading={loading}
        />
        
        <SalesKpiCard
          title="Best Seller"
          value={salesData.bestSeller}
          description="Most sold product"
          icon={TrophyIcon}
          loading={loading}
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Sales Trend</h2>
            <div className="mt-4 h-[300px]">
              <SalesChart data={salesData.monthlyTrends} loading={loading} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className='flex justify-between items-center'>
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                <Button>
                    <Link href="/dashboard/sales/orders">
                        View All Orders
                    </Link>
                </Button>
            </div>
            <div className="mt-4">
              <SalesTable orders={salesData.recentOrders} loading={loading} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}