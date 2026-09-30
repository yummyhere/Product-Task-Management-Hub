/**
 * Middleware to catch 404 Not Found for undefined API routes
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`
  });
};

module.exports = notFound;
