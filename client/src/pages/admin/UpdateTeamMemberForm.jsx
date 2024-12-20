import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import {toast} from 'react-toastify'

const UpdateTeamMemberForm = () => {
    const {id} = useParams();
    const [updateMemberImage,setUpdateMemberImage] = useState(null);
    const [updatedName,setUpdatedName] = useState('')
    const [updatedPosition,setUpdatedPosition] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setUpdateMemberImage(file)
    }

    const handleImageUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try{
            const data = await axios.patch(`/api/v1/team/updateImage/${id}`,{
                image : updateMemberImage
            })
            if(data.data.success){
                toast.success('Member Image Updated')
                console.log(data)
                setIsLoading(false)
            }
        }catch(e){
            console.log(e)
            toast.error('Failed to update member image.')
            setIsLoading(false)
            return;
        }
    }
  return (
    <div className="flex flex-col  items-center justify-center gap-3">
      <div className="bg-white w-96 px-5 py-5 shadow-lg">
        {" "}
        <h4 className="text-center text-xl font-bold text-gray-700">
          Update Team Member
        </h4>
        <form onSubmit={handleImageUpdate} className="flex gap-1 flex-col mt-5">
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
      </div>
    </div>
  );
}

export default UpdateTeamMemberForm