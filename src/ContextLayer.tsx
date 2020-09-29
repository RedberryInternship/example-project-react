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
    HomeContext,
    homeContextValue,
    AppContext,
    appContextValue,
    ChargerContext,
    chargerContextValue,
  } = createState()

  console.log(['Contexts - Layer'])

  return (
    <AppContext.Provider value={appContextValue}>
      <ChargerContext.Provider value={chargerContextValue}>
        <HomeContext.Provider value={homeContextValue}>
          {props.children}
        </HomeContext.Provider>
      </ChargerContext.Provider>
    </AppContext.Provider>
  )
}

export default ContextLayer
