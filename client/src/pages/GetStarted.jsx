import React from 'react'
import { useNavigate } from 'react-router'

const GetStarted = () => {
    const navigate = useNavigate();
  return (
      <div className="flex flex-col justify-center items-center mt-20">
          <h4 className="text-4xl font-semibold text-center">
              Ready to get started ?
          </h4>
          <p className="text-center w-3/4 text-slate-600 mt-3">
              We love conversations, and would love to have one with you! Whether
              you’re looking for a speaker, an awesome career, or want to get
              started with a rewards program, we would love <br /> hear from you.
          </p>
          <div className="flex gap-4 mt-12">
              <button onClick={() => navigate('/contact')} className="px-3 text-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 bg-white border border-[#fd0c0c] py-3">
                  Book a Demo
              </button>
              <button onClick={() => navigate('/registration-form')} className="px-3 bg-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 text-white py-3">
                  Get Started
              </button>
          </div>
      </div>
  )
}

export default GetStarted