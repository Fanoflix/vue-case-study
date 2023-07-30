import { SnackbarTypes } from '@/stores/snackbar'

export interface ApplicationConfiguration {
  /**
   * Number of posts per page for pagination
   */
  POSTS_LIST_PAGE_SIZE: number

  /**
   * Number of comments to show in Posts List view
   */
  COMMENTS_PREVIEW_SIZE: number

  /**
   * Number of comments to show at a time in Posts detailed View
   */
  COMMENTS_LIST_PAGE_SIZE: number

  /**
   * Number of characters of the 'body' of the post content to show in
   * Posts List view
   */
  CLIPPED_BODY_CONTENT_LENGTH: number

  /**
   * Time in milliseconds, after which the network notification will disappear.
   */
  NETWORK_CONNECTIVITY_NOTIFICATION_FADE_TIMEOUT: number

  /**
   * Time in milliseconds, after which the snackbar notification will disappear.
   */
  SNACKBAR_NOTIFICATION_FADE_TIMEOUT: number

  /**
   * Default Snackbar type which affects the background color of the snackbar.
   */
  DEFAULT_SNACKBAR_TYPE: SnackbarTypes
}

const applicationConfig = Object.freeze<ApplicationConfiguration>({
  POSTS_LIST_PAGE_SIZE: 10,
  COMMENTS_PREVIEW_SIZE: 2,
  COMMENTS_LIST_PAGE_SIZE: 10,
  CLIPPED_BODY_CONTENT_LENGTH: 60,
  NETWORK_CONNECTIVITY_NOTIFICATION_FADE_TIMEOUT: 1500,
  SNACKBAR_NOTIFICATION_FADE_TIMEOUT: 5500,
  DEFAULT_SNACKBAR_TYPE: SnackbarTypes.success
})

export default applicationConfig
