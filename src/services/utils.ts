export type ResponseInfo = {
  headers?: Record<string, any>
  code?: number
}

export type APIResponse<Data> = {
  data: Data
  info: ResponseInfo
}
