'use client';
import { useState } from 'react';
import { db } from '../../../lib/fireabase'; // adjust path as needed
import {
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';

export default function AddFarmer() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [reId, setReId] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!name || !location || !crop || !reId) {
      setMessage('Please fill all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const farmerId = crypto.randomUUID(); // Or use a Firestore doc ID

      const reDocRef = doc(db, 'RE_details', reId);

      await updateDoc(reDocRef, {
        farmers: arrayUnion({
          id: farmerId,
          name,
          location,
          crop,
          createdAt: serverTimestamp(),
        }),
      });

      setMessage('✅ Farmer added successfully');
      setName('');
      setLocation('');
      setCrop('');
      setReId('');
    } catch (error) {
      console.error('Error adding farmer:', error);
      setMessage('❌ Failed to add farmer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Farmer</h1>

      <div className="mb-4">
        <label className="font-medium block mb-1">Farmer Name*</label>
        <input
          type="text"
          className="w-full rounded px-4 py-2 bg-[#DFDEDE]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="font-medium block mb-1">Location*</label>
        <input
          type="text"
          className="w-full rounded px-4 py-2 bg-[#DFDEDE]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="font-medium block mb-1">Crop Type*</label>
        <input
          type="text"
          className="w-full rounded px-4 py-2 bg-[#DFDEDE]"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="font-medium block mb-1">RE ID*</label>
        <input
          type="text"
          className="w-full rounded px-4 py-2 bg-[#DFDEDE]"
          placeholder="e.g. wt1PAcGZlPgTvqiWo52O661TBk62"
          value={reId}
          onChange={(e) => setReId(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-2 rounded text-white ${
          loading ? 'bg-gray-500' : 'bg-green-700 hover:bg-green-800'
        }`}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Farmer'}
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.includes('✅') ? 'text-green-700' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
