export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type EmptyProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  keyof React.ComponentProps<T>
>;

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type ErrorResponse = {
  success: false;
  error: {
    message: string;
    code: string | undefined;
  };
};

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message: string | null;
};

// export type ApiResponse<T = unknown> = SuccessResponse<T> & ErrorResponse;
export type Pagination = {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type ApiResponse<T = unknown> = {
  isSuccess: boolean;
  data?: T;
  message?: string | null;
  error?: {
    message: string;
    code: string | undefined;
  };
  pagination?: Pagination;
};

export type EntityId = string | number;
