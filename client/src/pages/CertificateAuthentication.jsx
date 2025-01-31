import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../constant/constant";

const CertificateAuthentication = () => {
  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentNameuppercase = studentName.toUpperCase();
    // console.log(studentNameuppercase,dob)

    try {
      const data = await axios.post(
        `${baseURL}/api/v1/certificate/check`,
        {
          name: studentNameuppercase,
          DOB: dob,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        const driveLink = `https://drive.google.com/file/d/${data.data.data.fileId}/view?usp=sharing
`;
        window.location.href = driveLink;
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 bg-white py-10 px-10">
      <h2 className="text-center text-2xl font-semibold mb-5">
        Certificate Authentication
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 "
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        <div className="text-center w-full">
          <button
            type="submit"
            className="bg-[#FE0000] w-full text-white p-2 rounded-md hover:bg-[#D80000] transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateAuthentication;
