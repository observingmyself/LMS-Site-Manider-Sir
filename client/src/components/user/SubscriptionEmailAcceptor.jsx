import React from 'react'

const SubscriptionEmailAcceptor = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-20">
      <form>
        <div className="px-32 py-10 bg-white shadow-lg">
          <h4 className="text-4xl font-semibold mb-4">Stay Updated!</h4>
          <input
            type="email"
            placeholder="Enter your email..."
            className="w-full px-2 py-2 outline-none border border-slate-400"
            name="email"
          />
          <br />
          <button className="px-5 py-3 mt-4 text-white bg-[#fd0c0c]">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubscriptionEmailAcceptor