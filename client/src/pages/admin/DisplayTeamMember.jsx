import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {toast} from 'react-toastify'
const DisplayTeamMember = () => {
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();
  const getTeamMembers = async () => {
    try {
      const data = await axios.get("/api/v1/team");
      if (data.data.success) {
        setTeam(data.data.data);
      } else {
        console.log("Failed to get team members");
      }
    } catch (e) {
      console.log("err in getting team member", e);
    }
  };

  useEffect(() => {
    getTeamMembers();
  }, []);


  const handleDelete = async (id) => {
    try{
      const data = await axios.delete(`/api/v1/team/delete/${id}`);
      getTeamMembers();
      if(data.data.success){
        console.log(data);
        toast.success(data.data.data)
      }
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="px-4 lg:px-8 h-screen w-screen">
      <h4 className="text-2xl lg:text-3xl font-semibold text-center mb-6 text-gray-800">
        Team Members Table
      </h4>
      {/* Wrapper with overflow-x-auto */}
      <div className="overflow-x-auto border rounded-lg shadow-lg">
        <table className="table-auto w-full bg-white border-collapse min-w-[800px]">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3 border">S.No.</th>
              <th className="px-4 py-3 border">Post Image</th>
              <th className="px-4 py-3 border">Post Name</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Remove Action</th>
              <th className="px-4 py-3 border">Update Action</th>
            </tr>
          </thead>
          <tbody>
            {team?.map((member, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <img src={member.image} alt="" className="mx-auto h-[90px]" />
                </td>
                <td claxssName="px-4 py-2 border">{member.name}</td>
                <td claxssName="px-4 py-2 border">{member.position}</td>
                <td className="px-4 py-2 border">
                  {new Date(member.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(member._id)}
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
                <td className="px-4 py-2 border">
                  <button
                    className="px-2 py-2 flex items-center justify-center hover:scale-150 transition-all duration-100 text-white mx-auto rounded-sm"
                    onClick={() =>
                      navigate(`/admin/dashboard/updateTeam/${member._id}`)
                    }
                  >
                    <box-icon name="edit-alt"></box-icon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTeamMember;
