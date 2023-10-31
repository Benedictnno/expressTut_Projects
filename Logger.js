function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log("====================================");
  console.log(method, url, time);
  console.log("====================================");
  next();
}

module.exports = logger;
