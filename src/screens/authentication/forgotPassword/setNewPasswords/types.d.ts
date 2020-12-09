type InputValues = {
  password: string
  repeatPassword: string
}

export type SetNewPassword = (params: InputValues) => Promise<void>
