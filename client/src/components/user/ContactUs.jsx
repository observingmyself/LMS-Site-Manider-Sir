import React from "react";

const ContactUs = () => {
  return (
    <div className="mt-24">
      {/* Page Heading */}
      <h2 className="flex justify-center items-center text-4xl font-semibold bg-[#EEF4FC] h-[15vh]">
        Contact Us
      </h2>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between items-start py-10 lg:px-52 gap-10">
        {/* Left Section */}
        <div className="lg:w-1/2 w-full px-4 lg:px-0">
          <h3 className="text-3xl font-semibold mb-2">Get in touch</h3>
          <p className="text-slate-600 lg:w-96">
            Hi there, We are available 24/7 by fax, e-mail, or phone. Drop us a
            line so we can talk further about that.
          </p>
          <p className="font-semibold mt-4">Email:</p>
          <p className="text-slate-600 text-sm">
            advancecomputercentredhuri@gmail.com
          </p>
          <p className="font-semibold mt-4">Visit Us:</p>
          <p className="text-slate-600 text-sm">
            Jain Mandir First Floor, Mal Godown <br />
            Road, Dhuri (148024), Dist. Sangrur, Punjab, India
          </p>
          <p className="font-semibold mt-4">Contact:</p>
          <p className="text-slate-600 text-sm">+91 8556917707</p>
        </div>

        {/* Form Section */}
        <form className="lg:w-1/2 w-full px-4 lg:px-0">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              placeholder="Your Name*"
              name="name"
            />
            <input
              type="email"
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              placeholder="Your Email*"
              name="email"
            />
            <input
              type="text"
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              name="subject"
              placeholder="Subject*"
            />
            <textarea
              name="message"
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              id="message"
              rows={3}
              placeholder="Type your message here*"
            ></textarea>
            {/* Send Message Button */}
            <div className="flex justify-end">
              <button className="py-3 px-8 text-white bg-[#fd0c0c] rounded-lg">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Map Section */}
      <div className="flex flex-col items-center px-4 lg:px-52 py-10">
        <h3 className="text-3xl font-semibold mb-2">Visit Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9291.547666706108!2d75.86723002504294!3d30.372156330594635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39105b3744d53903%3A0x888d9223bdc9e8f0!2sAdvance%20coding%20centre%20%7C%7C%20Best%20Computer%20Institute%2C%20Professional%20Computer%20Courses%2C%20Web%20Designing%20And%20Developing%20Courses!5e0!3m2!1sen!2sin!4v1733326448735!5m2!1sen!2sin"
          width="100%"
          height="380"
          style={{
            border: "10px solid white", // White border
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow
          }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border border-black"
        />
      </div>
    </div>
  );
};

export default ContactUs;
