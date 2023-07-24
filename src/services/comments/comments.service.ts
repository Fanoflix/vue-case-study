import API_URLS from '../apiUrls'
import { BaseAPIService } from '../base.service'
import type { Comment } from './types'

class CommentsAPIService extends BaseAPIService {
  constructor() {
    super(API_URLS.comments)
  }

  async getAllComments() {
    return this.axiosCall<Comment[]>({ method: 'get' })
  }
}

const commentsAPIService = new CommentsAPIService()
export default commentsAPIService
