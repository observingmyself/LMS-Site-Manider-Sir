import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const DisplayRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getRegistration = async (page = 1) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/v1/register/getData?page=${page}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (data) {
        console.log(data);
        setRegistrations(data.data.data); // Assuming the data structure
        setPages(data.data.Pages); // Assuming the pagination details
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRegistration();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`${baseURL}/api/v1/register/${id}`, {
        withCredentials: true,
      });
      getRegistration();
      toast.success("Registration deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 lg:px-8 h-screen w-screen ">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Registered Students
      </h4>
      {/* Wrapper with overflow-x-auto */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-screen bg-white border-collapse min-w-[800px]">
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
              <th className="px-4 py-3 border">RegisteredOn</th>
              <th className="px-4 py-3 border">Delete</th>
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
                  {new Date(registration.DOB).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border">{registration.fatherName}</td>
                <td className="px-4 py-2 border">{registration.contact}</td>
                <td className="px-4 py-2 border">{registration.Address}</td>
                <td className="px-4 py-2 border">{registration.city}</td>
                <td className="px-4 py-2 border">{registration.State}</td>
                <td className="px-4 py-2 border">
                  {new Date(registration.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(registration._id)}
                    className="flex items-center justify-center group text-white mx-auto rounded-sm"
                  >
                    <span className="group-hover:hidden">
                      <box-icon name="trash" color="#fc2121"></box-icon>
                    </span>
                    <span className="hidden group-hover:block">
                      <box-icon
                        name="trash"
                        animation="tada"
                        flip="horizontal"
                        color="red"
                      ></box-icon>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: pages }, (_, index) => (
              <li
                key={index + 1}
                className={`mx-1 px-3 py-1 border rounded-md cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  setCurrentPage(index + 1);
                  getRegistration(index + 1);
                }}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DisplayRegistration;
