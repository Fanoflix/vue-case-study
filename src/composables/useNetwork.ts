import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export interface UseNetworkReturn {
  /**
   * Current status of network connectivity.
   */
  isOnline: Ref<boolean>

  /**
   * Reflects whether the user has disconnected once in the current session.
   */
  hasDisconnected: Ref<boolean>
}

/**
 * @description Returns network connectivity status
 */
const useNetwork = (): UseNetworkReturn => {
  const isOnline = ref<boolean>(false)
  const hasDisconnected = ref<boolean>(false)
  const navigator = window?.navigator

  function updateNetworkInformation() {
    if (!navigator) return
    if (!isOnline.value) hasDisconnected.value = true

    isOnline.value = navigator.onLine
  }

  if (window) updateNetworkInformation()

  onMounted(() => {
    addEventListener('online', updateNetworkInformation)
    addEventListener('offline', updateNetworkInformation)
  })
  onUnmounted(() => {
    removeEventListener('online', updateNetworkInformation)
    removeEventListener('offline', updateNetworkInformation)
  })

  return { isOnline, hasDisconnected }
}

export default useNetwork
