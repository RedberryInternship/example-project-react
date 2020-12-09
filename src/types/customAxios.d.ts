export type Method = 'get' | 'post'

export type Axios = {
  get: (uri: string, params?: object) => Promise<any>
  post: (uri: string, payload: any) => Promise<any>
}

export type Fetch = (uri: string, data: any, method: Method, params: any) => Promise<any>

export type Error = {
  error: boolean
  status: number
}
