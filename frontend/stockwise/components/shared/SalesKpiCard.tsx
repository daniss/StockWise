import { type ComponentType } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { Card } from '@/components/shared/Card'

interface SalesKpiCardProps {
  title: string
  value: string
  description: string
  trend?: 'up' | 'down'
  trendValue?: string
  icon: ComponentType<{ className?: string }>
  loading?: boolean
}

export function SalesKpiCard({
  title,
  value,
  description,
  trend,
  trendValue,
  icon: Icon,
  loading = false
}: SalesKpiCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {loading ? (
              <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
                {trend && trendValue && (
                  <p className={`ml-2 flex items-baseline text-sm font-semibold
                    ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? (
                      <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                    )}
                    <span className="ml-1">{trendValue}</span>
                  </p>
                )}
              </div>
            )}
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}