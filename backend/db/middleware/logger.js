const logger = (req, res, next) => {
  const time = new Date().toISOString();

  // Logge die Anfrage im Terminal
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);

  next();
};

export default logger;
