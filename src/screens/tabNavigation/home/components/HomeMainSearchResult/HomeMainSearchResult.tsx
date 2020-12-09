import React from 'react'
import { getLocaleText } from 'utils'
import { MainSearchItem } from '../index'
import { HomeMainSearchResultFC } from './types'

const HomeMainSearchResult: HomeMainSearchResultFC = (
  {
    item: charger,
    onSearchItemClickHandler,
  },
) => {
  const view = []

  if (charger?.charger_group?.chargers?.length !== 0) {
    view.push(
      <MainSearchItem
        key={`${charger.id} - ${charger.name}`}
        text={getLocaleText(charger.name)}
        mainTitle={getLocaleText(charger.location)}
        onPress={() => onSearchItemClickHandler(charger.lat, charger.lng)}
      />,
    )
  } else {
    charger?.charger_group?.chargers?.map((val) => view.push(
      <MainSearchItem
        key={`${val.id}inside`}
        text={getLocaleText(val.name)}
        mainTitle={getLocaleText(val.location)}
        onPress={() => onSearchItemClickHandler(val.lat, val.lng)}
      />,
    ))
  }
  return <>{view}</>
}

export default HomeMainSearchResult
