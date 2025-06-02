"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const farmers = [
    { id: 1, name: "Ravi Kumar", location: "Andhra Pradesh", date: "2025-05-25" },
    { id: 2, name: "Sita Ram", location: "Telangana", date: "2025-05-20" },
    { id: 3, name: "Lakshmi Narayana", location: "Tamil Nadu", date: "2025-05-15" },
  ];

  return (
    <div className="mx-30 px-6 py-8 relative">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 ">
        <div className=" bg-[#1C912A] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
        <div className="flex justify-center items center">  <img src="/DashboardTotalFormers.svg"  alt="Farmer Icon" className=" h-6 w-6" />
          <p className="mt-1 ">Total Farmers</p></div>
          <h2 className="text-3xl font-bold">125</h2>
        </div>
        <div className="bg-[#19BA2E] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
        <div className="flex justify-center items center">  <img src="/DahsboardPending.svg" alt="Soil Icon" className=" h-6 w-6" />
          <p className="mt-1">Pending Soil Tests</p></div>
          <h2 className="text-3xl font-bold">20</h2>
        </div>
        <div className="bg-[#1C912A] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
          <div className="flex justify-center items center"> <img src="/DashboardTaskIcon.svg"  alt="Task Icon" className="mb-2 h-6 w-6 " />
          <p className="mt-1">Tasks in Progress</p></div>
          <h2 className="text-3xl font-bold">01</h2>
        </div>
      </div>

      {/* Sort Button */}
      <div className="relative mb-4">
        <button
          className="bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          onClick={() => setShowSortOptions((prev) => !prev)}
        >
          <Image src="/SortLogo.svg" width={20} height={20} alt="Sort Icon" />
          Sort
        </button>

        {/* Dropdown Options */}
        {showSortOptions && (
          <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded shadow w-48 z-10">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Completed</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Pending</button>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow-md text-center">
        <table className="min-w-full text-[16px] ">
          <thead className="text-gray-700 font-semibold border">
            <tr>
              <th className="px-6 py-3 border">Farmer</th>
              <th className="px-6 py-3 border">Location</th>
              <th className="px-6 py-3 border">Date of Request</th>
              <th className="px-6 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer.id} className="border">
                <td className="px-6 py-4 border">{farmer.name}</td>
                <td className="px-6 py-4 border">{farmer.location}</td>
                <td className="px-6 py-4 border">{farmer.date}</td>
                <td className="px-6 py-4 border">
                  <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-xs cursor-pointer">
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
