import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'state/reducer'
import createSagaMiddleware from 'redux-saga'
import { userSagas } from 'state/sagas'

/**
 * Integrate react native debugger with redux.
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create saga middleware.
 */
const sagaMiddleware = createSagaMiddleware()

/**
 * Export redux store.
 */
export default createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

/**
 * Register sagas.
 */
sagaMiddleware.run(userSagas)
