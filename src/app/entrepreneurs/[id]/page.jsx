"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const entrepreneurs = [
  {
    id: 1,
    name: "Ravi Kumar",
    mobile: "111-7779998",
    email: "ravi123@gmail.com",
    registeredOn: "January 10, 2025",
    farmers: [{ name: "Farm 1", location: "Andhra", crop: "Rice" }],
  },
  {
    id: 2,
    name: "Lakshmi",
    mobile: "222-8889991",
    email: "lakshmi123@gmail.com",
    registeredOn: "February 12, 2025",
    farmers: [{ name: "Farm 2", location: "Telangana", crop: "Wheat" }],
  },
];

export default function EntrepreneurDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const entrepreneur = entrepreneurs.find((e) => e.id.toString() === id);

  if (!entrepreneur) return <div>Entrepreneur not found</div>;

  return (
    <div className="p-6 mx-30 relative">
      <h1 className="text-[36px] font-bold mb-4">Entrepreneur Details</h1>

      <div className="bg-white py-4 mb-4 text-[16px]">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-[32px] text-[#25632D]">
            {entrepreneur.name}
          </h2>

          <div className="relative ml-4">
            <button
              className="bg-[#25632D] text-white px-4 py-1 rounded flex items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {/* <span>Options</span> */}
              <img
                src="/DropdownLogo.svg"
                alt="Dropdown Icon"
                className="w-4 h-4"
              />
            </button>

            {showDropdown && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-md z-10">
                <button
                  onClick={() =>
                    router.push(`/entrepreneurs/${entrepreneur.id}/edit`)
                  }
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

        <p>
          <strong>Mobile Number:</strong> {entrepreneur.mobile}
        </p>
        <p>
          <strong>Email Address:</strong> {entrepreneur.email}
        </p>
        <p>
          <strong>Registration:</strong> {entrepreneur.registeredOn}
        </p>
      </div>

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
            {entrepreneur.farmers.map((farmers, index) => (
              <tr key={index}>
                <td className="p-6 border">{farmers.name}</td>
                <td className="p-6 border">{farmers.location}</td>
                <td className="p-6 border">{farmers.crop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
          <div className="bg-white p-6 rounded shadow-lg text-center px-20 py-20">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to deactivate this R.E? They will lose
              access to the app.
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
                  console.log(`Deactivated: ${entrepreneur.name}`);
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
