import { Charger as BaseCharger } from 'types'

export type Charger = (BaseCharger & { from?: string }) | undefined
