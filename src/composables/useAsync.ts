import type { ResponseInfo } from '@/services/utils'
import { ref } from 'vue'

const useAsync = <T>(callback: () => any) => {
  if (!callback) throw new Error('useAsync composable call is missing callback function!')

  const data = ref<T | null>(null)
  const error = ref<unknown | null>(null)
  const info = ref<ResponseInfo | null>(null)
  const isLoading = ref<boolean>(false)
  const run = async () => {
    try {
      isLoading.value = true
      const [errorResponse, responseData, resposneInfo] = await callback()
      data.value = responseData
      info.value = resposneInfo
      error.value = errorResponse
    } catch (e: unknown) {
      error.value = processError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { data, info, error, isLoading, run }
}

const processError = (error: unknown) => {
  // Log to a logging service
  console.error(error)
  return error
}

export default useAsync
