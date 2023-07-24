import API_URLS from '../apiUrls'
import type { Post } from './types'
import { BaseAPIService } from '../base.service'

export class PostsAPIService extends BaseAPIService {
  constructor() {
    super(API_URLS.posts)
  }

  async getAllPosts() {
    console.log('This', this)
    return this.axiosCall<Post[]>({ method: 'get' })
  }
}

const postsAPIService = new PostsAPIService()
export default postsAPIService
