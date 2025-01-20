import React from "react";
import GetStarted from "./GetStarted";

function ShipingAndDelivery() {
  return (
    <>
      <div className="bg-[#EEF4FC] py-4  mt-24">
        {" "}
        <h3 className="text-4xl text-center font-semibold text-gray-900 ">
          Shipping & Delivery Policy
        </h3>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>Shipping
        </p>
      </div>
      {/* instructions */}
      <div className="p-5 my-5 md:my-20 gap-8 md:mx-20 lg:mx-30">
        <div className="mb-5">
          <h3 className="text-3xl mb-8 font-semibold">
            Shipping & Delivery Policy
          </h3>
          <h3 className="mb-8 text-base text-gray-700 md:text-lg">
            Last updated on Sep 5th 2023
          </h3>
          <h3 className="mb-8 text-base text-gray-700 md:text-lg">
            Shipping is not applicable for business.
          </h3>
          <h3 className="mb-5 text-base text-gray-700 md:text-lg">
            Thank you for choosing ADVANCE COMPUTER CENTRE for your services
            needs. Please review our Shipping & Delivery Policy below.
          </h3>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="text-lg mb-5 text-gray-700">
            <strong className="font-bold md:text-lg text-base text-gray-800">
              Shipping Policy:
            </strong>{" "}
            At ADVANCE COMPUTER CENTRE, we do not offer shipping services for
            our services. We operate solely on a online platform, and all
            transactions occur either in person or electronically.
          </p>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="text-base md:text-lg mb-5 text-gray-700">
            <strong className="font-bold text-xl text-gray-800">
              Delivery Policy:
            </strong>{" "}
            For services that can be delivered electronically (e.g., digital
            downloads, email communications, etc.), you will receive
            instructions on how to access or download them immediately upon
            completing your purchase.
          </p>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="text-base md:text-lg mb-5 text-gray-700">
            <strong className="font-bold text-xl text-gray-800">
              Contact Information :
            </strong>{" "}
            If you have any questions or require further information about our
            Shipping & Delivery Policy, please contact our customer support
            team:
          </p>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="md:text-lg text-base mb-3">
            Customer Support Email: advancecomputercentredhuri@gmail.com
          </p>
          <p className="text-lg mb-5">Customer Support Phone: +91-8556917707</p>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="md:text-lg text-base mb-5 text-gray-700">
            <strong className="font-bold text-xl text-gray-800">
              Changes to this Policy :
            </strong>{" "}
            ADVANCE COMPUTER CENTRE reserves the right to modify or update this
            Shipping & Delivery Policy at any time without prior notice. Any
            changes to this policy will be posted on our website. By using our
            services, you acknowledge and agree to the terms outlined in this
            Shipping & Delivery Policy.
          </p>
          <hr className="h-2 border-gray-400" />
        </div>

        {/* last div */}
      <GetStarted/>
      </div>
    </>
  );
}

export default ShipingAndDelivery;
