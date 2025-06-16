'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/fireabase';

export default function EntrepreneursPage() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      const snapshot = await getDocs(collection(db, 'RE_details'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntrepreneurs(data);
    };

    fetchEntrepreneurs();
  }, []);

  return (
    <div className="p-6 mx-30">
      <h1 className="text-[32px] font-bold mb-6">All Rural Entrepreneurs</h1>

      <button
        onClick={() => router.push(`/entrepreneurs/addRE`)}
        className="bg-[#25632D] mb-10 text-white px-8 py-2 rounded cursor-pointer"
      >
        + Add an R.E
      </button>

      <table className="min-w-full bg-white text-center">
        <thead className="border">
          <tr>
            <th className="p-6 border">ID</th>
            <th className="p-6 border">Name</th>
            <th className="p-6 border">Mobile Number</th>
            <th className="p-6 border">State</th>
          </tr>
        </thead>
        <tbody>
          {entrepreneurs.map((entrepreneur) => (
            <tr
              key={entrepreneur.id}
              onClick={() => router.push(`/entrepreneurs/${entrepreneur.id}`)}
              className="cursor-pointer hover:bg-gray-100 border"
            >
              <td className="p-6 border">{entrepreneur.id}</td>
              <td className="p-6 border">
                {entrepreneur.title} {entrepreneur.firstName} {entrepreneur.lastName}
              </td>
              <td className="p-6 border">{entrepreneur.mobile}</td>
              <td className="p-6 border">{entrepreneur.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
