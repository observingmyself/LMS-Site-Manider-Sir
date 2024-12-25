import RazorPay from "razorpay";

const createRazorpayInstance = () => {
  return new RazorPay({
    key_id: process.env.ROZARPAY_API_KEY,
    key_secret: process.env.ROZARPAY_API_SECRET_KEY
  })
}

export {
  createRazorpayInstance,
}