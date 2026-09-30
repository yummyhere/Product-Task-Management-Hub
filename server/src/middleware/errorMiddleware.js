/**
 * Centralized error-handling middleware
 * Ensures consistent JSON error responses and protects against information leakage
 */
const errorHandler = (err, req, res, next) => {
  // Log the actual server error internally for debugging
  console.error(`[Server Error] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}:`, err.message);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.statusCode || 500);

  // User-friendly error message without raw stack traces
  let message = err.message || 'Internal server error';

  // Handle specific database errors if they bubbled up
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID'
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Internal server error';
  }

  return res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
