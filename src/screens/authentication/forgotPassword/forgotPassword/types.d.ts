type InputValues = {
  phone: string
  code: string
}

export type ForgotPassword = (params: InputValues) => Promise<void>