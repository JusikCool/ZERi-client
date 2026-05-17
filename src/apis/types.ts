export type DecimalString = string;

export type Meta = {
  request_id?: string | null;
  ts: string;
  next_cursor?: string | null;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Meta;
};

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  access_expires_at: string;
  refresh_expires_at: string;
};

export type UserPublic = {
  user_id: number;
  email: string;
  name: string;
  created_at: string;
};

export type BackendErrorEnvelope = {
  error: {
    state: string;
    code: string;
    message: string;
  };
};

export type ValidationErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
};

export type HttpValidationError = {
  detail: ValidationErrorDetail[];
};

export type PartialUpdate<T> = Partial<T>;
