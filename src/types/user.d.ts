import { Charger, Favorite } from 'types/chargers'
import { UserMeResponseType } from 'types/services'

export type UserState = {
  user: UserMeResponseType | null
  loading: boolean
  AllChargers: Charger[] | null
  authStatus: 'failed' | 'success' | null
  favoriteChargers: Favorite[] | null
  userState: any
}

export type UserCard = {
  active: number
  card_holder: string
  created_at: string
  default: number
  id: number
  masked_pan: string
  old_id: null
  order_index: number
  transaction_id: string
  updated_at: string
  user_id: number
  user_old_id: null | number
}
