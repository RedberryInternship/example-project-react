import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { Charger } from 'types'
import MapMarkerItem from 'components/MapMarkerItem'
import { PinsFC } from './types'

const Pins: PinsFC = (
  {
    filteredChargersOnMap,
    onMarkerPress,
    showAll,
  },
) => {
  const state = useSelector(selectUser)
  const chargers = showAll ? state?.AllChargers : filteredChargersOnMap

  const pinItems = chargers?.map((charger: Charger) => (
    <MapMarkerItem
      key={charger.id}
      lat={parseFloat(charger.lat.toString())}
      lng={parseFloat(charger.lng.toString())}
      onPress={() => onMarkerPress(charger)}
      fastCharger={charger.connector_types?.[0]?.name !== 'Type 2'}
      privateCharger={!charger.public}
      status={charger.status}
      groupChargerCount={charger.charger_group?.chargers?.length ?? 0}
    />
  ))

  return <>{pinItems}</>
}

export default memo(Pins)
