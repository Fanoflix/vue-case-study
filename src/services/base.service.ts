import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { APIResponse } from './utils'

export class BaseAPIService {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL
    })
  }

  getAxiosInstance() {
    return this.axiosInstance
  }

  async axiosCall<T>(requestConfig: AxiosRequestConfig): Promise<APIResponse<T>> {
    // try {
    const { data, headers, status } = await this.axiosInstance.request<T>(requestConfig)
    return { data, info: { headers, code: status } }
    // } catch (error: any) {
    //   console.error(error)
    //   // Log error to a logging service
    //   return error
    // }
  }
}
