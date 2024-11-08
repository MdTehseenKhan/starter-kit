export enum HttpStatusCode {
  Ok = 200,
  MovedPermanently = 301,
  MovedTemporarily = 302,
  SeeOther = 303,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  TooManyRequests = 429,
  InternalServerError = 500,
}
