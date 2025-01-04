'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  CubeIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'

export function Sidebar({
    collapsed,
    setCollapsed,
  }: {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
  }) {
  const pathname = usePathname()
  const [stockLength, setStockLength] = useState(0)
  const [organization, setOrganization] = useState('Organization 1')
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

    useEffect(() => {
        const fetchStockItems = async () => {
                try {
                    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
                    const response = await axios.get('http://localhost:8080/inventory', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Stock items:', response.data);
                    setStockLength(response.data.length);
                } catch (error) {
                    console.error('Error fetching stock items:', error);
                }
            };
        fetchStockItems();
    }, [])

    const navigation = [
        { 
          name: 'Overview',
          href: '/dashboard',
          icon: HomeIcon,
        },
        {
          name: 'Inventory',
          href: '/dashboard/stock',
          icon: CubeIcon,
          badge: stockLength,
          subnav: [
            {
              name: 'Stock Items',
              href: '/dashboard/stock',
            },
            {
              name: 'Suppliers',
              href: '/dashboard/suppliers',
            },
            {
              name: 'Stock Adjustments',
              href: '/dashboard/stock-adjustments',
            },
          ]
        },
        {
          name: 'Organizations',
          href: '/dashboard/organizations',
          icon: BuildingOfficeIcon
        },
        {
          name: 'Sales',
          href: '/dashboard/sales',
          icon: CurrencyDollarIcon,
          badge: 'New',
          subnav : [
            {
              name: 'Orders',
              href: '/dashboard/sales/orders',
            },
            {
              name: 'Customers',
              href: '/dashboard/sales/customers',
            },
          ]
        },
        {
          name: 'Purchase Orders',
          href: '/dashboard/purchase-orders',
          icon: ClipboardDocumentListIcon
        },
        {
          name: 'Documents',
          href: '/dashboard/documents',
          icon: DocumentDuplicateIcon
        },
        {
          name: 'Users',
          href: '/dashboard/users',
          icon: UsersIcon
        },
        {
          name: 'Reports',
          href: '/dashboard/reports',
          icon: ChartBarIcon
        },
        {
          name: 'Settings',
          href: '/dashboard/settings',
          icon: Cog6ToothIcon
        },
      ]

      const handleMenuClick = (itemName: string, event: React.MouseEvent) => {
        if (navigation.find(item => item.name === itemName)?.subnav) {
          setExpandedMenu(expandedMenu === itemName ? null : itemName)
        }
      }


  return (
    <div className={`
      fixed top-0 left-0 h-screen bg-white border-r border-gray-200
      transition-all duration-300 ease-in-out z-50
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ERP</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftCircleIcon 
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 
                ${collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* User info */}
        <div className={`
          p-4 border-b border-gray-200
          ${collapsed ? 'items-center' : ''}
        `}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">
                {collapsed ? 'D' : 'DA'}
              </span>
            </div>
            {!collapsed && (
              <div>
                <h3 className="text-sm font-medium text-gray-900">daniss</h3>
                <select
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Organization 1</option>
                    <option>Organization 2</option>
                    <option>Organization 3</option>
                </select>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="mt-3 text-xs text-gray-500">
              {new Date().toLocaleString('en-US', {
                timeZone: 'UTC',
                dateStyle: 'medium',
                timeStyle: 'short'
              })} UTC
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <div key={item.name}>
              <Link
                href={item.href}
                onClick={(e) => handleMenuClick(item.name, e)}
                className={`
                  flex items-center ${collapsed ? 'justify-center' : 'justify-between'}
                  px-3 py-2 rounded-lg text-sm font-medium
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-700 hover:bg-gray-50'}
                  transition-colors duration-150 ease-in-out
                  group relative
                `}
              >
                <div className="flex items-center">
                  <item.icon className={`
                    ${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}
                  `} />
                  {!collapsed && item.name}
                </div>
                {!collapsed && item.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs rounded-full
                    ${item.badge === 'New' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'bg-gray-100 text-gray-600'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </Link>
              
              {/* Subnav section */}
              {!collapsed && item.subnav && expandedMenu === item.name && (
                <div className="ml-7 mt-1 space-y-1">
                  {item.subnav.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={`
                        block px-3 py-2 rounded-lg text-sm
                        ${pathname === subItem.href
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'}
                      `}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>


        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className={`
            flex items-center ${collapsed ? 'justify-center' : 'justify-between'}
            text-xs text-gray-500
          `}>
            {!collapsed && <span>v1.0.0</span>}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {!collapsed && <span>Online</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}