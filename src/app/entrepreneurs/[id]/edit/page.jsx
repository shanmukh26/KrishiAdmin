'use client';

import { useParams } from 'next/navigation';

export default function EditEntrepreneurPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Entrepreneur {id}</h1>
      {/* Add your form fields here for editing */}
      <form className="space-y-4">
        <input className="border p-2 w-full" placeholder="Name" />
        <input className="border p-2 w-full" placeholder="Mobile" />
        <input className="border p-2 w-full" placeholder="Email" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
