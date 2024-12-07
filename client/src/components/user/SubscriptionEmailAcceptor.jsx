import React from "react";

const SubscriptionEmailAcceptor = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-20 px-4">
      <form>
        <div className="px-6 py-8 bg-white shadow-lg sm:px-10 lg:px-16 lg:py-12">
          <h4 className="text-2xl font-semibold mb-4 text-center sm:text-3xl lg:text-4xl">
            Stay Updated!
          </h4>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-2 py-2 outline-none border border-slate-400 rounded-md focus:ring-2 focus:ring-[#fd0c0c] sm:text-lg"
            name="email"
          />
          <br />
          <button
            type="submit"
            className="w-full px-5 py-3 mt-4 text-white bg-[#fd0c0c] rounded-md hover:bg-[#e50a0a] sm:w-auto sm:mt-6 sm:px-8 sm:py-3"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionEmailAcceptor;
