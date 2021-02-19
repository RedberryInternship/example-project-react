export type TransactionsHistoryResponseItem = {
  id: number
  charger_name: string
  address: string
  duration: string
  penalty_duration: null | string
  penalty_fee: null | string
  charge_power: null | string
  start_date: string
  charge_price: string
  user_card_pan: string | null
}
