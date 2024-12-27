import React from "react";

function CourseDetail() {
  return (
    <div className="container mx-auto px-4 py-12 mt-14">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Master React Development</h1>
        <p className="text-lg mb-4">
          Dive deep into React, from basic concepts to advanced techniques, and
          build dynamic, responsive web applications.
        </p>
        <button className="bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition duration-300">
          Purchase Now - $49.99
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Course Description */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Course Description
            </h2>
            <p className="text-gray-600">
              This comprehensive React course is designed for developers of all
              skill levels. Whether you're just starting out or looking to
              enhance your skills, you'll learn how to build dynamic and
              efficient applications with React. Topics include JSX, components,
              state management, React Router, hooks, and more.
            </p>
          </div>

          {/* Download Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Download Resources
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <span className="font-semibold text-gray-800">
                  Course Syllabus
                </span>
                <a
                  href="#"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  download
                >
                  Download
                </a>
              </li>
              <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <span className="font-semibold text-gray-800">
                  Lecture Notes (PDF)
                </span>
                <a
                  href="#"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  download
                >
                  Download
                </a>
              </li>
              <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                <span className="font-semibold text-gray-800">eBook</span>
                <a
                  href="#"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  download
                >
                  Download
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Course Details
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Instructor:</strong> Jane Doe
              </li>
              <li>
                <strong>Duration:</strong> 8 Weeks
              </li>
              <li>
                <strong>Modules:</strong> 12
              </li>
              <li>
                <strong>Skill Level:</strong> Beginner to Advanced
              </li>
              <li>
                <strong>Language:</strong> English
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
