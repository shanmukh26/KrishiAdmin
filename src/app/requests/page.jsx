'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/fireabase';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [reportLinks, setReportLinks] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'SoilTest_Requests'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(data);
    };

    fetchRequests();
  }, []);

  const handleInputChange = (id, value) => {
    setReportLinks(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (id) => {
    const link = reportLinks[id];
    if (!link) return alert('Please enter a valid link.');

    try {
      await updateDoc(doc(db, 'SoilTest_Requests', id), {
        pdfFileLink: link
      });
      alert('Report link submitted successfully!');
      // Refresh page data
      setRequests(prev =>
        prev.map(r => (r.id === id ? { ...r, pdfFileLink: link } : r))
      );
    } catch (error) {
      console.error('Error submitting report link:', error);
      alert('Failed to submit report link.');
    }
  };

  const currentRequests = requests.filter(r => !r.pdfFileLink);
  const pastRequests = requests.filter(r => r.pdfFileLink);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Requests</h1>

      {/* CURRENT REQUESTS */}
      <div className="bg-white rounded mb-10">
        <h2 className="text-xl font-semibold mb-4">Pending Soil Test Requests</h2>

        {currentRequests.length === 0 ? (
          <p className="text-gray-500 mb-4">No pending requests.</p>
        ) : (
          <table className="w-full text-left border border-collapse text-[16px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-4">Farmer ID</th>
                <th className="border p-4">Farmer Name</th>
                <th className="border p-4">Location</th>
                <th className="border p-4 text-center">Report Link</th>
                <th className="border p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((req) => (
                <tr key={req.id} className="text-center">
                  <td className="border p-4">{req.farmer?.id || req.farmerId}</td>
                  <td className="border p-4">{req.farmer?.name || req.farmerName}</td>
                  <td className="border p-4">{req.farmer?.location || 'N/A'}</td>
                  <td className="border p-4">
                    <input
                      type="text"
                      value={reportLinks[req.id] || ''}
                      onChange={(e) => handleInputChange(req.id, e.target.value)}
                      placeholder="Enter report link"
                      className="w-full border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border p-4">
                    <button
                      onClick={() => handleSubmit(req.id)}
                      className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAST REQUESTS */}
      <div className="bg-white rounded">
        <h2 className="text-xl font-semibold mb-4">Past Submitted Reports</h2>

        {pastRequests.length === 0 ? (
          <p className="text-gray-500 mb-4">No submitted reports found.</p>
        ) : (
          <table className="w-full text-left border border-collapse text-[16px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-4">Farmer ID</th>
                <th className="border p-4">Farmer Name</th>
                <th className="border p-4">Location</th>
                <th className="border p-4 text-center">Report Link</th>
              </tr>
            </thead>
            <tbody>
              {pastRequests.map((req) => (
                <tr key={req.id} className="text-center">
                  <td className="border p-4">{req.farmer?.id || req.farmerId}</td>
                  <td className="border p-4">{req.farmer?.name || req.farmerName}</td>
                  <td className="border p-4">{req.farmer?.location || 'N/A'}</td>
                  <td className="border p-4">
                    <a
                      href={req.pdfFileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Report
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
