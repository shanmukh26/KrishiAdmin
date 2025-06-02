import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 h-30">
      <div className=" mx-auto px-6 flex justify-between items-center h-full">
        
        {/* Logo Section - Left Aligned */}
        <div className="flex items-center">
          <img
            src="/kriSHECarbonLogo.svg"
            alt="KriSHE Carbon"
            className="h-20 w-auto h-[107px] ml-20"
          />
        </div>

        {/* Right Side: Nav Links + Profile */}
        <div className="flex items-center space-x-30">
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-20 text-[20px] text-base font-semibold text-[#25632D] ">
            <a href="/" className="hover:text-green-600 ">Dashboard</a>
            <a href="/farmers" className="hover:text-green-600">Farmers</a>
            <a href="/entrepreneurs" className="hover:text-green-600">Rural Entrepreneurs</a>
            <a href="/requests" className="hover:text-green-600">Requests</a>
          </div>

          {/* User Icon */}
          <div>
            <img
              src="/NavbarProfileLogo.svg"
              alt="User Profile"
              className="h-10 w-10 bg-[#D9D9D9] rounded-full p-1 mr-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
