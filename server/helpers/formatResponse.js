const formatResponse = (res, type, data) => {
  if (type === "error") {
    return res.status(500).json({ message: "error", data: data.message });
  } else if (type === "success") {
    return res.status(200).json({ message: "success", data });
  }
};

module.exports = formatResponse;
