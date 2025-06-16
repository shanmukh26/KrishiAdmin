'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/fireabase';

export default function EntrepreneurDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [entrepreneur, setEntrepreneur] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchEntrepreneur = async () => {
      const docRef = doc(db, 'RE_details', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEntrepreneur({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error('No such document!');
      }
    };

    if (id) fetchEntrepreneur();
  }, [id]);

  if (!entrepreneur) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="p-6 mx-30 relative">
      <h1 className="text-[36px] font-bold mb-4">Entrepreneur Details</h1>

      <div className="bg-white py-4 mb-4 text-[16px]">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-[32px] text-[#25632D]">
            {entrepreneur.title} {entrepreneur.firstName} {entrepreneur.lastName}
          </h2>

          <div className="relative ml-4">
            <button
              className="bg-[#25632D] text-white px-4 py-1 rounded flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src="/DropdownLogo.svg"
                alt="Dropdown Icon"
                className="w-4 h-4"
              />
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-md z-10">
                <button
                  onClick={() => router.push(`/entrepreneurs/${entrepreneur.id}/edit`)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-600"
                >
                  Deactivate RE
                </button>
              </div>
            )}
          </div>
        </div>

        <p><strong>Mobile Number:</strong> {entrepreneur.mobile}</p>
        <p><strong>Email Address:</strong> {entrepreneur.email}</p>
        <p><strong>Registration:</strong> {new Date(entrepreneur.createdAt?.seconds * 1000).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {entrepreneur.gender}</p>
        <p><strong>State:</strong> {entrepreneur.state}</p>
        <p><strong>City:</strong> {entrepreneur.city}</p>
        <p><strong>Address:</strong> {entrepreneur.address}</p>
        <p><strong>Pincode:</strong> {entrepreneur.pincode}</p>
        <p><strong>Has Qualified Test:</strong> {entrepreneur.hasQualifiedTest ? 'Yes' : 'No'}</p>
      </div>

      {/* Farmers Table */}
      {entrepreneur.farmers && entrepreneur.farmers.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-green-700 mb-2 text-[32px]">
            Assigned Farmers List
          </h2>
          <table className="w-full border text-sm text-center text-[16px]">
            <thead>
              <tr>
                <th className="p-6 border">Farmer name</th>
                <th className="p-6 border">Location</th>
                <th className="p-6 border">Crop Type</th>
              </tr>
            </thead>
            <tbody>
              {entrepreneur.farmers.map((farmer, index) => (
                <tr key={index}>
                  <td className="p-6 border">{farmer.name}</td>
                  <td className="p-6 border">{farmer.location}</td>
                  <td className="p-6 border">{farmer.crop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
          <div className="bg-white p-6 rounded shadow-lg text-center px-20 py-20">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to deactivate this R.E? They will lose access to the app.
            </p>
            <div className="flex justify-between gap-4">
              <button
                className="bg-white text-black px-20 py-1 rounded border border-gray"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
              <button
                className="bg-[#25632D] text-white px-20 py-1 rounded"
                onClick={() => {
                  console.log(`Deactivated: ${entrepreneur.firstName}`);
                  router.back();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

