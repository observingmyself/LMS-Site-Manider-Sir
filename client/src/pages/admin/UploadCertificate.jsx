import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const UploadCertificate = () => {
  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCourse] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    studentName: "",
    dob: "",
    course: "",
    certificate: "",
  });

  // Validate the fields before submitting
  const validateFields = () => {
    let formErrors = {
      studentName: studentName ? "" : "Student name is required",
      dob: dob ? "" : "Date of birth is required",
      course: course ? "" : "Course is required",
      certificate: certificate ? "" : "Certificate is required",
    };
    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    if (!validateFields()) return;

    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("name", studentName);
    formdata.append("DOB", dob);
    formdata.append("course", course);
    formdata.append("certificateImg", certificate);

    try {
      const data = await axios.post(
        `${baseURL}/api/v1/certificate/create`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data.data.success) {
        toast.success(data.data.message);
        setStudentName("");
        setDob("");
        setCertificate(null);
        setCourse("");
      }
    } catch (e) {
      console.log("err in uploading certificate", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 mt-2 flex items-start justify-center">
      <form
        className="bg-white mt-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Upload Certificate
        </h2>

        {/* Certificate Upload */}
        <div className="mb-4">
          <label
            htmlFor="memberImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Certificate
          </label>
          <input
            type="file"
            id="memberImage"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.certificate && (
            <p className="text-red-500 text-sm mt-1">{errors.certificate}</p>
          )}
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <label
            htmlFor="studentName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Student Name
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label
            htmlFor="dob"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter dob"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Course */}
        <div className="mb-4">
          <label
            htmlFor="course"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Course
          </label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter Course"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.course && (
            <p className="text-red-500 text-sm mt-1">{errors.course}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {isLoading ? (
              <span>
                <svg
                  className="animate-spin h-5 w-5 mr-2 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCertificate;
