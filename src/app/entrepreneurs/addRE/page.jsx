'use client';
import { useState } from 'react';
import { db } from '../../../lib/fireabase';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function AddEntrepreneur() {
  const [form, setForm] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const uid = uuidv4(); // use Firebase Auth UID if using auth

    const entrepreneurData = {
      uid: uid,
      title: form.title,
      firstName: form.firstName,
      lastName: form.lastName,
      mobile: form.mobile,
      email: form.email,
      gender: form.gender,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      createdAt: serverTimestamp(),
      hasQualifiedTest: true,
      farmers: [],
    };

    try {
      setLoading(true);
      await setDoc(doc(collection(db, 'RE_details'), uid), entrepreneurData);
      alert('Entrepreneur account created successfully!');
      setForm({
        title: 'Mr.',
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        gender: 'Male',
        address: '',
        city: '',
        state: '',
        pincode: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error writing document:', error);
      alert('Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Rural Entrepreneur Registration</h1>

      {/* Title, First Name, Last Name */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col w-24">
          <select
            className="border px-2 py-2 rounded"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
          >
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-sm font-medium">First Name*</label>
          <input
            type="text"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-sm font-medium">Last Name*</label>
          <input
            type="text"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="mb-4">
        <label className="mb-1 text-sm font-medium block">Mobile Number*</label>
        <input
          type="text"
          className="rounded px-4 py-2 bg-[#DFDEDE] w-full"
          value={form.mobile}
          onChange={e => handleChange('mobile', e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="mb-1 text-sm font-medium block">Email Address*</label>
        <input
          type="email"
          className="rounded px-4 py-2 bg-[#DFDEDE] w-full"
          value={form.email}
          onChange={e => handleChange('email', e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="mb-1 text-sm font-medium block">Gender*</label>
        <div className="flex gap-4">
          {['Male', 'Female', 'Prefer not to say'].map(g => (
            <label key={g}>
              <input
                type="radio"
                name="gender"
                value={g}
                checked={form.gender === g}
                onChange={e => handleChange('gender', e.target.value)}
                className="mr-1"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="mb-1 text-sm font-medium block">Address*</label>
        <input
          type="text"
          className="rounded px-4 py-2 bg-[#DFDEDE] w-full"
          value={form.address}
          onChange={e => handleChange('address', e.target.value)}
        />
      </div>

      {/* State & City */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium">State*</label>
          <input
            type="text"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.state}
            onChange={e => handleChange('state', e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium">City*</label>
          <input
            type="text"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.city}
            onChange={e => handleChange('city', e.target.value)}
          />
        </div>
      </div>

      {/* Pincode */}
      <div className="mb-4">
        <label className="mb-1 text-sm font-medium">Pincode*</label>
        <input
          type="text"
          className="rounded px-4 py-2 bg-[#DFDEDE] w-full"
          value={form.pincode}
          onChange={e => handleChange('pincode', e.target.value)}
        />
      </div>

      {/* Password & Confirm Password */}
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium">Password*</label>
          <input
            type="password"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-1 text-sm font-medium">Confirm Password*</label>
          <input
            type="password"
            className="rounded px-4 py-2 bg-[#DFDEDE]"
            value={form.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-green-800 text-white w-full py-2 rounded hover:bg-green-900 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
