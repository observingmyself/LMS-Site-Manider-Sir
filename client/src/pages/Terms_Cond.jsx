import React from "react";

function Terms_Cond() {
  return (
    <>
      <div className="bg-[#EEF4FC] py-4  mt-24">
        {" "}
        <h3 className="text-4xl text-center font-semibold text-gray-900 ">
          Terms and Conditions
        </h3>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>Terms and
          Conditions
        </p>
      </div>
      {/* instructions */}
      <div className="p-5 my-5 md:my-20 gap-8 md:mx-20 lg:mx-30">
        <div className="mb-8">
          <h3 className="text-3xl mb-8 font-semibold">Terms and Conditions</h3>
          <h3 className="mb-8 text-base md:text-lg text-gray-700">
            Last updated on Sep 5th 2023
          </h3>
          <h3 className="mb-8 text-base md:text-lg text-gray-700">
            The Website Owner, including subsidiaries and affiliates (“Website”
            or “Website Owner” or “we” or “us” or “our”) provides the
            information contained on the website or any of the pages comprising
            the website (“website”) to visitors (“visitors”) (cumulatively
            referred to as “you” or “your” hereinafter) subject to the terms and
            conditions set out in these website terms and conditions, the
            privacy policy and any other relevant terms and conditions, policies
            and notices which may be applicable to a specific section or module
            of the website.
          </h3>
          <h3 className="mb-8 text-base md:text-lg text-gray-700">
            Welcome to our website. If you continue to browse and use this
            website you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern ADVANCE COMPUTER CENTRE''s relationship with
            you in relation to this website.
          </h3>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            The term 'ADVANCE COMPUTER CENTRE' or 'us' or 'we' refers to the
            owner of the website whose registered/operational office is bank
            road,dhuri dhuri PUNJAB 148024. The term 'you' refers to the user or
            viewer of our website.
          </p>
          <p className="my-8 font-bold text-base md:text-lg text-gray-800">
            The use of this website is subject to the following terms of use:
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services or
            information available through this website meet your specific
            requirements.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            This website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance and graphics. Reproduction is prohibited other than
            in accordance with the copyright notice, which forms part of these
            terms and conditions.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            All trademarks reproduced in this website which are not the property
            of, or licensed to, the operator are acknowledged on the website.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            From time to time this website may also include links to other
            websites. These links are provided for your convenience to provide
            further information.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            From time to time this website may also include links to other
            websites. These links are provided for your convenience to provide
            further information.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            You may not create a link to this website from another website or
            document without ADVANCE COMPUTER CENTRE’s prior written consent.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            Your use of this website and any dispute arising out of such use of
            the website is subject to the laws of India or other regulatory
            authority.
          </p>
          <p className="mb-8 text-base md:text-lg text-gray-700">
            We as a merchant shall be under no liability whatsoever in respect
            of any loss or damage arising directly or indirectly out of the
            decline of authorization for any Transaction, on Account of the
            Cardholder having exceeded the preset limit mutually agreed by us
            with our acquiring bank from time to time
          </p>
        </div>
      </div>
      {/* last div */}
      <div className="flex flex-col justify-center items-center my-20">
        <h4 className="text-4xl font-semibold text-center">
          Ready to get started ?
        </h4>
        <p className="text-center w-3/4 text-slate-600 mt-3">
          We love conversations, and would love to have one with you! Whether
          you’re looking for a speaker, an awesome career, or want to get
          started with a rewards program, we would love <br /> hear from you.
        </p>
        <div className="flex gap-4 mt-12">
          <button className="px-3 text-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 bg-white border border-[#fd0c0c] py-3">
            Book a Demo
          </button>
          <button className="px-3 bg-[#fd0c0c] rounded-sm hover:text-white hover:bg-[#581F27] hover:border-none transition-all duration-200 text-white py-3">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

export default Terms_Cond;
