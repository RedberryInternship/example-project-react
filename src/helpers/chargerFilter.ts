import {
  ChargerFilters,
  Charger,
  ChargersObject,
} from '../../@types/allTypes.d'
import services from 'services'
import { DisplayDropdownWithError } from 'helpers/inform'

export const GetFilteredCharger = async (
  selectedFilters: number[],
  filterInput = '',
): Promise<Charger[] | null> => {
  const params: ChargerFilters = ConvertToChargerFilterParam(filterInput)
  // Vobi Todo: why Object.entries
  if (Object.entries(params).length !== 0) {
    try {
      const { data }: ChargersObject = await services.getAllChargersFiltered()
      if (filterInput !== '') {
        return searchChargers(filterInput, data)
      }
      return filterChargers(selectedFilters, data)
    } catch (error) {
      DisplayDropdownWithError()
    }
  }
  return null
}

// Vobi todo: this helper is unnecessary
// but if you like this approach you can use following typing
// const ConvertToChargerFilterParam = (filterInput = ''): ChargerFilters => ({ text: filterInput })
const ConvertToChargerFilterParam = (filterInput = ''): object => {
  const param: ChargerFilters = {}

  param.text = filterInput
  return param
}

// Vobi Todo: searchChargers can be written as this
// const searchChargers = (text: string, data: Charger[]) => data.filter(charger => {
//   const stringifiedCharger = JSON.stringify(charger);
//   return stringifiedCharger.toLowerCase().includes(text.toLowerCase())
// })
const searchChargers = (text: string, data: Charger[]) => {
  const list = data.filter((charger) => {
    const string = JSON.stringify(charger)
    if (string.toLowerCase().includes(text.toLowerCase())) {
      return true
    }
    return false
  })
  return list
}

