import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselImage from "../assets/images/htmlcssjs.jpg";

const Carousel = () => {
  const courses = [
    {
      title: "Scratch",
      category: "Coding For Kids",
      price: "INR 5000",
      lessons: "22 lessons",
      students: "26 Students",
    },
    {
      title: "WordPress",
      category: "Content Management System",
      price: "INR 5000",
      lessons: "22 lessons",
      students: "26 Students",
    },
    {
      title: "Adobe Photoshop",
      category: "Graphic Designing",
      price: "INR 5000",
      lessons: "22 lessons",
      students: "26 Students",
    },
    {
      title: "Adobe Photoshop",
      category: "Graphic Designing",
      price: "INR 5000",
      lessons: "22 lessons",
      students: "26 Students",
    },
    {
      title: "Adobe Photoshop",
      category: "Graphic Designing",
      price: "INR 5000",
      lessons: "22 lessons",
      students: "26 Students",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-10 my-10">
      <h2 className="text-center text-4xl text-[#1D2027] font-semibold">
        Featured Courses
      </h2>
      <p className="text-center w-full my-4 text-slate-600 px-10">
        Our courses have been designed by experts to help you develop a
        different set of skills to your competition, to sharpen your focus,
        build confidence, establish communication skills, and develop a unique
        network of contacts. Our courses are compatible with industry – many
        schools and colleges simply do not do this.
      </p>
      <Slider {...settings}>
        {courses.map((course, index) => (
          <div key={index} className="p-5 ">
            <div className="bg-white shadow-sm hover:shadow-lg duration-200 rounded-sm pb-5 text-left relative">
              <div className="w-full">
                <img src={CarouselImage} alt="" className="rounded-t-lg" />
              </div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#DF5E7E] text-white px-6 py-2 rounded-full text-center font-semibold">
                {course.price}
              </div>

              <div className="mt-10 mb-4">
                <p className="text-[10px] p-2 rounded-full text-[#DF5E7E] ml-3 bg-[#FCDFE4] inline">
                  {course.category}
                </p>
                <h3 className="text-2xl hover:text-[#fd0c0c] font-semibold text-black m-3">
                  {course.title}
                </h3>
              </div>
              <div className="mb-4 flex text-slate-600 gap-2 text-sm p-4 items-center justify-left">
                <i className="fa-regular fa-file text-[#fd0c0c]"></i>
                <p className="">{course.lessons}</p>
                {"|"}
                <i className="fa-solid fa-user text-[#fd0c0c]"></i>
                <p className="">{course.students}</p>
              </div>
              <hr className="" />
              <button className="mt-4 px-6 py-2 text-[#fd0c0c] rounded text-sm flex items-center justify-center gap-1 hover:gap-3 transition-all">
                <p className="hover:underline">Know More</p>{" "}
                <i className="fa-solid fa-right-long"></i>
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
