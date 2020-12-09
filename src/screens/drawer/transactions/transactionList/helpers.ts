import services from 'services'

export const getTransactionsHistory = async (): Promise<any> => {
  const res = await services.getTransactionsHistory()
  return res.data
}
