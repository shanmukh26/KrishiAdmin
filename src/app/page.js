'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '../lib/fireabase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Dashboard() {
  const [totalFarmers, setTotalFarmers] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [completedRequests, setCompletedRequests] = useState(0);

  useEffect(() => {
    async function loadStats() {
      try {
        // 1️⃣ Count TOTAL FARMERS across RE_details
        const reSnap = await getDocs(collection(db, 'RE_details'));
        let farmerCount = 0;
        reSnap.forEach(doc => {
          const arr = doc.data()?.farmers || [];
          farmerCount += arr.length;
        });
        setTotalFarmers(farmerCount);

        // 2️⃣ Count PENDING soil requests
        const pendingSnap = await getDocs(query(
          collection(db, 'SoilTest_Requests'),
          where('status', '==', 'pending')
        ));
        setPendingRequests(pendingSnap.size);

        // 3️⃣ Count COMPLETED soil requests
        const completedSnap = await getDocs(query(
          collection(db, 'SoilTest_Requests'),
          where('status', '==', 'completed')
        ));
        setCompletedRequests(completedSnap.size);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="mx-30 px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1C912A] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
          <div className="flex justify-center items-center">
            <Image src="/DashboardTotalFormers.svg" width={24} height={24} alt="Farmer Icon" />
            <p className="ml-2">Total Farmers</p>
          </div>
          <h2 className="text-3xl font-bold">{totalFarmers}</h2>
        </div>

        <div className="bg-[#19BA2E] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
          <div className="flex justify-center items-center">
            <Image src="/DahsboardPending.svg" width={24} height={24} alt="Pending Icon" />
            <p className="ml-2">Pending Soil Tests</p>
          </div>
          <h2 className="text-3xl font-bold">{pendingRequests}</h2>
        </div>

        <div className="bg-[#1C912A] text-white p-6 rounded-md shadow-md text-center flex flex-col items-center py-20">
          <div className="flex justify-center items-center">
            <Image src="/DashboardTaskIcon.svg" width={24} height={24} alt="Completed Icon" />
            <p className="ml-2">Completed Soil Requests</p>
          </div>
          <h2 className="text-3xl font-bold">{completedRequests}</h2>
        </div>
      </div>

      {/* Removed the bottom table as requested */}
    </div>
  );
}
