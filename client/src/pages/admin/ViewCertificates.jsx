import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  const getAllCertificates = async () => {
    try {
      const data = await axios.get("/api/v1/certificate");
      if (data) {
        setCertificates(data.data.data.data);
        // console.log(data.data.data.data)
    }
    } catch (e) {
      console.log("Error in getting certificates", e);
    }
  };

  useEffect(() => {
    getAllCertificates();
  }, []);

  const handleDelete = async (id) => {
    try{
        const data = await axios.delete(`/api/v1/certificate/${id}`)
        if(data.data.success){
            toast.success(data.data.data)
            getAllCertificates();
        }
    }catch(e){
        console.log("Error in deleting certificate", e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          View Certificates
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 border border-gray-300">Name</th>
                <th className="p-4 border border-gray-300">Date of Birth</th>
                <th className="p-4 border border-gray-300">Course</th>
                <th className="p-4 border border-gray-300">Certificate</th>
                <th className="p-4 border border-gray-300">Delete Action</th>
                <th className="p-4 border border-gray-300">Edit Action</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="p-4 border border-gray-300">
                    {certificate.name}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {new Date(certificate.DOB).toLocaleDateString()}
                  </td>
                  <td className="p-4 border border-gray-300">
                    {certificate.course}
                  </td>
                  <td className="p-4 border border-gray-300">
                    <a
                      href={`https://drive.google.com/file/d/${certificate.fileId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Certificate
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(certificate._id)}
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
                  <td className="px-4 flex items-center justify-center py-2 border">
                    <button onClick={()=>navigate(`/admin/dashboard/edit-certificate/${certificate._id}`)} className="">
                      <box-icon
                        type="solid"
                        name="message-rounded-edit"
                      ></box-icon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCertificates;