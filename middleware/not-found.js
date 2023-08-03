const notFound = (req, res, next) => {
  res.status(404).json({msg:"routes does not exist please check well!"})
}

module.exports = notFound;