import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../constant/constant";

const AddPPT = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [courseIdForCourse, setCourseIdForCourse] = useState("");
  const [ppt, setPpt] = useState(null);
  const [ppts, setPpts] = useState([]); // To store PPTs of the selected course
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    courseId: false,
    title: false,
    ppt: false,
  });

  // Function to validate fields
  const validation = () => {
    const errorState = {
      courseId: !courseId,
      title: !title,
      ppt: !ppt,
    };
    setErrors(errorState);
    return !Object.values(errorState).includes(true); // returns true if no errors
  };

  // Fetch the courses data
  const getCourses = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/course/courses`);
      if (data) {
        setCourses(data.data.data.data);
      }
    } catch (e) {
      console.log("Error fetching courses:", e);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validation()) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pptUrl", ppt);

    try {
      const data = await axios.post(
        `${baseURL}/api/v1/course/addppt/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        toast.success(data.data.message);
        setCourseId("");
        setTitle("");
        setPpt(null);
        getCourses();
      }
    } catch (e) {
      console.log("Error adding ppt:", e);
      toast.error("Failed to add ppt");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPpt(file);
  };

  // Fetch PPTs when courseIdForCourse changes
  useEffect(() => {
    const fetchPPTS = async () => {
      if (!courseIdForCourse) {
        setPpts([]); // Clear PPTs when no course is selected
        return;
      }
      try {
        const data = await axios.get(
          `${baseURL}/api/v1/course/ppt/${courseIdForCourse}`
        );
        if (data) {
          setPpts(data.data.data.ppt); // Assuming the API response contains the PPTs
        }
      } catch (e) {
        console.log("Error fetching ppt:", e);
        toast.error("Failed to fetch ppt");
      }
    };

    fetchPPTS();
  }, [courseIdForCourse]);

  const handleDelete = async (pptId) => {
    try {
      const data = await axios.delete(
        `${baseURL}/api/v1/course/removePPT/${pptId}`
      );
      if (data) {
        toast.success("PPT Deleted");
        // Refresh the list of PPTs
        const fetchPPTS = async () => {
          if (!courseIdForCourse) {
            setPpts([]);
            return;
          }
          try {
            const data = await axios.get(
              `${baseURL}/api/v1/course/ppt/${courseIdForCourse}`
            );
            if (data) {
              setPpts(data.data.data.ppt);
            }
          } catch (e) {
            console.log("Error fetching ppt:", e);
            toast.error("Failed to fetch ppt");
          }
        };

        fetchPPTS();
      }
    } catch (e) {
      console.log("Error deleting ppt:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add PPT</h2>
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

          {/* Title Input */}
          <div>
            <label
              htmlFor="pptTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Title of PPT
            </label>
            <input
              id="pptTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name of PPT"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          {/* File Upload Input */}
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload PPT File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              id="fileUpload"
              name="fileUpload"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.ppt && (
              <p className="text-red-500 text-sm mt-1">File is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Display PPTs */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">View PPT by Course</h3>
        <div className="mb-4">
          <label
            htmlFor="viewPPTs"
            className="block text-sm font-medium text-gray-700"
          >
            Select Course
          </label>
          <select
            id="viewPPTs"
            value={courseIdForCourse}
            onChange={(e) => setCourseIdForCourse(e.target.value)}
            name="viewPPTs"
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Course</option>
            {courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.courseTitle}
              </option>
            ))}
          </select>
        </div>

        {/* List of PPTs */}
        <div>
          {ppts.length > 0 ? (
            <ul className="space-y-2">
              {ppts.map((ppt) => (
                <li
                  key={ppt._id}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <span title="name of ppt" className="font-semibold">
                    {ppt.title}
                  </span>
                  <span
                    title="delete ppt"
                    className="cursor-pointer"
                    onClick={() => handleDelete(ppt._id)}
                  >
                    <box-icon name="trash" color="#ff0000"></box-icon>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No PPTs available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPPT;
