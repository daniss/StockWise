'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'
import { SupplierCard } from '@/components/shared/SupplierCard'
import { SupplierEditModal } from '@/components/shared/SupplierEditModal'
import type { Supplier } from '@/lib/types'
import axios from 'axios'

// Mock data - replace with your API call
const mockSuppliers: Supplier[] = [
    {
        id: 1,
        name: 'Tech Components Ltd',
        email: 'john@techcomponents.com',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Street, Silicon Valley, CA',
        status: 'active',
        rating: 4.5,
    },
    // Add more mock suppliers...
]

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)

    const fetchStockItems = async () => {
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            const response = await axios.get('http://localhost:8080/supplier', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSuppliers(response.data)
            console.log('Suppliers items:', response.data)
        } catch (error) {
            console.error('Error fetching suppliers items:', error)
        }
    }

    useEffect(() => {
        fetchStockItems()
    }, [])

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleEditSupplier = (supplier: Supplier) => {
        setSelectedSupplier(supplier)
        setIsEditModalOpen(true)
    }

    const handleSaveSupplier = async (updatedSupplier: Supplier) => {
        try {
            // Assuming you have an API endpoint to update the supplier
            await axios.put(`http://localhost:8080/supplier/${updatedSupplier.id}`, updatedSupplier)
            fetchStockItems()
        } catch (error) {
            console.error('Error saving supplier:', error)
        }
        setIsEditModalOpen(false)
        setSelectedSupplier(null)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your suppliers and their information
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedSupplier(null)
                        setIsEditModalOpen(true)
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent 
                                         rounded-lg shadow-sm text-sm font-medium text-white 
                                         bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                         focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Supplier
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search suppliers..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg
                                             text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500
                                             focus:ring-1 focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Suppliers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSuppliers.map((supplier) => (
                    <SupplierCard
                        key={supplier.id}
                        supplier={supplier}
                        onEdit={() => handleEditSupplier(supplier)}
                    />
                ))}
            </div>

            {/* Edit Modal */}
            <SupplierEditModal
                isOpen={isEditModalOpen}
                supplier={selectedSupplier}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedSupplier(null)
                }}
                onSave={handleSaveSupplier}
            />
        </div>
    )
}
