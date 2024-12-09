import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayRegistration = () => {
  const [registrations, setRegistrations] = useState([]);

  const getRegistration = async () => {
    try {
      const { data } = await axios.post("/api/v1/register/getData");
      if (data) {
        setRegistrations(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRegistration();
  }, []);

  return (
    <div className="px-4 lg:px-8 h-screen w-screen">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Registered Students
      </h4>
      {/* Wrapper with overflow-x-auto */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-full bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No.</th>
              <th className="px-4 py-3 border">Student Name</th>
              <th className="px-4 py-3 border">Class</th>
              <th className="px-4 py-3 border">Mode</th>
              <th className="px-4 py-3 border">School Name</th>
              <th className="px-4 py-3 border">Gender</th>
              <th className="px-4 py-3 border">DOB</th>
              <th className="px-4 py-3 border">Guardian Name</th>
              <th className="px-4 py-3 border">Contact No.</th>
              <th className="px-4 py-3 border">Address</th>
              <th className="px-4 py-3 border">City</th>
              <th className="px-4 py-3 border">State</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{registration.name}</td>
                <td className="px-4 py-2 border">{registration.classs}</td>
                <td className="px-4 py-2 border">{registration.mode}</td>
                <td className="px-4 py-2 border">{registration.school}</td>
                <td className="px-4 py-2 border">{registration.gender}</td>
                <td className="px-4 py-2 border text-nowrap">
                  {registration.DOB?.slice(0, 10)}
                </td>
                <td className="px-4 py-2 border">{registration.fatherName}</td>
                <td className="px-4 py-2 border">{registration.contact}</td>
                <td className="px-4 py-2 border">{registration.Address}</td>
                <td className="px-4 py-2 border">{registration.city}</td>
                <td className="px-4 py-2 border">{registration.State}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayRegistration;
