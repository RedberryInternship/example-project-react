import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import AsyncStorage from '@react-native-community/async-storage';


const enhancers = [
  applyMiddleware(
    thunkMiddleware
  ),
];

const composeEnhancers = compose;

const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, {}, composeEnhancers(...enhancers));
export const persistor = persistStore(store);
