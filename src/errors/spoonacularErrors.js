class ParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParameterError";
  }
}

export default ParameterError;
