import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { errorMessages } from '@/config/constants'
import applicationConfig from '@/config/application'

export enum SnackbarTypes {
  success = 'success',
  warn = 'warn',
  danger = 'danger'
}

export interface SnackbarStoreState {
  isActive: boolean
  message: string
  type: SnackbarTypes
  isInfinite: boolean
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbarState = reactive<SnackbarStoreState>({
    isActive: false,
    message: errorMessages.DEFAULT_ERROR_MESSAGE,
    type: applicationConfig.DEFAULT_SNACKBAR_TYPE,
    isInfinite: false
  })

  let snackbarNotificationTimeout: number | undefined

  const closeSnackbarWithDelay = () => {
    snackbarNotificationTimeout = setTimeout(() => {
      $reset()
    }, applicationConfig.SNACKBAR_NOTIFICATION_FADE_TIMEOUT)
  }

  const $reset = () => {
    snackbarState.isActive = false
    snackbarState.message = errorMessages.DEFAULT_ERROR_MESSAGE
    snackbarState.type = applicationConfig.DEFAULT_SNACKBAR_TYPE
    snackbarState.isInfinite = false
  }

  const clearSnackbarTimeout = () => {
    if (snackbarNotificationTimeout) clearTimeout(snackbarNotificationTimeout)
  }

  /**
   * @Actions
   */

  const showSnackbar = (message: string, type: SnackbarTypes, isInfinite: boolean = false) => {
    snackbarState.isActive = true
    snackbarState.message = message
    snackbarState.type = type
    snackbarState.isInfinite = isInfinite

    if (!snackbarState.isInfinite) {
      clearSnackbarTimeout()
      closeSnackbarWithDelay()
    }
  }

  const closeSnackbar = () => {
    clearSnackbarTimeout()
    $reset()
  }

  return { snackbarState, showSnackbar, closeSnackbar }
})
