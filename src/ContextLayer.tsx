import React from 'react'
import createState from 'hooks/stateManager'

/**
 * Context layer is a place where all the context will be
 * wrapped to provide the state to application.
 *
 * @param props
 */
const ContextLayer = (props: any) => {
  const {
    ChargerContext,
    chargerContextValue,
  } = createState()

  console.log(['Contexts - Layer'])

  return (
    <ChargerContext.Provider value={chargerContextValue}>
      {props.children}
    </ChargerContext.Provider>
  )
}

export default ContextLayer
