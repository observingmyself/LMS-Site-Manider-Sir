import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEbook = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [courseIdForCourse, setCourseIdForCourse] = useState("");
  const [ebookFile, setEbookFile] = useState(null);
  const [ebooks, setEbooks] = useState([]); // To store eBooks of the selected course
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    courseId: false,
    title: false,
    ebookFile: false,
  });

  const validation = () => {
    const errorState = {
      courseId: !courseId,
      title: !title,
      ebookFile: !ebookFile,
    };
    setErrors(errorState);
    return !Object.values(errorState).includes(true); // returns true if no errors
  };

  const getCourses = async () => {
    try {
      const data = await axios.get(`/api/v1/course/courses`);
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
    formData.append("ebookUrl", ebookFile);

    try {
      const data = await axios.post(
        `/api/v1/course/addEbook/${courseId}`,
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
        setEbookFile(null);
        getCourses();
      }
    } catch (e) {
      console.log("Error adding ebook:", e);
      toast.error("Failed to add eBook");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEbookFile(file);
  };

  // Fetch eBooks when courseIdForCourse changes
  useEffect(() => {
    const fetchEbooks = async () => {
      if (!courseIdForCourse) {
        setEbooks([]); // Clear eBooks when no course is selected
        return;
      }
      try {
        const data = await axios.get(
          `/api/v1/course/Ebook/${courseIdForCourse}`
        );
        if (data) {
          setEbooks(data.data.data.ebooks); // Assuming the API response contains the eBooks
        }
      } catch (e) {
        console.log("Error fetching eBooks:", e);
        toast.error("Failed to fetch eBooks");
      }
    };

    fetchEbooks();
  }, [courseIdForCourse]);

  const handleDelete = async (ebookId) => {
    try {
      const data = await axios.delete(`/api/v1/course/removeEbook/${ebookId}`);
      if (data) {
        toast.success("Ebook Deleted");
        // Refresh the list of eBooks
        const fetchEbooks = async () => {
          if (!courseIdForCourse) {
            setEbooks([]);
            return;
          }
          try {
            const data = await axios.get(
              `/api/v1/course/Ebook/${courseIdForCourse}`
            );
            if (data) {
              setEbooks(data.data.data.ebooks);
            }
          } catch (e) {
            console.log("Error fetching eBooks:", e);
            toast.error("Failed to fetch eBooks");
          }
        };

        fetchEbooks();
      }
    } catch (e) {
      console.log("Error deleting ebook:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add EBook</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label
              htmlFor="ebookTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Title of eBook
            </label>
            <input
              id="ebookTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name of eBook"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload eBook File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              id="fileUpload"
              name="fileUpload"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            {errors.ebookFile && (
              <p className="text-red-500 text-sm mt-1">File is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Display eBooks */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">View eBooks by Course</h3>
        <div className="mb-4">
          <label
            htmlFor="viewEbooks"
            className="block text-sm font-medium text-gray-700"
          >
            Select Course
          </label>
          <select
            id="viewEbooks"
            value={courseIdForCourse}
            onChange={(e) => setCourseIdForCourse(e.target.value)}
            name="viewEbooks"
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

        <div>
          {ebooks.length > 0 ? (
            <ul className="space-y-2">
              {ebooks.map((ebook) => (
                <li
                  key={ebook._id}
                  className="p-3 border rounded flex justify-between items-center"
                >
                  <span title="name of ebook" className="font-semibold">
                    {ebook.title}
                  </span>
                  <span
                    title="delete ebook"
                    className="cursor-pointer"
                    onClick={() => handleDelete(ebook._id)}
                  >
                    <box-icon name="trash" color="#ff0000"></box-icon>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No eBooks available for this course.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEbook;
