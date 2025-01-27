import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const DevelopedBySection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const number = "7707965614";
  const number2 = "8198013502";
  return (
    <div className='overflow-hidden bg-[url("https://res.cloudinary.com/dypcljhng/image/upload/v1737997473/background2_cy2y19.jpg")] md:h-screen bg-cover relative'>
      <div
        onClick={() => navigate("/")}
        className="absolute flex items-center justify-center hover:underline left-10 top-5 text-white"
      >
        <span className="flex items-center justify-center">
          <box-icon name="left-arrow-alt" color="#ffffff"></box-icon>
        </span>
        <span>go to website</span>
      </div>
      <div className="px-5 py-20 md:p-20">
        <h2 className="text-md sm:text-2xl lg:text-4xl text-left text-white font-bold font-serif italic">
          "The Minds Behind This Project"
        </h2>
        <div className="grid sm:grid-cols-2 gap-2 md:gap-10 py-6 md:grid-cols-2">
          <div className="flex flex-col items-start sm:items-center md:items-end justify-center">
            <div className="px-6 py-6 bg-gradient-to-tr from-gray-400 via-white to-gray-400">
              <img
                src="https://res.cloudinary.com/dypcljhng/image/upload/v1737997472/developerthree_sa3gno.jpg"
                className="h-64"
                alt=""
              />
              <h3 className="text-lg font-semibold mt-1 italic text-gray-600">
                Pardeep Singh
              </h3>
              <h3 className="text-lg font-semibold italic text-gray-600">
                Full Stack Developer
              </h3>
              <div className="flex justify-evenly mt-3 items-center">
                <a target="_blank" href="https://github.com/pardeepsingh77">
                  <box-icon type="logo" name="github"></box-icon>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/observing.myself_"
                >
                  <box-icon name="instagram" type="logo"></box-icon>
                </a>
                <a
                  href="https://www.linkedin.com/in/pardeep-singh-a8b299239/"
                  target="_blank"
                >
                  <box-icon name="linkedin" type="logo"></box-icon>
                </a>
                <a href={`https://wa.me/${number}`} target="_blank">
                  <box-icon name="whatsapp" type="logo"></box-icon>
                </a>
              </div>
              <a
                href="https://pardeepsingh.netlify.app/"
                target="_blank"
                className="mt-3 hover:underline cursor-pointer flex justify-end items-center"
              >
                <div className="text-right mt-2 italic">Portfolio</div>
                <span>
                  {" "}
                  <box-icon type="solid" name="plane-take-off"></box-icon>
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end sm:items-center md:items-start justify-center">
            <div className="px-6 py-6 bg-gradient-to-tr from-gray-400 via-white to-gray-400">
              <img
                src="https://res.cloudinary.com/dypcljhng/image/upload/v1737997473/developertwo_r7juck.jpg"
                className="h-64"
                alt=""
              />
              <h3 className="text-lg font-semibold mt-1 italic text-gray-600">
                Moksh
              </h3>
              <h3 className="text-lg font-semibold italic text-gray-600">
                Full Stack Developer
              </h3>
              <div className="flex justify-evenly mt-2 items-center">
                <a target="_blank" href="https://github.com/Moksh8516">
                  <box-icon type="logo" name="github"></box-icon>
                </a>
                <a target="_blank" href="https://www.instagram.com/moksh7666">
                  <box-icon name="instagram" type="logo"></box-icon>
                </a>
                <a
                  href="https://www.linkedin.com/in/moksh-26a2432b3"
                  target="_blank"
                >
                  <box-icon name="linkedin" type="logo"></box-icon>
                </a>
                <a href={`https://wa.me/${number2}`} target="_blank">
                  <box-icon name="whatsapp" type="logo"></box-icon>
                </a>
              </div>
              <a
                href="http://moksh8516portfolio.vercel.app"
                target="_blank"
                className="mt-3 hover:underline cursor-pointer flex justify-end items-center"
              >
                <div className="text-right mt-2 italic">Portfolio</div>
                <span>
                  {" "}
                  <box-icon type="solid" name="plane-take-off"></box-icon>
                </span>
              </a>
            </div>
          </div>
        </div>
        <h2 className="text-md sm:text-2xl lg:text-4xl text-right text-white font-bold font-serif italic">
          "Thanks for visiting our website!"
        </h2>
      </div>
    </div>
  );
};

export default DevelopedBySection;
