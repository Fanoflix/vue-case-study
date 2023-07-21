import API_URLS from '../urls'
import type { Post } from './types'
import { BaseAPIService } from '../base.service'

class PostsAPIService extends BaseAPIService {
  constructor() {
    super(API_URLS.posts)
  }

  async getAllPosts() {
    return this.axiosCall<Post[]>({ method: 'get' })
  }
}

const postsAPIService = new PostsAPIService()
export default postsAPIService
