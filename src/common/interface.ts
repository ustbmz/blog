export interface MDInfo {
  _id: string
  author?: string
  type?: string
  title?: string
  content?: any
  created?: string
}
export interface MDTitlelist {
  title: string
  lineIndex: string
  indent: string
  offsetHeight: number
}

export interface HttpResponse {
  code: number
  data: any
  msg?: string | Record<string, any>
  token?: string
  total?: number
  count?: number
  fav?: number
}
