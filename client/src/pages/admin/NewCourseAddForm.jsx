import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewCourseAddForm = () => {
  const [courseTitle,setCourseTitle] = useState('')
  const [category,setCategory] = useState('')
  const [coursePrice,setCoursePrice] = useState('');
  const [description,setDescription] = useState('')
  const [subtitle,setSubtitle] = useState('')
  const [courseLevel,setCourseLevel] = useState('')
  const [courseDuration,setCourseDuration] = useState('')
  const [courseLanguage,setCourseLanguage] = useState('')
  const [instructor,setInstructor] = useState('')
  const [courseImage,setCourseImage] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try{
      const formData = new FormData()
      formData.append('courseTitle',courseTitle)
      formData.append('category',category)
      formData.append('coursePrice',coursePrice)
      formData.append('description',description)
      formData.append('subtitle',subtitle)
      formData.append('courseLevel',courseLevel)
      formData.append('courseDuration',courseDuration)
      formData.append('courseLanguage',courseLanguage)
      formData.append('instructor',instructor)
      formData.append('courseThumbnail',courseImage)
      
      const data = await axios.post('/api/v1/course/create',formData,{
        headers : {
          "Content-Type": "multipart/form-data",
        }})
        if(data.data.success){
          toast.success("Course created successfully")
        }
        else{
          console.log("Error creating course: ",data.data.message)
        }
    } catch(e){
      console.log("Error making course: ",e)
      toast.error("Error")
    } finally{
      setIsLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file= e.target.files[0]
    setCourseImage(file)
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white shadow-lg px-10 py-4 mb-10"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="courseImage" className="font-semibold">
            Course Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file:bg-blue-100 file:border file:cursor-pointer text-gray-700 file:rounded-sm file:border-sm file:mr-3 file:text-blue-700 file:px-2 file:py-1 text-sm"
            id="courseImage"
            accept="image/*"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseTitle" className="font-semibold">
            Course Title
          </label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter title*"
            id="courseTitle"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter category*"
            id="category"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="coursePrice" className="font-semibold">
            Price
          </label>
          <input
            type="text"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter price*"
            id="coursePrice"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="subtitle" className="font-semibold">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter subtitle*"
            id="subtitle"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="subtitle" className="font-semibold">
            Course Level
          </label>
          <select
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
          </select>
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="duration" className="font-semibold">
            Duration
          </label>
          <input
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter duration*"
            id="duration"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseLanguage" className="font-semibold">
            Course Language
          </label>
          <input
            type="text"
            value={courseLanguage}
            onChange={(e) => setCourseLanguage(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter language*"
            id="courseLanguage"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="instructor" className="font-semibold">
            Instructor
          </label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="enter instructor name*"
            id="instructor"
          />
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseDescription" className="font-semibold">
            Description
          </label>
          <textarea
            name="courseDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="enter course description*"
            id="courseDescription"
            className="px-2 py-2 outline-none border border-gray-300"
          ></textarea>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-400 hover:bg-blue-700 transition-all duration-200 text-white rounded-lg"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCourseAddForm