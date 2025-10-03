module.exports = (data = {}, message = "Request successful") => {
  return {
    success: true,
    message,
    data,
  };
};
