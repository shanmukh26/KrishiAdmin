'use client';
import { useState } from 'react';

export default function AddFarmer() {
  const [showFarmForm, setShowFarmForm] = useState(false);

  return (
    <div className="p-8 mx-30 ">
      <h1 className="text-4xl font-bold mb-6">Rural Entrepreneur Form</h1>

      <div className="flex gap-6 flex-wrap mx-30">
        {/* Farmer Form */}
        <div className="flex-1 min-w-[300px]">
          {/* Title & Name */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-24 mt-6">
              {/* <label className="mb-1 text-sm font-medium">Title</label> */}
              <select className=" border px-2 py-2 rounded">
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-sm font-medium">Enter First Name*</label>
              <input type="text" className=" rounded px-4 py-2 bg-[#DFDEDE]" />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-sm font-medium">Enter Last Name*</label>
              <input type="text" className="rounded px-4 py-2 bg-[#DFDEDE]" />
            </div>
          </div>

          {/* Mobile */}
          <div className="mb-4">
            <label className="mb-1 text-sm font-medium block">Enter Mobile Number*</label>
            <input type="text" className="rounded px-4 py-2 bg-[#DFDEDE] w-full" />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="mb-1 text-sm font-medium block">Select Your Gender*</label>
            <div className="flex gap-4">
              <label><input type="radio" name="gender" defaultChecked className="mr-1" /> Male</label>
              <label><input type="radio" name="gender" className="mr-1" /> Female</label>
              <label><input type="radio" name="gender" className="mr-1" /> Prefer not to say</label>
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="mb-1 text-sm font-medium block">Enter Your Address*</label>
            <input type="text" className=" rounded px-4 py-2 w-full  bg-[#DFDEDE]" />
          </div>

          {/* State & City */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm font-medium">State*</label>
              <input type="text" className=" rounded px-4 py-2 bg-[#DFDEDE]" />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-1 text-sm font-medium">City*</label>
              <input type="text" className="rounded px-4 py-2 bg-[#DFDEDE]" />
            </div>
          </div>

          {/* Pincode & Add Farm */}
         
            <div className="flex flex-col w-1/2 mb-10">
              <label className="mb-1 text-sm font-medium">Pincode*</label>
              <input type="text" className="rounded px-4 py-2 bg-[#DFDEDE]" />
            </div>
          

          <button className="bg-green-800 text-white w-full py-2 rounded hover:bg-green-900">
            Submit
          </button>
        </div>

        
      </div>
    </div>
  );
}
