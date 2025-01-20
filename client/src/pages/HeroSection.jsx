import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import OurVideoShorts from "./OurVideoShorts";
import Carousel from "./Carousel";
import Review from "../components/user/Review";
import NumberingCounter from "../components/user/NumberingCounter";
import Banner from "../components/user/Banner";
import Background1 from "../assets/images/banner.jpg";
import Background2 from "../assets/images/banner2.jpg";
import Background3 from "../assets/images/banner3.jpg";
import SubscriptionEmailAcceptor from "../components/user/SubscriptionEmailAcceptor";
import { Link } from "react-router";

const HeroSection = () => {
  const images = [Background1, Background2, Background3];

  return (
    <>
      <div className="relative w-screen h-screen">
        {/* Swiper for Sliding Background Images */}
        <Swiper
          modules={[Autoplay]}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="absolute inset-0 w-full h-full z-0"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image})`,
                  height: "100vh",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Static Content */}
        <div className="absolute inset-0 px-[25px] lg:px-[80px] z-10 flex items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black">
              Coding Classes
            </h2>
            <h4 className="mt-5 text-2xl font-semibold text-black">
              Classes Start From 2024
            </h4>
            <p className="font-light sm:w-96 mt-4 text-black">
              Start one of our 1000 high quality courses from the world’s
              leading experts today! Registration Here
            </p>
            <Link to="/registration-form">
              <button className="mt-10 px-10 bg-[#FE0000] hover:bg-[#581F27] transition-all duration-200 py-5 text-white rounded">
                Registration Now!
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Components */}
      <OurVideoShorts />
      <Carousel />
      <Review />
      <NumberingCounter />
      <Banner />
    </>
  );
};

export default HeroSection;
