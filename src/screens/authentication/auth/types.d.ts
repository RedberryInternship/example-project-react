type InputValues = {
  phone: string
  password: string
}

export type Authenticate = (params: InputValues) => Promise<void>