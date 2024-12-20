import axios from 'axios';
import React,{useState} from 'react'
import { toast } from 'react-toastify';

const TeamMemberAddForm = () => {
      const [isLoading, setIsLoading] = useState(false);
      const [memberName, setMemberName] = useState('');
      const [memberPosition, setMemberPosition] = useState('');
      const [memberImage, setMemberImage] = useState('');


      const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name",memberName)
        formData.append("position",memberPosition)
        formData.append("image",memberImage)
        try{
            const data = await axios.post('/api/v1/team/create',formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                }
            })
            if(data.data.success){
                toast.success(data.data.message)
            }
            else{
                toast.error(data.data.message)
            }
        }catch(err){
            console.log("err in creating team member",err)
        }finally{
            setIsLoading(false);
        }
      }

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMemberImage(file)
      }
  return (
    <div className="min-h-screen bg-slate-100 mt-2 flex items-start justify-center">
      <form
        className="bg-white mt-4 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Insert Team Member Form
        </h2>

        {/* Team Member Image */}
        <div className="mb-4">
          <label
            htmlFor="memberImage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Member Image
          </label>
          <input
            type="file"
            id="memberImage"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Member name */}
        <div className="mb-4">
          <label
            htmlFor="memberName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Member Name
          </label>
          <input
            type="text"
            id="memberName"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            placeholder="Enter headline"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* member position */}
        <div className="mb-4">
          <label
            htmlFor="memberPosition"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Member Position
          </label>
          <input
            type="text"
            id="memberPosition"
            value={memberPosition}
            onChange={(e) => setMemberPosition(e.target.value)}
            placeholder="Enter headline"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
}

export default TeamMemberAddForm