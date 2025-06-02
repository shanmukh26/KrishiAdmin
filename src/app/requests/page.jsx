'use client';

export default function RequestsPage() {
  const soilRequests = [
    { id: 1, name: '', location: '', result: '', comment: '' },
    { id: 2, name: '', location: '', result: '', comment: '' },
    { id: 3, name: '', location: '', result: '', comment: '' }
  ];

  return (
    <div className="p-8 mx-30">
      <h1 className="text-3xl font-semibold mb-6">Requests</h1>

      <div className="bg-white  rounded ">
        <h2 className="text-xl font-semibold mb-4">Soil Test Requests</h2>

        <table className="w-full text-left border border-collapse text-[16px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-4">Farmer name</th>
              <th className="border p-4">Location</th>
              <th className="border p-4 text-center">Result</th>
              <th className="border p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {soilRequests.map((req) => (
              <tr key={req.id} className="text-center">
                <td className="border p-4">{req.name}</td>
                <td className="border p-4">{req.location}</td>
                <td className="border p-4">
                  <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                    Upload report
                  </button>
                </td>
                <td className="border p-4">
                  <textarea
                    placeholder="Type here"
                    rows={2}
                    className="w-full border rounded px-2 py-1 text-sm"
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
