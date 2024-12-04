import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewImage from "../../assets/images/review.jpg";

const Review = () => {
  const reviews = [
    {
      review: "Excellent course material and teaching method.",
      name: "John Doe",
      location: "USA",
    },
    {
      review: "Great collection and well-structured lessons.",
      name: "Alice",
      location: "Canada",
    },
    {
      review: "The best course for beginners to start coding.",
      name: "Chahat",
      location: "India",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
  };

  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center">
        <h3 className="text-4xl text-center font-semibold text-[#1D2027] mb-3">
          What our Student <br className="md:hidden"/> Saying
        </h3>
        <p className="w-96 md:w-1/2 text-center text-[#5A5A5A]">
          Here are some of our graduates and students who explain what it's like
          to learn with us, and why they chose computer courses.
        </p>
      </div>
      <div className="max-w-4xl mx-auto py-10">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="flex bg-red-100 p-10 items-center gap-4">
              <div className="flex-grow">
                <h4 className="text-lg mb-4">{review.review}</h4>
                <h5 className="text-sm">
                  <span className="text-[#fd0c0c]">{review.name}</span> -{" "}
                  {review.location}
                </h5>
              </div>
              <div className="flex-shrink-0 mt-2">
                <img
                  src={ReviewImage}
                  alt={review.name}
                  className="w-[100px] h-[100px] object-cover rounded-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Review;
