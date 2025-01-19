import React, { useEffect, useState } from "react";
import T1 from "../assets/images/t1.jpg";
import S3 from "../assets/images/s3.jpg";
import VideoThumbnail from "../assets/images/1640x624.png";
import Video from "../assets/video/about.mp4";
import { useNavigate } from "react-router";
import axios from "axios";

const About = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [teamMembers,setTeamMembers] = useState([])
  const navigate = useNavigate();

  const handleOpenPopUp = () => {
    setIsPopUpVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handlePopClose = () => {
    setIsPopUpVisible(false);
    document.body.style.overflow = "auto";
  };

  const getTeamMembers = async () => {
    try{
      const data = await axios.get('/api/v1/team')
      if(data.data.success){
        // console.log(data.data)
        setTeamMembers(data.data.data)
      }
      else{
        console.log("Err in getting team member")
      }
    }catch(err){
      console.log("err in getting team member",err)
    }
  }
  useEffect(()=>{
    getTeamMembers();
  },[])
  return (
    <div className="">
      <div className="bg-[#EEF4FC] py-4  mt-24">
        {" "}
        <h3 className="text-4xl text-center font-semibold ">About Us</h3>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>About Us
        </p>
      </div>

      {/* First Section */}
      <div className="p-5 flex flex-col justify-center lg:flex-row my-5 md:my-20 gap-8 md:mx-20 lg:mx-30">
        <div>
          <h3 className="text-3xl mb-2 font-semibold">Who we are?</h3>
          <p className="text-[14px] leading-6 max-w-xl text-slate-600">
            Advance Computer Centre is one of the education brands. It has a
            wide range of courses and maintains education standards. Advance
            Computer Centre is the IT education brand of Limited. Established in
            2021, it carries out regular training & certification of its faculty
            to ensure that they are able to handle even advanced IT topics.
            Provides high-quality learning aids – including books & CDs – to the
            students & faculty. These are developed specially by the company.
          </p>
          <ul className="mt-8 flex flex-col gap-4 text-slate-600">
            <li className="text-[14px]">
              <i className="fa-solid fa-check mr-2 text-[10px] text-[#7BBC7E]"></i>
              Online/Offline Classrooms
            </li>
            <li className="text-[14px]">
              <i className="fa-solid fa-check mr-2 text-[10px] text-[#7BBC7E]"></i>
              We teach in-demand courses
            </li>
            <li className="text-[14px]">
              <i className="fa-solid fa-check mr-2 text-[10px] text-[#7BBC7E]"></i>
              We provide impactful learning material
            </li>
            <li className="text-[14px]">
              <i className="fa-solid fa-check mr-2 text-[10px] text-[#7BBC7E]"></i>
              We follow world-class teaching methods
            </li>
            <li className="text-[14px]">
              <i className="fa-solid fa-check mr-2 text-[10px] text-[#7BBC7E]"></i>
              Our course timings are flexible
            </li>
          </ul>
        </div>
        <div className="lg:px-20 max-w-md lg:max-w-lg">
          <img
            src={T1}
            alt="Who we are"
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="p-5 flex flex-col my-5 md:my-20 gap-8 md:mx-20 lg:mx-60 justify-center">
        {/* Mission Section */}
        <div>
          <h4 className="text-2xl font-semibold">Our Mission</h4>
          <p className="mt-3 text-[14px] text-slate-600 leading-6">
            To create, share, and apply knowledge in Computer Science, including
            in interdisciplinary areas that extend the scope of Computer Science
            and benefit humanity; to educate students to be successful, ethical,
            and effective problem-solvers and life-long learners who will
            contribute positively to the economic well-being of our region and
            nation and who are prepared to tackle complex 21st Century
            challenges facing the world. To impart moral and ethical values, and
            interpersonal skills to the students. To empower the students with
            the required skills to solve the complex technological problems of
            modern society and also provide them with a framework for promoting
            collaborative and multidisciplinary activities.
          </p>
        </div>

        {/* Vision Section */}
        <div>
          <h4 className="text-2xl font-semibold">Our Vision</h4>
          <p className="mt-3 text-[14px] text-slate-600 leading-6">
            To empower the graduates to be technologically adept, innovative,
            self-motivated, and responsible citizens, possessing human values
            and contributing significantly towards being a centre of excellence
            in providing globally standard education, through a conducive
            Teaching and Research environment that responds swiftly to the
            challenges of the ever-changing world.
          </p>
        </div>
        {/* Call to Action Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 my-10">
          <div>
            <h4 className="text-3xl font-semibold max-w-lg">
              Start Growing With Community & Experience Endless Possibilities
            </h4>
            <p className="text-[15px] max-w-md mt-4 text-slate-600">
              Get started with a free 1-month trial for your business.
            </p>
            <button className="px-4 py-4 bg-[#fd0c0c] text-sm mt-6 text-white rounded-md">
              Join Us
            </button>
          </div>
          <div className="lg:px-20 max-w-md lg:max-w-lg">
            <img
              src={S3}
              alt="Join Us"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        {/* Learn from any location section */}
        <div className="flex justify-center items-center flex-col my-10">
          <h3 className="text-center text-4xl  font-semibold">
            Learn from any location in the INDIA
          </h3>
          <p className="text-[15px] text-slate-600 max-w-lg text-center mt-2 ">
            The e-learning movement has made the opportunity to get smarter in
            your spare time completely accessible to anyone with an internet
            connection, and it’s exploded in recent years.
          </p>
          <div className="mt-7 px-4 md:px-10 lg:px-20 relative">
            <img
              src={VideoThumbnail}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              alt="Video Thumbnail"
            />
            <i
              title="Play"
              onClick={handleOpenPopUp}
              className="fa-solid fa-play absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 bg-opacity-50 transition-all duration-200 px-5 py-5 bg-black rounded-full text-white rays"
            ></i>
            {isPopUpVisible && (
              <div
                onClick={handlePopClose}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
                >
                  {/* Close Button - Positioned Above the Video */}
                  <button
                    className="text-xl text-white mb-2 ml-80 absolute -top-10 right-1"
                    onClick={handlePopClose}
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>

                  {/* Video Element */}
                  <video
                    src={Video}
                    className="w-full rounded-b-lg"
                    autoPlay
                    muted
                    controls
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <h4 className="text-4xl font-semibold text-center mb-14">
            Meet Our Skilled Team Member's
          </h4>
          <div className="cards grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {teamMembers?.map((member) => (
              <div key={member._id} className="card hover:-translate-y-2 hover:shadow-lg transition-all duration-200 bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[50vh] md:h-[40vh] object-cover object-top"
                  />
                  <div className="absolute bg-white bottom-0 left-0 right-0 bg-gradient-to-t to-transparent p-4">
                    <h3 className="text-black group-hover:text-[#fd0c0c] font-bold text-lg">
                      {member.name}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* last div */}
        <div className="flex flex-col justify-center items-center mt-20">
          <h4 className="text-4xl font-semibold">Ready to get started ?</h4>
          <p className="text-center w-3/4 text-slate-600 mt-3">
            We love conversations, and would love to have one with you! Whether
            you’re looking for a speaker, an awesome career, or want to get
            started with a rewards program, we would love <br /> hear from you.
          </p>
          <div className="flex gap-4 mt-12">
            <button className="px-3 text-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 bg-white border border-[#fd0c0c] py-3">
              Book a Demo
            </button>
            <button className="px-3 bg-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 text-white py-3">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
