export type ResponseInfo = {
  headers?: Record<string, any>
  code?: number
}

export type APIResponse<U> = [null, U, ResponseInfo?] | [Error, ResponseInfo?]
