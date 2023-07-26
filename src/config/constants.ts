const errorMessages = Object.freeze({
  UNKNOWN_ERROR_MESSAGE: 'An unknown error has occured. Please try reloading.',
  DEFAULT_ERROR_MESSAGE: 'An error has occured. Please try reloading.',
  OFFLINE_WARNING: "You're offline. Check your connection."
})

const successMessages = Object.freeze({
  BACK_ONLINE_NOTIFICATION: 'Connection Restored!'
})
export { successMessages, errorMessages }
