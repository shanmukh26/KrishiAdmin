"use client";
import { useRouter } from "next/navigation";

const farmers = [
  { id: 1, name: "Ravi Kumar", mobile: "111-7779998", location: "Andhra Pradesh", totalFarms: 2, assignedRE: "Sita Rani" },
  { id: 2, name: "Lakshmi", mobile: "222-8889991", location: "Telangana", totalFarms: 1, assignedRE: "None" },
];

export default function FarmersPage() {
  const router = useRouter();

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[32px] font-bold mb-6">All Farmers</h1>
<div className="flex justify-between">
      <button onClick={() =>
                    router.push(`/farmers/addfarmers`)
                  }
                    className="bg-[#25632D] mb-10 text-white px-8 py-2 rounded cursor-pointer ">+ Add Farmers</button>
      <input
        type="text"
        placeholder="Search here"
        className="border px-3 py-2 rounded mb-10 w-1/3 bg-[#DFDEDE]"
      />
</div>
      <table className="min-w-full bg-white text-center">
        <thead className="border ">
          <tr>
            <th className=" p-6 border">Farmer</th>
            <th className=" p-6 border">Mobile Number</th>
            <th className=" p-6 border">Location</th>
            <th className=" p-6 border">Total Farms</th>
            <th className=" p-6 border">Assigned R.E</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr
              key={farmer.id}
              onClick={() => router.push(`/farmers/${farmer.id}`)}
              className="cursor-pointer hover:bg-gray-100 border"
            >
              <td className="p-6 border">{farmer.name}</td>
              <td className="p-6 border">{farmer.mobile}</td>
              <td className="p-6 border">{farmer.location}</td>
              <td className="p-6 border">{farmer.totalFarms}</td>
              <td className="p-6 border">{farmer.assignedRE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
