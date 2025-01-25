import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const EditCertificate = () => {
  const [certificate, setCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [course, setCourse] = useState("");

  const { id } = useParams();
  // console.log(id)
  const getSingleCourse = async () => {
    try {
      const data = await axios.get(
        `${baseURL}/api/v1/certificate/single-certificate/${id}`,
        {
          withCredentials: true,
        }
      );
      if (data.data.success) {
        setCourse(data.data.data.course);
        setName(data.data.data.name);
        setDob(data.data.data.DOB);
      }
    } catch (e) {
      console.log("err in getting single course", e);
    }
  };
  useEffect(() => {
    getSingleCourse();
  }, []);

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("certificateImg", certificate);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/certificate/updateImg/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (data.data.success) {
        toast.success(data.data.data);
        setCertificate(null);
      }
    } catch (e) {
      console.log(e, "error updating image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentUpdate = async (e) => {
    e.preventDefault();
    setIsContentLoading(true);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/certificate/update/${id}`,
        {
          name: name,
          DOB: dob,
          course: course,
        },
        {
          withCredentials: true,
        }
      );
      if (data.data.success) {
        toast.success("Certificate Content Updated");
      }
    } catch (e) {
      console.log("err in updating course", e);
    } finally {
      setIsContentLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
  };
  return (
    <div className="flex flex-col  items-center justify-center gap-3">
      <div className="bg-white w-96 px-5 py-5 shadow-lg">
        {" "}
        <h4 className="text-center text-xl font-bold text-gray-700">
          Update Certificate
        </h4>
        <form
          onSubmit={(e) => handleImageUpdate(e)}
          className="flex gap-1 flex-col mt-5"
        >
          <div className="mb-4">
            <label
              htmlFor="newsImage"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Update Member Image
            </label>
            <input
              type="file"
              id="newsImage"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div>
              <button
                type="submit"
                className="mt-3 px-6 font-bold py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200 rounded-md text-white"
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handleContentUpdate}>
          <div className="mb-4">
            <label
              htmlFor="memberName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Update Student Name
            </label>
            <input
              type="text"
              id="memberName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="memberposition"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Update DOB
            </label>
            <input
              type="date"
              id="memberposition"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter DOB"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Update DOB
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter DOB"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md font-bold"
            >
              {isContentLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCertificate;
