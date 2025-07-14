// Eine Fehlerbehandlungs-Middleware für Express – wird automatisch aufgerufen, wenn ein Fehler irgendwo in der API passiert
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  //  Sende eine JSON-Antwort mit den Fehlermeldungen
  res.status(statusCode).json({
    message: err.message, // z. B. "User not found"

    // In der Produktion soll der Stacktrace nicht mitgeschickt werden – nur ein Symbol 😄
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export default errorHandler;
