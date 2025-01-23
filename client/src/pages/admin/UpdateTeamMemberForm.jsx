import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const UpdateTeamMemberForm = () => {
  const { id } = useParams();
  const [updateMemberImage, setUpdateMemberImage] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPosition, setUpdatedPosition] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [singleMember, setSingleMember] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateMemberImage(file);
    // console.log(file)
  };

  const handleImageUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", updateMemberImage);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/team/updateImage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.data.success) {
        toast.success("Member Image Updated");
        // console.log(data)
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update member image.");
      setIsLoading(false);
      return;
    }
  };

  const getSingleTeamMember = async () => {
    try {
      const data = await axios.get(`${baseURL}/api/v1/team/singleMember/${id}`);
      if (data) {
        setUpdatedName(data.data.data.name);
        setUpdatedPosition(data.data.data.position);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSingleTeamMember();
  }, [id]);
  const handleContentUpdate = async (e) => {
    e.preventDefault();
    setIsContentLoading(true);
    try {
      const data = await axios.patch(`${baseURL}/api/v1/team/update/${id}`, {
        name: updatedName,
        position: updatedPosition,
      });
      if (data) {
        toast.success("Member Content Updated");
        console.log(data);
        setIsContentLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to update member content.");
      setIsContentLoading(false);
      return;
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center gap-3">
      <div className="bg-white w-96 px-5 py-5 shadow-lg">
        {" "}
        <h4 className="text-center text-xl font-bold text-gray-700">
          Update Team Member
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
              accept="image/*"
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
              Update Member Name
            </label>
            <input
              type="text"
              id="memberName"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Enter updated name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="memberposition"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Update Member position
            </label>
            <input
              type="text"
              id="memberposition"
              value={updatedPosition}
              onChange={(e) => setUpdatedPosition(e.target.value)}
              placeholder="Enter updated name"
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

export default UpdateTeamMemberForm;
