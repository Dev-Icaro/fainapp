import { HttpStatus } from "@common/utils/systemConstants";

export default class AppException {
  public message: string;
  public statusCode: number;

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
