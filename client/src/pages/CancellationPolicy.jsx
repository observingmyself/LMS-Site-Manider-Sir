import React from "react";
import GetStarted from "./GetStarted";

function CancellationPolicy() {
  return (
    <>
      <div className="bg-[#EEF4FC] py-4  mt-24">
        {" "}
        <h3 className="text-4xl text-center font-semibold text-gray-900 ">
          Cancellation and Refund Policy
        </h3>
        <p className="text-center mt-4 flex items-center justify-center gap-2">
          <span
            className="text-[#fd0c0c] hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <box-icon name="fast-forward" flip="vertical"></box-icon>Cancellation
          and Refund Policy
        </p>
      </div>
      {/* instructions */}
      <div className="p-5 my-5 md:my-20 gap-8 md:mx-20 lg:mx-30">
        <div className="mb-5">
          <h3 className="text-3xl mb-8 font-semibold">
            Cancellation and Refund Policy
          </h3>
          <h3 className="mb-8 text-lg text-gray-700 md:text-xl">
            Last updated on Jan 25th 2025
          </h3>
          <h3 className="mb-8 text-base text-gray-700 md:text-lg">
            No cancellations & Refunds are entertained
          </h3>
          <h3 className="mb-5 text-base text-gray-700 md:text-lg">
            The phrase "No cancellations & refunds are entertained policy" is a
            straightforward statement of a policy, often used by businesses and
            organizations to communicate their stance on cancellations and
            refunds. When this policy is in effect, it means that the entity
            offering a product or service does not accept cancellations and does
            not provide refunds under any circumstances..
          </h3>
          <h3 className="mb-5 text-base text-gray-700 md:text-lg">
            Here are some key points to understand about such a policy:
          </h3>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="text-base md:text-lg mb-5 text-gray-700">
            <strong className="font-bold text-xl text-gray-800">
              No Cancellations:
            </strong>{" "}
            This means that once a customer or client has placed an order or
            made a reservation, they cannot change their mind and cancel it.
            They are obligated to follow through with the purchase or
            commitment.
          </p>
          <hr className="h-2 border-gray-400" />
        </div>
        <div className="mb-5">
          <p className="text-base md:text-lg mb-5 text-gray-700">
            <strong className="font-bold text-lg text-gray-800">
              No Refunds:
            </strong>{" "}
            Regardless of the reason, whether it's dissatisfaction with a
            product or service or an unforeseen circumstance, the business will
            not provide a refund for the purchase. It's essential for both
            businesses and customers to be aware of and understand this policy
            before entering into any transaction. Customers should carefully
            consider their purchases and understand the terms and conditions
            associated with them. In some cases, businesses may offer
            alternatives, such as exchanges or store credit, in place of
            refunds, even if they have a strict "no refunds" policy. However,
            these alternatives depend on the specific policies of the business
            or organization in question.
          </p>
          <hr className="h-2 border-gray-400" />
        </div>
        {/* last div */}
        <GetStarted />
      </div>
    </>
  );
}

export default CancellationPolicy;
