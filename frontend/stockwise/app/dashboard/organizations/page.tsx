// src/app/(dashboard)/organizations/page.tsx
'use client'

import { useState } from 'react';
// import { OrganizationColumn } from '@/lib/types'; // Adjust the import path as necessary
import { Table } from '@/components/shared/Table';
import { Modal } from '@/components/shared/Modal';
import { Organization } from '@/lib/types';

const orgColumns: any = [
  { key: 'name', title: 'Name' },
  { key: 'contact', title: 'Contact' },
  { key: 'email', title: 'Email' },
  { key: 'address', title: 'Address' },
  {
    key: 'status',
    title: 'Status',
    render: (item: Organization) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium
        ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {item.status.toUpperCase()}
      </span>
    )
  }
];

export default function OrganizationsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Mock data - replace with actual API call
  const organizations: Organization[] = [
    {
      id: 1,
      name: 'Acme Corp',
      contact: 'John Doe',
      email: 'john@acme.com',
      address: '123 Main St, City',
      status: 'active'
    },
    // Add more organizations...
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Organizations</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          title={selectedOrg ? `Edit Organization: ${selectedOrg.name}` : 'Edit Organization'}
        >
          Add Organization
        </button>
      </div>

      <Table
        data={organizations}
        columns={orgColumns}
        onRowClick={(org) => setSelectedOrg(org)}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Organization"
      >
        {/* Add form implementation here */}
        <div></div>
      </Modal>

      <Modal
        isOpen={!!selectedOrg}
        onClose={() => setSelectedOrg(null)}
        title={`Edit Organization: ${selectedOrg?.name}`}
      >
        {/* Edit form implementation here */}
        <div></div>
      </Modal>
    </div>
  );
}