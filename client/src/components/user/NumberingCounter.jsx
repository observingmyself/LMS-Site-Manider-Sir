import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const NumberingCounter = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <div className="mx-5 md:mx-24 lg:mx-40 mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="bg-white p-5 shadow-md transition-all duration-200 hover:shadow-lg">
          <h3 className="text-4xl font-semibold text-[#fd0c0c] mb-1">
            {counterOn && <CountUp start={0} end={1058} duration={2} />}
          </h3>
          <h4 className="font-semibold uppercase">Students</h4>
          <p className="text-slate-500 text-[14px] mt-2">
            overall student-athlete GPA for Spring 2020. Lorem ipsum dolor sit
            amet.
          </p>
        </div>
        <div className="bg-white p-5 shadow-md transition-all duration-200 hover:shadow-lg">
          <h3 className="text-4xl font-semibold text-[#fd0c0c] mb-1">
            {counterOn && <CountUp start={0} end={89} duration={3} />}
          </h3>
          <h4 className="font-semibold uppercase">Percent - Class of 2019</h4>
          <p className="text-slate-500 text-[14px] mt-2">
            bachelor's recipients were employed or both within six months of
          </p>
        </div>
        <div className="bg-white p-5 shadow-md transition-all duration-200 hover:shadow-lg">
          <h3 className="text-4xl font-semibold text-[#fd0c0c] mb-1">
            {counterOn && <CountUp start={0} end={97} duration={3} />}
          </h3>
          <h4 className="font-semibold uppercase">Percent - Class of 2020</h4>
          <p className="text-slate-500 text-[14px] mt-2">
            graduates hold a position related to their degree or career
            objective.
          </p>
        </div>
      </div>
    </ScrollTrigger>
  );
};

export default NumberingCounter;
