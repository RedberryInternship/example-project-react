import { ReactElement } from 'react'

type FetchedDataRendererProps = {
  onItemRender: (val: any, index: number) => ReactElement
} & PartialProps

type PartialProps = {
  property: string
  fetchData: () => Promise<any>
  updateAlways?: boolean
  data?: any
}

export type FetchedDataRendererFC = (props: FetchedDataRendererProps) => ReactElement

export type UseFetchedDataRendererProps = PartialProps
