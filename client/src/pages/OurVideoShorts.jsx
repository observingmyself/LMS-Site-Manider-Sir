import React from 'react'

const OurVideoShorts = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-3xl md:text-4xl font-semibold">Our Video Shorts</h2>
      <p className="text-[16px] md:text-xl text-[#735A5A] w-80 md:w-3/4 lg:w-1/2 text-center mt-4">
        We live in a digital age, and there’s no going back. As we move towards
        the future, technology will keep developing and help us overcome
        problems.
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 md:mt-16">
        <div className="card shadow-xl rounded-lg transition-all duration-300 p-8">
          <iframe
            width="300"
            height="150"
            src="https://www.youtube.com/embed/d1O3Xwf0tqQ?si=Q1pTZ7pl2NvwCTJv"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h4 className="text-2xl font-semibold text-center mt-5">
            Learn Anything
          </h4>
          <p className="text-[#6A625A] text-center mt-3">Delete Blank Pages</p>
        </div>
        <div className="card shadow-xl md:scale-110 rounded-lg transition-all duration-300 p-10">
          <iframe
            width="300"
            height="150"
            src="https://www.youtube.com/embed/1pxISIOy8ho?si=uqMoVoehfQeFYZ6b"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h4 className="text-2xl font-semibold text-center mt-5">
            Learn Anything
          </h4>
          <p className="text-[#6A625A] text-center mt-3 w-72">
            Sign your name on any document |How to Sign a word in documents |
            Signature your name|
          </p>
        </div>
        <div className="card shadow-xl rounded-lg transition-all duration-300 p-10">
          <iframe
            width="300"
            height="150"
            src="https://www.youtube.com/embed/8nmShaM9SL8?si=qkmXGf-a1Z6Kpijt"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <h4 className="text-2xl font-semibold text-center mt-5">
            Learn Anything
          </h4>
          <p className="text-[#6A625A] text-center mt-3 w-72">
            Convert PDF to Word and Word to PDF without any software and using
            internet in window 10
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurVideoShorts