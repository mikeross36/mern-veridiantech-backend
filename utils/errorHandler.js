"use strict";
function notFound(req, res, next) {
  const error = new Error(`Not found ${req.originalUrl} on this server!`);
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, next) {
  let statusCode = res.satusCode ? res.statusCode : 500;
  let message;
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}:${err.value}`;
  } else if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    statusCode = 400;
    message = `Duplicated field value ${value}. Please choose another value`;
  } else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    statusCode = 400;
    message = `Invalid input data! ${errors.join(". ")}`;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token! Please login again.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired! Please login again.";
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    isError: true,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  console.log(err.stack);
}

module.exports = { notFound, errorHandler };
