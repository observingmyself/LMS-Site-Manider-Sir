import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    if (!subject.trim()) errors.subject = "Subject is required.";
    if (!message.trim()) errors.message = "Message is required.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    try {
      const data = await axios.post(
        `${baseURL}/api/v1/contact/create`,
        {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        // console.log(data)
        toast.success("Query Delivered");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        console.log("Failed to send message.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-24">
      {/* Page Heading */}
      <div className="bg-[#EEF4FC] py-4">
        {" "}
        <h2 className="flex justify-center items-center text-4xl text-gray-900 font-semibold">
          Contact Us
        </h2>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>Contact
        </p>
      </div>

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
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="lg:w-1/2 w-full px-4 lg:px-0"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              placeholder="Your Name*"
              name="name"
            />
            {errors.name && (
              <span className="text-sm text-[#fd0c0c]">{errors.name}</span>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              placeholder="Your Email*"
              name="email"
            />
            {errors.email && (
              <span className="text-sm text-[#fd0c0c]">{errors.email}</span>
            )}
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              name="subject"
              placeholder="Subject*"
            />
            {errors.subject && (
              <span className="text-sm text-[#fd0c0c]">{errors.subject}</span>
            )}
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="outline-none border focus:border-[#fd0c0c] py-3 w-full rounded-lg placeholder:text-sm px-4"
              id="message"
              rows={3}
              placeholder="Type your message here*"
            ></textarea>
            {errors.message && (
              <span className="text-sm text-[#fd0c0c]">{errors.message}</span>
            )}
            {/* Send Message Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-8 text-white bg-[#fd0c0c] rounded-lg"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Map Section */}
      <div className="flex flex-col items-center px-4 lg:px-52 pb-10">
        <h3 className="text-3xl font-semibold mb-4  italic">Visit Us</h3>
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
