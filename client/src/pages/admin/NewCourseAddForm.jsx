import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const NewCourseAddForm = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("");
  const [instructor, setInstructor] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!courseTitle.trim()) newErrors.courseTitle = "This field is required.";
    if (!category.trim()) newErrors.category = "This field is required.";
    if (!coursePrice.trim()) newErrors.coursePrice = "This field is required.";
    if (!description.trim()) newErrors.description = "This field is required.";
    if (!subtitle.trim()) newErrors.subtitle = "This field is required.";
    if (!courseLevel.trim()) newErrors.courseLevel = "This field is required.";
    if (!courseDuration.trim())
      newErrors.courseDuration = "This field is required.";
    if (!courseLanguage.trim())
      newErrors.courseLanguage = "This field is required.";
    if (!instructor.trim()) newErrors.instructor = "This field is required.";
    if (!courseImage) newErrors.courseImage = "This field is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("courseTitle", courseTitle);
      formData.append("category", category);
      formData.append("coursePrice", coursePrice);
      formData.append("description", description);
      formData.append("subTitle", subtitle);
      formData.append("courseLevel", courseLevel);
      formData.append("courseDuration", courseDuration);
      formData.append("courseLanguage", courseLanguage);
      formData.append("instructor", instructor);
      formData.append("courseThumbnail", courseImage);

      const { data } = await axios.post("/api/v1/course/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data) {
        toast.success("Course created successfully");
        // Clear all fields
        setCourseTitle("");
        setCategory("");
        setCoursePrice("");
        setDescription("");
        setSubtitle("");
        setCourseLevel("");
        setCourseDuration("");
        setCourseLanguage("");
        setInstructor("");
        setCourseImage("");
        setErrors({});
      }
    } catch (error) {
      console.log("Error making course: ", error);
      toast.error("Error occurred while creating the course.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseImage(file);
  };

  return (
    <div className="flex flex-col items-center justify-center md:px-40">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg px-10 py-4 mb-10"
      >
        <h4 className="text-center text-xl font-bold mb-2">Add New Course</h4>
        {/* Course Image */}
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
          {errors.courseImage && (
            <p className="text-red-500 text-sm">{errors.courseImage}</p>
          )}
        </div>

        {/* Course Title */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseTitle" className="font-semibold">
            Course Title
          </label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter title*"
            id="courseTitle"
          />
          {errors.courseTitle && (
            <p className="text-red-500 text-sm">{errors.courseTitle}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter category*"
            id="category"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Course Price */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="coursePrice" className="font-semibold">
            Price
          </label>
          <input
            type="text"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter price*"
            id="coursePrice"
          />
          {errors.coursePrice && (
            <p className="text-red-500 text-sm">{errors.coursePrice}</p>
          )}
        </div>

        {/* Subtitle */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="subtitle" className="font-semibold">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter subtitle*"
            id="subtitle"
          />
          {errors.subtitle && (
            <p className="text-red-500 text-sm">{errors.subtitle}</p>
          )}
        </div>

        {/* Course Level */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseLevel" className="font-semibold">
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
          {errors.courseLevel && (
            <p className="text-red-500 text-sm">{errors.courseLevel}</p>
          )}
        </div>

        {/* Course Duration */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseDuration" className="font-semibold">
            Duration
          </label>
          <input
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter duration*"
            id="courseDuration"
          />
          {errors.courseDuration && (
            <p className="text-red-500 text-sm">{errors.courseDuration}</p>
          )}
        </div>

        {/* Course Language */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="courseLanguage" className="font-semibold">
            Course Language
          </label>
          <input
            type="text"
            value={courseLanguage}
            onChange={(e) => setCourseLanguage(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter language*"
            id="courseLanguage"
          />
          {errors.courseLanguage && (
            <p className="text-red-500 text-sm">{errors.courseLanguage}</p>
          )}
        </div>

        {/* Instructor */}
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="instructor" className="font-semibold">
            Instructor
          </label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter instructor*"
            id="instructor"
          />
          {errors.instructor && (
            <p className="text-red-500 text-sm">{errors.instructor}</p>
          )}
        </div>
        <div className="flex mt-2 flex-col gap-1">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="px-2 py-2 outline-none border border-gray-300"
            placeholder="Enter description*"
            id="description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewCourseAddForm;
