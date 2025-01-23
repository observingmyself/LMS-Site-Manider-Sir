import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewImage from "../../assets/images/review.jpg";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  const getAllReviews = async () => {
    try {
      const data = await axios.get('/api/v1/review')
      if (data) {
        console.log(data.data.data.data)
        setReviews(data.data.data.data)
      }
    }
    catch (e) {
      console.log('err in getting reviews', e)
    }
  }

  useEffect(() => {
    getAllReviews();
  }, [])

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
      {reviews.length === 0 ? "" : <><div className="w-screen flex flex-col justify-center items-center">
        <h3 className="text-4xl text-center font-semibold text-[#1D2027] mb-3">
          What our Student <br className="md:hidden" /> Saying
        </h3>
        <p className="w-96 md:w-1/2 text-center text-[#5A5A5A]">
          Here are some of our graduates and students who explain what it's like
          to learn with us, and why they chose computer courses.
        </p>
      </div>
        <div className="bg-red-100 max-w-5xl mx-auto mt-4">
          <div className="max-w-4xl mx-auto py-10">
            <Slider {...settings}>
              {reviews?.map((review, index) => (
                <div key={index} className="flex p-10 items-center gap-4">
                  <div className="flex-grow">
                    <h4 className="text-lg mb-4">{review.message}</h4>
                    <h5 className="text-sm">
                      <span className="text-[#fd0c0c] capitalize">{review.name}</span> -{" "}
                      India
                    </h5>
                  </div>
                  <div className="flex-shrink-0 mt-2">
                    <img
                      src={review.reviewImage ? review.reviewImage : ReviewImage}
                      alt={review.name}
                      className="w-[100px] h-[100px] object-cover rounded-full"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div> </>}
    </>
  );
};

export default Review;
