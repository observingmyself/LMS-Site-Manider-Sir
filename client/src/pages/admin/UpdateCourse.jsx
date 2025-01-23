import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const UpdateCourse = () => {
  const { id } = useParams();
  const [updateCourseImage, setUpdateCourseImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [singlecourse, setSinglecourse] = useState({});
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseLanguage, setCourseLanguage] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  // console.log(id)

  // getting single course data
  const getSingleCourse = async () => {
    try {
      const data = await axios.get(
        `${baseURL}/api/v1/course/singlecourse/${id}`
      );
      if (data.data.success) {
        console.log(data.data.data);
        const course = data.data.data;
        setCourseTitle(course.courseTitle);
        setCategory(course.category);
        setCourseDuration(course.courseDuration);
        setCoursePrice(course.coursePrice);
        setSubTitle(course.subTitle);
        setCourseLevel(course.courseLevel);
        setCourseLanguage(course.courseLanguage);
        setInstructor(course.instructor);
        setDescription(course.description);
      }
    } catch (e) {
      console.log("err in getting single course", e);
    }
  };
  useEffect(() => {
    getSingleCourse();
  }, [id]);

  // update image controller

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateCourseImage(file);
  };
  const updateCourseImageController = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseThumbnail", updateCourseImage);
    try {
      const data = await axios.patch(
        `${baseURL}/api/v1/course/editImg/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        console.log(data);
        toast.success(data.data.data);
      }
    } catch (e) {
      console.log("err in updating course image", e);
    } finally {
      setIsLoading(false);
    }
  };

  // to delete course
  const handleDeleteCourse = async () => {
    try {
      const data = await axios.delete(
        `${baseURL}/api/v1/course/removeCourse/${id}`
      );
      if (data.data.success) {
        navigate("/admin/dashboard/allCourses");
        toast.success(data.data.data);
      } else {
        toast.error("unable to delete course");
      }
    } catch (e) {
      console.log("err in deleting course", e);
    }
  };

  const updateCourseContentController = async (e) => {
    e.preventDefault();
    setIsContentLoading(true);
    try {
      const data = await axios.patch(`${baseURL}/api/v1/course/edit/${id}`, {
        courseTitle,
        category,
        courseDuration,
        coursePrice,
        subTitle,
        courseLevel,
        courseLanguage,
        instructor,
        description,
      });
      if (data.data.success) {
        console.log(data);
        toast.success(data.data.message);
      }
    } catch (e) {
      console.log("err in updating course content", e);
    } finally {
      setIsContentLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white px-3 py-3 flex flex-col items-center max-w-md w-full shadow-lg justify-center">
        <div className="flex justify-around w-full items-center">
          <h4 className="mb-2 font-bold text-lg">Update Course</h4>
          <button
            title="Delete This course"
            onClick={handleDeleteCourse}
            className="px-4 py-[4px] group rounded-xl bg-red-500"
          >
            <span className="flex items-center justify-center group-hover:hidden">
              <box-icon
                name="trash"
                flip="horizontal"
                color="#ffffff"
              ></box-icon>
            </span>
            <span className="items-center justify-center hidden group-hover:flex">
              <box-icon
                name="trash"
                animation="tada"
                flip="horizontal"
                color="#ffffff"
              ></box-icon>
            </span>
          </button>
        </div>
        <form
          onSubmit={(e) => updateCourseImageController(e)}
          encType="multipart/form-data"
          className="flex flex-col gap-2 text-sm"
        >
          <label htmlFor="updateImage" className="font-bold">
            Update Image
          </label>
          <input
            id="updateImage"
            onChange={handleFileChange}
            type="file"
            className="file:px-2 file:py-1 file:rounded-sm file:border-blue-400 file:border file:text-blue-500 file:mr-4 text-sm"
          />
          <div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 transition-all duration-300 text-white"
            >
              {isLoading ? (
                <>
                  Loading...
                  <box-icon
                    name="circle-three-quarter"
                    animation="spin"
                    color="#ffffff"
                  ></box-icon>
                </>
              ) : (
                "Update Image"
              )}
            </button>
          </div>
        </form>
        <form
          className="flex mt-2 flex-col gap-2 text-sm pb-4"
          encType="multipart/form-data"
          onSubmit={(e) => updateCourseContentController(e)}
        >
          <p className="font-bold">Update Content</p>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="updateName" className="font-semibold">
              Course Title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="enter course name*"
              id="updatedName"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96 ">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              placeholder="enter course category*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="courseDuration" className="font-semibold">
              Course Duration
            </label>
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              id="courseDuration"
              placeholder="enter course duration*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="coursePrice" className="font-semibold">
              Course Price
            </label>
            <input
              type="text"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              id="coursePrice"
              placeholder="enter course price*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="subtitle" className="font-semibold">
              Subtitle
            </label>
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              id="subtitle"
              placeholder="enter course subtitle*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
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
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="courseLanguage" className="font-semibold">
              Course Language
            </label>
            <input
              type="text"
              value={courseLanguage}
              onChange={(e) => setCourseLanguage(e.target.value)}
              id="courseLanguage"
              placeholder="enter course language*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="instructor" className="font-semibold">
              Instructor
            </label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              id="instructor"
              placeholder="enter course instructor*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
            />
          </div>
          <div className="flex gap-1 items-start flex-col w-96">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="enter course description*"
              className="rounded-sm w-full px-2 py-2 outline-none border border-slate-400"
              rows={4}
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="px-4 flex items-center justify-center gap-2 py-2 transition-all duration-300 bg-blue-400 hover:bg-blue-500 text-white"
            >
              {" "}
              {isContentLoading ? (
                <>
                  Loading...
                  <box-icon
                    name="circle-three-quarter"
                    animation="spin"
                    color="#ffffff"
                  ></box-icon>
                </>
              ) : (
                "Update Content"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
