import type { BackendErrorEnvelope, HttpValidationError } from "./types";

export class ApiClientError extends Error {
  readonly state: string;
  readonly code: string;
  readonly statusCode: number;

  constructor(state: string, code: string, message: string, statusCode: number) {
    super(message);
    this.name = "ApiClientError";
    this.state = state;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export function parseApiError(data: unknown, statusCode: number): ApiClientError {
  if (isBackendErrorEnvelope(data)) {
    const { state, code, message } = data.error;
    return new ApiClientError(state, code, message, statusCode);
  }

  if (isValidationError(data)) {
    const message = data.detail.map((d) => d.msg).join(", ");
    return new ApiClientError("VALIDATION_ERROR", "INVALID_REQUEST", message, statusCode);
  }

  return new ApiClientError("UNKNOWN", "UNKNOWN", "알 수 없는 오류가 발생했습니다.", statusCode);
}

function isBackendErrorEnvelope(data: unknown): data is BackendErrorEnvelope {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof (data as BackendErrorEnvelope).error?.code === "string"
  );
}

function isValidationError(data: unknown): data is HttpValidationError {
  return (
    typeof data === "object" &&
    data !== null &&
    "detail" in data &&
    Array.isArray((data as HttpValidationError).detail)
  );
}
