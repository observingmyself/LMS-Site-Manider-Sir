import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { baseURL } from "../../constant/constant";

const AdminHomepage = () => {
  const [registrations, setRegistrations] = useState("");

  const getRegistration = async () => {
    try {
      const { data } = await axios.post(`${baseURL}/api/v1/register/getData`);
      if (data) {
        setRegistrations(data.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRegistration();
  }, []);
  return (
    <div className="grid w-screen lg:w-full gap-4 px-10 lg:px-32 py-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex group shadow-lg p-3 justify-between items-center bg-white ">
        <div>
          <i class="fa-solid fa-user text-2xl bg-blue-500 px-3 py-2 -translate-y-7 group-hover:-translate-y-10 transition-all duration-300 ease-in-out translate-x-4 text-white rounded-lg"></i>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-blue-500 text-sm font-semibold">
            Total Students
          </h5>
          <p className="text-right text-2xl">
            <CountUp start={0} end={registrations.length} duration={3} />
          </p>
        </div>
      </div>
      <div className="flex group shadow-lg p-3 justify-between items-center bg-white ">
        <div>
          <i class="fa-solid fa-book-open text-2xl bg-[#FC6180] px-3 py-2 -translate-y-7 group-hover:-translate-y-10 transition-all duration-300 ease-in-out translate-x-4 text-white rounded-lg"></i>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-[#FC6180] text-sm font-semibold">
            Total Courses
          </h5>
          <p className="text-right text-2xl">
            <CountUp start={0} end={14} duration={6} />
          </p>
        </div>
      </div>
      <div className="flex group shadow-lg p-3 justify-between items-center bg-white ">
        <div>
          <i class="fa-solid fa-door-open text-2xl bg-[#93BE52] px-3 py-2 -translate-y-7 group-hover:-translate-y-10 transition-all duration-300 ease-in-out translate-x-4 text-white rounded-lg"></i>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-[#93BE52] text-sm font-semibold">
            Total Visitors
          </h5>
          <p className="text-right text-2xl">
            <CountUp start={0} end={87538} duration={3} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
