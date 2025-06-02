export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/LoginPageBGImage.svg')" }}
    >
      <div className="flex  shadow-lg p-8   gap-50">
        
        {/* Left Side - Logo */}
        <div className="w-70 h-70  bg-white flex items-center justify-center hidden md:flex rounded-[20px] my-auto">
          <img src="/kriSHECarbonLogo.svg" alt="Logo" className="w-55 h-55 object-contain " />
        </div>

        {/* Right Side - Login Form */}
        <div className="  w-150 h-100 bg-white p-10 rounded-[20px]">
          <h2 className="text-xl font-bold mb-8">Login</h2>
          <p className="text-sm text-black mb-2">Please login to your account</p>

          <input
            type="text"
            placeholder="Enter email/number"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
          />
          <p className="text-sm text-black mb-2">Please Enter Your Password</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />

          <button className="w-full bg-[#25632D] hover:bg-green-800 text-white py-2 rounded cursor-pointer">
            Login
          </button>

          <p className="text-center text-[#8E98A8] text-gray-600 mt-4">Admin access only.</p>
        </div>
      </div>
    </div>
  );
}
