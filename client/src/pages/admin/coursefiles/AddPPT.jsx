import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddPPT = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [courseIdForCourse, setCourseIdForCourse] = useState("");
  const [ppt,setPpt] = useState(null);
  const [ppts, setPpts] = useState([]); // To store eBooks of the selected course
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pptUrl", ppt);

    try {
      const data = await axios.post(
        `/api/v1/course/addppt/${courseId}`,
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

//   Fetch eBooks when courseIdForCourse changes
  useEffect(() => {
    const fetchPPTS = async () => {
      if (!courseIdForCourse) {
        setPpts([]); // Clear eBooks when no course is selected
        return;
      }
      try {
        const data = await axios.get(
          `/api/v1/course/ppt/${courseIdForCourse}`
        );
        if (data) {
          setPpts(data.data.data.ppt); // Assuming the API response contains the eBooks
        //   console.log(data)
        }
      } catch (e) {
        console.log("Error fetching ppt:", e);
        toast.error("Failed to fetch ppt");
      }
    };

    fetchPPTS()
  }, [courseIdForCourse]);


  const handleDelete = async (pptId) => {
    try{
        const data = await axios.delete(`/api/v1/course/removePPT/${pptId}`);
        if(data){
            // console.log(data)
            toast.success(`PPT Deleted`)
            const fetchPPTS = async () => {
              if (!courseIdForCourse) {
                setPpts([]); 
                return;
              }
              try {
                const data = await axios.get(
                  `/api/v1/course/ppt/${courseIdForCourse}`
                );
                if (data) {
                  setPpts(data.data.data.ppt); // Assuming the API response contains the eBooks
                //   console.log(data);
                }
              } catch (e) {
                console.log("Error fetching ppt:", e);
                toast.error("Failed to fetch ppt");
              }
            };

            fetchPPTS()
        }
    }catch(e){
        console.log('err in deleting',e)
    }
  } 
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Add PPT</h2>
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
          </div>

          <div>
            <label
              htmlFor="ebookTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Title of PPT
            </label>
            <input
              id="ebookTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter name of eBook"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

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
        <h3 className="text-lg font-semibold mb-4">View PPT by Course</h3>
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
          {ppts.length > 0 ? (
            <ul className="space-y-2">
              {ppts.map((ppt) => (
                <li key={ppt._id} className="p-3 border rounded flex justify-between items-center">
                  <span title="name of ppt" className="font-semibold">
                {ppt.title}
                  </span>
                  <span title="delete ppt" className="cursor-pointer" onClick={()=>handleDelete(ppt._id)}>
                    <box-icon name="trash" color="#ff0000"></box-icon>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No Ppts available for this course.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPPT;
