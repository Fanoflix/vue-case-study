import type { APIResponse, ResponseInfo } from '@/services/utils'
import { errorMessages } from '@/config/constants'
import { ref, type Ref, type UnwrapRef } from 'vue'

export interface UseAsyncReturn<Data> {
  data: Ref<UnwrapRef<Data> | null>
  info: Ref<ResponseInfo | null>
  error: Ref<CustomApiErrorResponse | null>
  isLoading: Ref<Boolean>
  isFinished: Ref<Boolean>
  run: () => Promise<void>
}

export type CustomApiErrorResponse = {
  message: string
  code: number | string
}

/**
 * @description Wrapper composable for reactive async state.
 *
 * @param callback Asynchronous callback method
 *
 */
const useAsync = <Data>(callback: () => Promise<APIResponse<Data>>): UseAsyncReturn<Data> => {
  if (!callback) throw new Error('useAsync composable call is missing callback function!')

  const data = ref<Data | null>(null)
  const error = ref<CustomApiErrorResponse | null>(null)
  const info = ref<ResponseInfo | null>(null)
  const isLoading = ref<boolean>(false)
  const isFinished = ref<boolean>(false)

  async function run(): Promise<void> {
    try {
      loading(true)
      const { data: responseData, info: responseInfo } = await callback()
      data.value = responseData as UnwrapRef<Data>
      info.value = responseInfo
    } catch (e: unknown) {
      error.value = processError(e)
    } finally {
      loading(false)
    }
  }

  const loading = (loading: boolean) => {
    isLoading.value = loading
    isFinished.value = !loading
  }

  return { data, info, error, isLoading, isFinished, run }
}

const processError = (error: any): CustomApiErrorResponse => {
  // Log to a logging service

  const customError = {
    message: errorMessages.UNKNOWN_ERROR_MESSAGE,
    errorCode: 'Unknown'
  }

  if (error.message && error.code) {
    customError.message = error.message
    customError.errorCode = error.code
  }
  if (error.message) {
    customError.message = error.message
    customError.errorCode = 'Unknown'
  }

  console.error(customError)
  return customError
}

export default useAsync
