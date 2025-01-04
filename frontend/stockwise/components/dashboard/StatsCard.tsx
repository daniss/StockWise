import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { cva, type VariantProps } from 'class-variance-authority'

const trendVariants = cva(
  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      trend: {
        up: 'bg-green-100 text-green-800',
        down: 'bg-red-100 text-red-800',
        neutral: 'bg-gray-100 text-gray-800'
      },
      alert: {
        true: 'bg-yellow-100 text-yellow-800',
        false: null
      }
    },
    defaultVariants: {
      trend: 'neutral',
      alert: false
    }
  }
)

interface StatsCardProps extends VariantProps<typeof trendVariants> {
  title: string
  value: string | number
  change?: string
  description?: string
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  alert,
  description,
  loading = false
}: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg">
      {loading && (
        <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        
        {change && (
          <div className={trendVariants({ trend, alert })}>
            <span className="flex items-center space-x-1">
              {trend === 'up' ? (
                <ArrowUpIcon className="h-3 w-3" />
              ) : trend === 'down' ? (
                <ArrowDownIcon className="h-3 w-3" />
              ) : null}
              <span>{change}</span>
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {description && (
          <p className="ml-2 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  )
}