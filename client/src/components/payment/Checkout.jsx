import React, { useEffect } from "react";
import axios from "axios";

const CheckoutPayment = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const Id = "6768817dcb0bb49e5dc3f085";

  const payPayment = async (courseId) => {
    try {
      const res = await axios.post("/api/v1/payment/checkout", {
        courseId: courseId,
      });
      const data = res.data;
      // console.log(data);
      if (!data.success) {
        alert("Failed to create Razorpay order");
        return;
      }
      handlePaymentSuccess(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    console.log(response);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      order_id: response.id,
      ...response,
      handler: function (response) {
        // console.log(response);
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        axios
          .post("/api/v1/payment/verifyPayment", {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature,
          })
          .then((res) => {
            if (res?.data.success) alert("Payment successfull");
            // console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzpay = new window.Razorpay(options);
    rzpay.open();
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src="http://res.cloudinary.com/dypcljhng/image/upload/v1734902318/vvtw7k6d2zjdzuuevycb.jpg"
            alt="Course Thumbnail"
          />
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800">
              Learn React with Tailwind
            </h3>
            <p className="mt-2 text-gray-600">
              Master React and Tailwind CSS to build stunning and responsive web
              applications.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold text-indigo-600">500</span>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
                onClick={() => payPayment(Id)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;
