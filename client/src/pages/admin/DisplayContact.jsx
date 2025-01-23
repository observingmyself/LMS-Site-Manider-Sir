import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const DisplayContact = () => {
  const [contacts, setContacts] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getContacts = async (page = 1) => {
    try {
      const data = await axios.post(`${baseURL}/api/v1/contact?page=${page}`);
      if (data) {
        setContacts(data.data.data.contacts);
        setPages(data.data.data.Pages);
        setCurrentPage(page);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`${baseURL}/api/v1/contact/${id}`);
      if (data) {
        getContacts(currentPage);
        toast.success("Query Deleted");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-4 lg:px-8 h-screen w-screen">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Contact Table
      </h4>
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-full bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No.</th>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Subject</th>
              <th className="px-4 py-3 border">Message</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Remove Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((cr, index) => (
              <tr
                key={cr._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="px-4 py-2 border">{cr.name}</td>
                <td className="px-4 py-2 border">{cr.email}</td>
                <td className="px-4 py-2 border">{cr.subject}</td>
                <td className="px-4 py-2 border">{cr.message}</td>
                <td className="px-4 py-2 border">
                  {new Date(cr.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(cr._id)}
                    className="flex items-center justify-center text-white mx-auto rounded-sm group"
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
                onClick={() => getContacts(index + 1)}
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

export default DisplayContact;
