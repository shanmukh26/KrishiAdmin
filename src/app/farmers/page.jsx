"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/fireabase"; // update path if needed
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function FarmersPage() {
  const [allFarmers, setAllFarmers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "RE_details"));
        const farmersList = [];

        querySnapshot.forEach((doc) => {
          const reData = doc.data();
          const reId = reData.uid || doc.id;
          const reName = `${reData.firstName || ""} ${reData.lastName || ""}`;

          const farmers = reData.farmers || [];

          farmers.forEach((farmer) => {
            farmersList.push({
              farmerId: farmer.id || "", // update based on your exact structure
              farmerName: farmer.name || "",
              location: farmer.location || "",
              reId,
              reName,
            });
          });
        });

        setAllFarmers(farmersList);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[32px] font-bold mb-6">All Farmers</h1>

      <div className="flex justify-between">
        <button
          onClick={() => router.push(`/farmers/addfarmers`)}
          className="bg-[#25632D] mb-10 text-white px-8 py-2 rounded cursor-pointer"
        >
          + Add Farmers
        </button>
        <input
          type="text"
          placeholder="Search here"
          className="border px-3 py-2 rounded mb-10 w-1/3 bg-[#DFDEDE]"
        />
      </div>

      <table className="min-w-full bg-white text-center">
        <thead className="border">
          <tr>
            <th className="p-6 border">Farmer Name</th>
            <th className="p-6 border">Farmer ID</th>
            <th className="p-6 border">Location</th>
            <th className="p-6 border">RE ID</th>
            <th className="p-6 border">RE Name</th>
          </tr>
        </thead>
        <tbody>
          {allFarmers.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 border text-gray-500">
                No farmers found.
              </td>
            </tr>
          ) : (
            allFarmers.map((farmer, index) => (
              <tr
                key={index}
                onClick={() =>   router.push(`/farmers/${farmer.reId}--${farmer.farmerId}`)}
                className="cursor-pointer hover:bg-gray-100 border"
              >
                <td className="p-6 border">{farmer.farmerName}</td>
                <td className="p-6 border">{farmer.farmerId}</td>
                <td className="p-6 border">{farmer.location}</td>
                <td className="p-6 border">{farmer.reId}</td>
                <td className="p-6 border">{farmer.reName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
