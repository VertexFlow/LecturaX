class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusecode = statusCode;
  }
}

module.exports = ExpressError;