const filterChargers = (selectedFilters: number[], data: Charger[]) => {
  let showAll = true
  if (selectedFilters.length) {
    showAll = selectedFilters.indexOf(1) > -1 ? false : true
  }
  return data.filter((charger, index) => {
    let isFree: boolean = false
    let isBusy: boolean = false
    let isPublic: boolean = false
    let isFast: boolean = false

    if (charger.status === 'CHARGING') {
      isBusy = true
    }

    if (charger.status === 'ACTIVE') {
      isFree = true
    }

    if (charger?.public) {
      isPublic = true
    }

    if (
      charger.connector_types[0]?.name === 'Combo 2' ||
      charger.connector_types[0]?.name === 'Chademo'
    ) {
      isFast = true
    }

    // //free
    if (isFree && selectedFilters[0]) {
      if (filterByStatus(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    //busy
    if (isBusy && selectedFilters[1]) {
      if (filterByStatus(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    if (
      isFast &&
      selectedFilters[2] &&
      selectedFilters[2] &&
      !selectedFilters[0] &&
      !selectedFilters[1]
    ) {
      if (filterByChargerType(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    if (
      !isFast &&
      selectedFilters[3] &&
      !selectedFilters[0] &&
      !selectedFilters[1]
    ) {
      if (filterByChargerType(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    if (
      isPublic &&
      selectedFilters[4] &&
      !selectedFilters[0] &&
      !selectedFilters[1] &&
      !selectedFilters[2] &&
      !selectedFilters[3]
    ) {
      if (filterByChargerAccess(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    if (
      !isPublic &&
      selectedFilters[5] &&
      !selectedFilters[0] &&
      !selectedFilters[1] &&
      !selectedFilters[2] &&
      !selectedFilters[3]
    ) {
      if (filterByChargerAccess(isFast, isPublic, selectedFilters)) {
        return true
      }
    }

    return showAll
  })
}
// Vobi todo: refacor as this and move selectedFilters as enum types
// const filterChargers = (selectedFilters: number[], data: Charger[]) => {
//   let showAll = true;
//   if (selectedFilters.length) {
//     showAll = !!(selectedFilters.indexOf(1) > -1)
//   }
//   return data.filter((charger, index) => {
//     let isFree = charger.status === "ACTIVE";
//     let isBusy = charger.status === "CHARGING";
//     let isPublic = !!charger?.public;
//     let isFast = charger.connector_types[0]?.name === 'Combo 2' || charger.connector_types[0]?.name === 'Chademo'

//     if ((isFree && selectedFilters[0]) || (isBusy && selectedFilters[1])) {
//       if(filterByStatus(isFast, isPublic, selectedFilters)) return true
//     }

//     if (
//       (isFast && selectedFilters[2] && selectedFilters[2] && !selectedFilters[0] && !selectedFilters[1]) ||
//       (!isFast && selectedFilters[3] && !selectedFilters[0] && !selectedFilters[1]) ||
//       (!isFast && selectedFilters[3] && !selectedFilters[0] && !selectedFilters[1])
//     ) {
//       if(filterByChargerType(isFast, isPublic, selectedFilters)) return true
//     }

//     if (
//       (isPublic && selectedFilters[4] && !selectedFilters[0] && !selectedFilters[1] && !selectedFilters[2] && !selectedFilters[3]) ||
//       (!isPublic && selectedFilters[5] && !selectedFilters[0] && !selectedFilters[1] && !selectedFilters[2] && !selectedFilters[3])
//     ) {
//       if(filterByChargerAccess(isFast, isPublic, selectedFilters)) return true
//     }

//     return showAll;
//   })
// }

const filterByStatus = (
  isFast: boolean,
  isPublic: boolean,
  selectedFilters: number[],
) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (
    !selectedFilters[2] &&
    !selectedFilters[3] &&
    !selectedFilters[4] &&
    !selectedFilters[5]
  ) {
    return true
  }
}

const filterByChargerType = (
  isFast: boolean,
  isPublic: boolean,
  selectedFilters: number[],
) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (!selectedFilters[4] && !selectedFilters[5]) {
    return true
  }
}

const filterByChargerAccess = (
  isFast: boolean,
  isPublic: boolean,
  selectedFilters: number[],
) => {
  if (filterSlowChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (filterFastChargers(isFast, isPublic, selectedFilters)) {
    return true
  }
  if (!selectedFilters[2] && !selectedFilters[3]) {
    return true
  }
}

const filterSlowChargers = (
  isFast: boolean,
  isPublic: boolean,
  selectedFilters: number[],
) => {
  if (!isFast && isPublic && selectedFilters[3] && selectedFilters[4]) {
    return true
  }

  //slow and private
  if (!isFast && !isPublic && selectedFilters[3] && selectedFilters[5]) {
    return true
  }

  //slow and busy
  if (
    !isFast &&
    selectedFilters[3] &&
    !selectedFilters[4] &&
    !selectedFilters[5]
  ) {
    return true
  }

  //slow and public
  if (
    isPublic &&
    !isFast &&
    !selectedFilters[2] &&
    selectedFilters[4] &&
    !selectedFilters[5]
  ) {
    return true
  }

  //slow and private
  if (
    !isPublic &&
    !isFast &&
    !selectedFilters[2] &&
    selectedFilters[5] &&
    !selectedFilters[4]
  ) {
    return true
  }

  if (!selectedFilters[2] && selectedFilters[5] && selectedFilters[4]) {
    return true
  }

  return false
}

const filterFastChargers = (
  isFast: boolean,
  isPublic: boolean,
  selectedFilters: number[],
) => {
  if (isFast && isPublic && selectedFilters[2] && selectedFilters[4]) {
    return true
  }

  //Fast and private
  if (isFast && !isPublic && selectedFilters[2] && selectedFilters[5]) {
    return true
  }

  //Fast
  if (
    isFast &&
    selectedFilters[2] &&
    !selectedFilters[4] &&
    !selectedFilters[5]
  ) {
    return true
  }

  //Fast and public
  if (
    isPublic &&
    isFast &&
    !selectedFilters[3] &&
    selectedFilters[4] &&
    !selectedFilters[5]
  ) {
    return true
  }

  //Fast and private
  if (
    !isPublic &&
    isFast &&
    !selectedFilters[3] &&
    selectedFilters[5] &&
    !selectedFilters[4]
  ) {
    return true
  }

  if (!selectedFilters[3] && selectedFilters[5] && selectedFilters[4]) {
    return true
  }

  return false
}
