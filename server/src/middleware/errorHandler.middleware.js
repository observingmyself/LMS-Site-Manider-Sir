import { ApiError } from "../utils/apiErrorHandler.js";

export const errorHandler = () => ((err, req, res, next) => {
  if (err instanceof ApiError) {
    // Log error details on the server side
    console.error(`API Error: ${err.message}`, {
      statusCode: err.statusCode,
      errors: err.errors,
      stack: err.stack,
      data: err.data,
    });

    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      data: err.data
    });
  }
})



