import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { baseURL } from "../../constant/constant";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [classs, setClasss] = useState("");
  const [mode, setMode] = useState("");
  const [school, setSchool] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) newErrors.name = "Student Name is required.";
    if (!classs.trim()) newErrors.classs = "Class is required.";
    if (!mode.trim()) newErrors.mode = "Mode is required.";
    if (!school.trim()) newErrors.school = "School Name is required.";
    if (!gender.trim()) newErrors.gender = "Gender is required.";
    if (!dob) newErrors.dob = "Date of Birth is required.";
    if (!fatherName.trim()) newErrors.fatherName = "Father Name is required.";
    if (!contact.trim() && contact.trim() > 10 && contact.trim() < 10)
      newErrors.contact = "Enter valid contact number";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!city.trim()) newErrors.city = "City is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const data = await axios.post(`${baseURL}/api/v1/register`, {
        name: name,
        classs: classs,
        mode: mode,
        school: school,
        gender: gender,
        DOB: dob,
        fatherName: fatherName,
        contact: contact,
        Address: address,
        State: state,
        city: city,
      });
      if (data) {
        toast.success(data.data.message);
        navigate("/");
        console.log(data);
      }
      setName("");
      setClasss("");
      setMode("");
      setSchool("");
      setGender("");
      setDob("");
      setFatherName("");
      setContact("");
      setAddress("");
      setState("");
      setCity("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-24">
      <div className="bg-[#EEF4FC] text-center py-8 font-semibold">
        <h4 className="text-4xl md:text-5xl">Register yourself</h4>
        <p className="mt-4 text-xl md:text-2xl">{"{WINTER CODING CAMP}"}</p>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e, console.log(e))}
        className="mt-10 flex flex-col px-10 md:px-32 lg:px-52"
      >
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            placeholder="Student Name*"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="class">Select Class</label>
          <select
            name="class"
            value={classs}
            onChange={(e) => setClasss(e.target.value)}
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
            id="class"
          >
            <option value="">Select Your Class</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
          {errors.classs && (
            <span className="text-red-500 text-sm">{errors.classs}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="mode">Select Your Mode</label>
          <select
            name="mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
            id="mode"
          >
            <option value="">Select Mode</option>
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>
          {errors.mode && (
            <span className="text-red-500 text-sm">{errors.mode}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="school">School Name</label>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            id="school"
            name="school"
            placeholder="School Name*"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.school && (
            <span className="text-red-500 text-sm">{errors.school}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
            id="gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Boy</option>
            <option value="female">Girl</option>
            <option value="others">Others</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">{errors.gender}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            name="DOB"
            id="dob"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.dob && (
            <span className="text-red-500 text-sm">{errors.dob}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="fatherName">Father Name</label>
          <input
            type="input"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            name="fatherName"
            placeholder="Your Guardian Name*"
            id="fatherName"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.fatherName && (
            <span className="text-red-500 text-sm">{errors.fatherName}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="input"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            name="contact"
            placeholder="Your GPAY or Whatsapp number*"
            id="contactNumber"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">{errors.contact}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="Address"
            placeholder="Enter your address*"
            id="address"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="city">City</label>
          <input
            type="input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder="Enter your city*"
            id="city"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="state">State</label>
          <input
            type="input"
            value={state}
            onChange={(e) => setState(e.target.value)}
            name="State"
            placeholder="State*"
            id="state"
            className="px-4 py-4 outline-none border focus:border-[#fd0c0c] "
          />
          {errors.state && (
            <span className="text-red-500 text-sm">{errors.state}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#fd0c0c] hover:bg-[brown] transition-all duration-200 ease-in-out text-white py-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
