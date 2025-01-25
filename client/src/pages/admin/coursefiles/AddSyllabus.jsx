import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../../constant/constant";

const AddSyllabus = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    courseId: false,
    syllabusFile: false,
  });

  // Function to validate fields
  const validateFields = () => {
    const errorState = {
      courseId: !courseId,
      syllabusFile: !syllabusFile,
    };
    setErrors(errorState);
    return !Object.values(errorState).includes(true); // returns true if no errors
  };

  // Fetch the courses data
  const getCourses = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/course/courses`, {
        withCredentials: true,
      });
      if (data) {
        setCourses(data.data.data.data);
      }
    } catch (e) {
      console.log("err getting courses", e);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submission
    if (!validateFields()) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("syllabus", syllabusFile);

    try {
      const data = await axios.post(
        `${baseURL}/api/v1/course/addSyllabus/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data) {
        toast.success(data.data.data);
        setCourseId("");
        setSyllabusFile(null);
        getCourses();
      }
    } catch (e) {
      console.log("err in adding syllabus", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSyllabusFile(file);
  };

  const handleDelete = async (id, syllabusId) => {
    try {
      const data = await axios.delete(
        `${baseURL}/api/v1/course/removeSyllabus/${id}/${syllabusId}`,
        {
          withCredentials: true,
        }
      );
      if (data) {
        toast.success(data.data.data);
        getCourses();
      }
    } catch (e) {
      console.log("err in deleting syllabus", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add Syllabus
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Course */}
          <div>
            <label
              htmlFor="selectSubject"
              className="block text-sm font-medium text-gray-700"
            >
              Select Course
            </label>
            <select
              id="selectSubject"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              name="selectSubject"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Course</option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseTitle}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="text-red-500 text-sm mt-1">Course is required</p>
            )}
          </div>

          {/* File Upload Input */}
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Syllabus File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              id="fileUpload"
              name="fileUpload"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.syllabusFile && (
              <p className="text-red-500 text-sm mt-1">File is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-4xl">
        <h4 className="text-3xl font-semibold text-center mb-6 underline italic">
          All Syllabus Files
        </h4>
        {courses?.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-lg shadow-md mb-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {course.courseTitle}
            </h3>
            <ul className="space-y-4">
              {course.syllabus?.map((syllabus) => (
                <li
                  key={syllabus._id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
                >
                  <span className="text-gray-700">{syllabus.fileName}</span>
                  <div className="space-x-4">
                    <button
                      onClick={() => handleDelete(course._id, syllabus._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <box-icon name="trash" color="#ff0000"></box-icon>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSyllabus;
