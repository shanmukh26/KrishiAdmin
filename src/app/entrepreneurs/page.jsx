'use client';

import { useRouter } from "next/navigation";

const entrepreneurs = [
  { id: 1, rename: "Ravi Kumar", mobile: "111-7779998", location: "Andhra Pradesh", assignedFarmer: "Sita Rani", status: "Active" },
  { id: 2, rename: "Lakshmi", mobile: "222-8889991", location: "Telangana", assignedFarmer: "None", status: "Inactive" },
];

export default function EntrepreneursPage() {
  const router = useRouter();

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[32px] font-bold mb-6">All Rural Entrepreneurs</h1>

      <button 
      onClick={() =>
                    router.push(`/entrepreneurs/addRE`)
                  }
      className="bg-[#25632D] mb-10 text-white px-8 py-2 rounded cursor-pointer">+ Add an R.E</button>

      <table className="min-w-full bg-white text-center">
        <thead className="border">
          <tr>
            <th className="p-6 border">R.E Name</th>
            <th className="p-6 border">Mobile Number</th>
            <th className="p-6 border">Location</th>
            <th className="p-6 border">Assigned Farmer</th>
            <th className="p-6 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {entrepreneurs.map((entrepreneur) => (
            <tr
              key={entrepreneur.id}
              onClick={() => router.push(`/entrepreneurs/${entrepreneur.id}`)}
              className="cursor-pointer hover:bg-gray-100 border"
            >
              <td className="p-6 border">{entrepreneur.rename}</td>
              <td className="p-6 border">{entrepreneur.mobile}</td>
              <td className="p-6 border">{entrepreneur.location}</td>
              <td className="p-6 border">{entrepreneur.assignedFarmer}</td>
              <td className="p-6 border">{entrepreneur.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
