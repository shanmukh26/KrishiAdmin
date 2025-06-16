"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/fireabase"; // update path if different
import { doc, getDoc } from "firebase/firestore";




export default function FarmerDetailsPage() {
  const { id } = useParams(); // URL param like "REID--FARMERID"
  const [reid, farmerid] = id?.split("--") || [];

  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const reDocRef = doc(db, "RE_details", reid);
        const reSnap = await getDoc(reDocRef);

        if (reSnap.exists()) {
          const reData = reSnap.data();
          console.log("RE Data:", reData);
          console.log("Farmer ID to find:", farmerid);

          const farmers = reData.farmers || [];
          console.log("Farmers Array:", farmers);

          const found = farmers.find((f) => f.id === farmerid);
          console.log("Found farmer:", found);

          if (found) {
            setFarmer({
              ...found,
              reName: `${reData.firstName || ""} ${reData.lastName || ""}`,
              reId: reData.uid || reSnap.id,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reid && farmerid) {
      fetchFarmer();
    }
  }, [reid, farmerid]);

  if (loading) return <div className="p-6">Loading farmer data...</div>;
  if (!farmer) return <div className="p-6 text-red-600">Farmer not found.</div>;
  

  if (loading) return <div className="p-6">Loading farmer data...</div>;
  if (!farmer) return <div className="p-6 text-red-600">Farmer not found.</div>;

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[36px] font-bold mb-4">Farmer Details</h1>

      <div className="bg-white py-4 mb-4 text-[16px]">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-[32px] text-[#25632D]">{farmer.name}</h2>
          <button className="bg-[#25632D] text-white px-4 py-1 rounded flex items-center gap-2 ml-4 cursor-pointer">
            <img src="/DropdownLogo.svg" alt="Dropdown Icon" className="w-4 h-4" />
          </button>
        </div>
        <p><strong>Mobile Number:</strong> {farmer.mobile || "N/A"}</p>
        <p><strong>Email Address:</strong> {farmer.email || "N/A"}</p>
        <p><strong>Assigned R.E:</strong> {farmer.reName || "N/A"} (ID: {farmer.reId})</p>
        <p><strong>Farmer ID:</strong> {farmer.id}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
        <p><strong>Registration:</strong> {farmer.createdAt?.toDate().toDateString() || "Not available"}</p>
      </div>

      {farmer.farms && farmer.farms.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-green-700 mb-2 text-[32px]">Farms</h2>
          <table className="w-full border text-sm text-center text-[16px]">
            <thead>
              <tr>
                <th className="p-6 border">Farm Name</th>
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
      )}
    </div>
  );
}

