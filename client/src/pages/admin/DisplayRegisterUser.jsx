import axios from "axios";
import React, { useEffect, useState } from "react";

const DisplayRegisterUser = () => {
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllUsers = async (page = 1) => {
    try {
      const data = await axios.post(`/api/v1/user?page=${page}`);
      if (data) {
        setUsers(data.data.data.users);
        setPages(data.data.data.Pages);
        setCurrentPage(page);
      }
    } catch (e) {
      console.log("Error in getting users", e);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-center text-gray-800 mb-6">
          Registered Users
        </h1>

        {/* Wrapper with overflow-x-auto for responsiveness */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border-collapse min-w-[800px]">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 border">S.No</th>
                <th className="px-4 py-3 border">Username</th>
                <th className="px-4 py-3 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user?._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 border text-center">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="px-4 py-3 border">{user?.userName}</td>
                  <td className="px-4 py-3 border">{user?.email}</td>
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
                  onClick={() => getAllUsers(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DisplayRegisterUser;
