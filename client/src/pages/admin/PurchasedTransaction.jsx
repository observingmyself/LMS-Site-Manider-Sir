import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchasedTransaction = () => {
  const [payments, setPayments] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getTransaction = async (page = 1) => {
    try {
      const data = await axios.get(`/api/v1/payment?page=${page}`);
      if (data.data.success) {
        console.log(data)
        setPayments(data.data.data.data); // Assuming the data structure
        setPages(data.data.data.pages); // Assuming the pagination details
        setCurrentPage(page);
      }
    } catch (e) {
      console.log("Error in getting transaction", e);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
            Transaction History
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 sm:p-4 border border-gray-300">
                  Course Name
                </th>
                <th className="p-2 sm:p-4 border border-gray-300">Amount</th>
                <th className="p-2 sm:p-4 border border-gray-300">Status</th>
                <th className="p-2 sm:p-4 border border-gray-300">PaymentID</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((course, index) => (
                <tr
                  key={course?._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-2 sm:p-4 border border-gray-300">
                    {course?.courseId?.courseTitle}
                  </td>
                  <td className="p-2 sm:p-4 border border-gray-300">
                    {course?.amount}
                  </td>
                  <td className="p-2 sm:p-4 border cursor-pointer border-gray-300">
                    <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {course?.paymentStatus}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4 border border-gray-300">
                    <span className="text-gray-700 text-xs md:text-sm">
                      {course.paymentId}
                    </span>
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
                  onClick={() => getTransaction(index + 1)}
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

export default PurchasedTransaction;
