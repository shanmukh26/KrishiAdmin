"use client";

import { useParams } from "next/navigation";

export default function FarmerDetailsPage() {
  const { id } = useParams();

  // Sample dummy data (you can fetch from API based on `id`)
  const farmer = { 
    name: "Ravi Kumar",
    mobile: "111-7779998",
    email: "ravi123@gmail.com",
    registeredOn: "January 10, 2025",
    farms: [{ name: "Farm 1", location: "Andhra", crop: "Rice" }],
  };

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[36px] font-bold mb-4">Farmer Details</h1>

      <div className="bg-white py-4  mb-4 text-[16px]">
        <div className="flex  items-center mb-2">
          <h2 className="font-bold text-[32px] text-[#25632D]">{farmer.name}</h2>
<button className="bg-[#25632D] text-white px-4 py-1 rounded flex items-center gap-2  ml-4 cursor-pointer">
  <img src="/DropdownLogo.svg" alt="Dropdown Icon" className="w-4 h-4" />
</button>        </div>
        <p><strong>Mobile Number:</strong> {farmer.mobile}</p>
        <p><strong>Email Address:</strong> {farmer.email}</p>
        <p><strong>Registration:</strong> {farmer.registeredOn}</p>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-green-700 mb-2 text-[32px]">Farms</h2>
        <table className="w-full border text-sm text-center text-[16px]">
          <thead className="">
            <tr>
              <th className="p-6 border">Farms</th>
              <th className="p-6 border">Location</th>
              <th className="p-6 border">Crop Type</th>
            </tr>
          </thead>
          <tbody>
            {farmer.farms.map((farm, index) => (
              <tr key={index}>
                <td className="p-6 border">{farm.name}</td>
                <td className="p-6 border">{farm.location}</td>
                <td className="p-6 border">{farm.crop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
