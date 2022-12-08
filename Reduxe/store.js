import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers';
import preventiveReducer from './reducers'

const rootReducer = combineReducers({ preventiveReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));