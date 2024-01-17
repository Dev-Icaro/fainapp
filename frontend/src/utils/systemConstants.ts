export enum HttpStatus {
  NOT_FOUND = 404,
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export enum InputErrorMessages {
  REQUIRED = 'Obrigatório',
  INVALID_EMAIL = 'Formato do email inválido',
  MIN_LENGTH = 'O Campo deve conter no mínimo {0} caracteres',
}
