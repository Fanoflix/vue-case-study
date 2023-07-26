import API_URLS from '../apiUrls'
import type { Post } from './types'
import { BaseAPIService } from '../base.service'

export class PostsAPIService extends BaseAPIService {
  constructor() {
    super(API_URLS.posts)
  }

  async getAllPosts() {
    return this.axiosCall<Post[]>({ method: 'get' })
  }

  async getPostById(postId: number) {
    return this.axiosCall<Post>({ method: 'get', url: `/${postId}` })
  }

  async getPostsByUserId(userId: number) {
    return this.axiosCall<Post[]>({ method: 'get', params: { userId } })
  }
}

const postsAPIService = new PostsAPIService()
export default postsAPIService
