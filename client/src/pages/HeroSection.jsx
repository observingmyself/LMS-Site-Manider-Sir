import React from "react";
import Navbar from "../components/user/Navbar";
import OurVideoShorts from "./OurVideoShorts";
import Carousel from "./Carousel";
import Review from "../components/user/Review";
import NumberingCounter from "../components/user/NumberingCounter";
import Banner from "../components/user/Banner";
import SubscriptionEmailAcceptor from "../components/user/SubscriptionEmailAcceptor";
import axios from "axios";
import { toast } from "react-toastify";

const HeroSection = () => {
  return (
    <>
      <div className='herosection w-screen h-screen bg-[url("./assets/images/banner.jpg")] bg-cover bg-center'>
        <div className="px-[25px] lg:px-[80px] relative top-64">
          <h2 className="text-4xl lg:text-5xl font-semibold">Coding Classes</h2>
          <h4 className="mt-5 text-2xl font-semibold">
            Classes Start From 2024
          </h4>
          <p className="font-light min-w-80 sm:w-96 mt-4">
            Start one of our 1000 high quality courses from the world’s leading
            experts today! Registration Here
          </p>
          <a href="/registration-form">   
            <button className="mt-10 px-10 bg-[#FE0000] hover:bg-[#581F27] transition-all duration-200 py-5 text-white rounded">
              Registration Now !
            </button>
          </a>
        </div>
      </div>
      <OurVideoShorts />
      <Carousel />
      <Review />
      <NumberingCounter />
      <Banner />
      <SubscriptionEmailAcceptor />
    </>
  );
};

export default HeroSection;
