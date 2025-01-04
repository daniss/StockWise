import { 
    PhoneIcon, 
    EnvelopeIcon, 
    MapPinIcon,
    StarIcon
  } from '@heroicons/react/24/outline'
  import type { Supplier } from '@/lib/types'
  
  interface SupplierCardProps {
    supplier: Supplier
    onEdit: () => void
  }
  
  export function SupplierCard({ supplier, onEdit }: SupplierCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {supplier.name}
              </h3>
              {/* <p className="text-sm text-gray-500">{supplier.category}</p> */}
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {supplier.rating}
                </span>
              </div>
              {/* <span className={`
                ml-3 px-2 py-1 text-xs rounded-full
                ${supplier.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'}
              `}>
                {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
              </span> */}
            </div>
          </div>
  
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600 flex items-center">
              <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
              {supplier.email}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
              {supplier.phone}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
              {supplier.address}
            </p>
          </div>
  
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Payment Terms</p>
                {/* <p className="font-medium text-gray-900">{supplier.paymentTerms}</p> */}
              </div>
              <div>
                <p className="text-gray-500">Credit Limit</p>
                <p className="font-medium text-gray-900">
                  {/* ${supplier.creditLimit.toLocaleString()} */}
                </p>
              </div>
            </div>
          </div>
  
          <div className="mt-4">
            <button
              onClick={onEdit}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 
                       bg-indigo-50 rounded-lg hover:bg-indigo-100 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500"
            >
              Edit Supplier
            </button>
          </div>
        </div>
      </div>
    )
  }