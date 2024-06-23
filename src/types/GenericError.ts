export type GenericError = {
  status: number;
  statusText: string;
  message: string;
} & Error;
