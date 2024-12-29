import React from "react";
import { Link } from "react-router";
const courses = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "Maninder",
    description:
      "Learn the basics of React, including components, JSX, and state management.",
    image: "https://via.placeholder.com/400",
    coursePrice: 1000,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Maninder",
    description:
      "Dive deep into JavaScript concepts such as closures, promises, and async/await.",
    image: "https://via.placeholder.com/400",
    coursePrice: 1000,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Maninder",
    description:
      "Understand the principles of user interface and user experience design.",
    image: "https://via.placeholder.com/400",
    coursePrice: 1000,
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    instructor: "Maninder",
    description:
      "Master both front-end and back-end development, from Beginner to Advance.",
    image: "https://via.placeholder.com/400",
    coursePrice: 1000,
  },
];

function CoursePage() {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {course.title}
            </h2>
            <div className="flex gap-2 text-center mt-2 justify-between">
              <div className="flex gap-2 text-center align-middle">
                <box-icon type="solid" name="user"></box-icon>
                <span className="text-md text-gray-800">
                  {course.instructor}
                </span>
              </div>
              <div className="">
                <span className="text-md text-gray-800">+5000 Students</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{course.description}</p>
            <p className="text-gray-900 mt-2 text-lg font-semibold shadow-sm">
              ₹{course.coursePrice}
            </p>
            <button className="mt-4 w-full py-2 bg-gray-50 text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-200 transition duration-200 border-none">
              <Link to={`/course-detail/${course.id}`}>Enroll Now</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursePage;
