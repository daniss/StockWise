'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { 
  ArrowDownIcon, 
  ArrowUpIcon,
  ArrowsUpDownIcon 
} from '@heroicons/react/24/outline'
import { Order } from '@/lib/types'



interface SalesTableProps {
  orders: Order[]
  loading?: boolean
}

type SortField = 'date' | 'amount' | 'customerName'
type SortDirection = 'asc' | 'desc'

const ITEMS_PER_PAGE = 5

export function SalesTable({ orders, loading = false }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

//   orders = [
//     {
//         id: 1,
//         customerName: 'John Doe',
//         date: '2023-10-01T10:00:00Z',
//         amount: 150.75,
//         status: 'paid'
//     },
//     {
//         id: 2,
//         customerName: 'Jane Smith',
//         date: '2023-09-15T14:30:00Z',
//         amount: 200.00,
//         status: 'pending'
//     },
//     {
//         id: 3,
//         customerName: 'Alice Johnson',
//         date: '2023-08-20T09:45:00Z',
//         amount: 99.99,
//         status: 'failed'
//     },
//     {
//         id: 4,
//         customerName: 'Bob Brown',
//         date: '2023-07-10T16:20:00Z',
//         amount: 250.50,
//         status: 'paid'
//     },
//     {
//         id: 5,
//         customerName: 'Charlie Davis',
//         date: '2023-06-05T11:10:00Z',
//         amount: 175.25,
//         status: 'pending'
//     },
//     {
//         id: 6,
//         customerName: 'Diana Evans',
//         date: '2023-05-25T13:00:00Z',
//         amount: 300.00,
//         status: 'failed'
//     }
// ]

  
  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (sortField === 'amount') {
      return sortDirection === 'asc' 
        ? a.amount - b.amount
        : b.amount - a.amount
    }
    // Customer name
    return sortDirection === 'asc'
      ? a.customerName.localeCompare(b.customerName)
      : b.customerName.localeCompare(a.customerName)
  })

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE)
  
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const statusStyles = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowsUpDownIcon className="w-4 h-4 ml-1" />
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="w-4 h-4 ml-1" />
      : <ArrowDownIcon className="w-4 h-4 ml-1" />
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-100 mb-4 rounded" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 mb-2 rounded" />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th 
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('customerName')}
              >
                <div className="flex items-center">
                  Customer
                  <SortIcon field="customerName" />
                </div>
              </th>
              <th 
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  <SortIcon field="date" />
                </div>
              </th>
              <th 
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Amount
                  <SortIcon field="amount" />
                </div>
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, orders.length)}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, orders.length)}
            </span>{' '}
            of{' '}
            <span className="font-medium">{orders.length}</span> results
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          
          <span className="relative z-0 inline-flex">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              const isActive = page === currentPage

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    relative inline-flex items-center px-4 py-2 border text-sm font-medium
                    ${isActive 
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}
                    ${i === 0 ? 'rounded-l-md' : ''}
                    ${i === totalPages - 1 ? 'rounded-r-md' : ''}
                    -ml-px
                  `}
                >
                  {page}
                </button>
              )
            })}
          </span>

          <button
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
