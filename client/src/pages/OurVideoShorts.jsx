import React from "react";

// VideoCard Component
const VideoCard = ({ videoSrc, title, description,index }) => {
  return (
    <div className={`card shadow-xl rounded-lg transition-all duration-300 p-10 ${index === 1 ? "scale-110" : ""}`}>
      <iframe
        width="300"
        height="150"
        src={videoSrc}
        title={title}
        className="rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h4 className="text-2xl font-semibold text-center mt-5">{title}</h4>
      <p className="text-[#6A625A] text-center mt-3 w-72">{description}</p>
    </div>
  );
};

// OurVideoShorts Component
const OurVideoShorts = () => {
  const videos = [
    {
      videoSrc: "https://www.youtube.com/embed/d1O3Xwf0tqQ?si=Q1pTZ7pl2NvwCTJv",
      title: "Learn Anything",
      description: "Delete Blank Pages",
    },
    {
      videoSrc: "https://www.youtube.com/embed/1pxISIOy8ho?si=uqMoVoehfQeFYZ6b",
      title: "Learn Anything",
      description:
        "Sign your name on any document |How to Sign a word in documents | Signature your name|",
    },
    {
      videoSrc: "https://www.youtube.com/embed/8nmShaM9SL8?si=qkmXGf-a1Z6Kpijt",
      title: "Learn Anything",
      description:
        "Convert PDF to Word and Word to PDF without any software and using internet in window 10",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <h2 className="text-3xl md:text-4xl font-semibold">Our Video Shorts</h2>
      <p className="text-[16px] md:text-xl text-[#735A5A] w-80 md:w-3/4 lg:w-1/2 text-center mt-4">
        We live in a digital age, and there’s no going back. As we move towards
        the future, technology will keep developing and help us overcome
        problems.
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 md:mt-16">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            videoSrc={video.videoSrc}
            title={video.title}
            description={video.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default OurVideoShorts;
