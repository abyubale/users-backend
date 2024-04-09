class ApiError {
  constructor(
    ErrorMsg = 'somthing went wrong !!!',
    ErrorCode = 400,
    IsError = true
  ) {
    this.ErrorMsg = ErrorMsg;
    this.ErrorCode = ErrorCode;
    this.IsError = IsError;
  }
}
export default ApiError;
