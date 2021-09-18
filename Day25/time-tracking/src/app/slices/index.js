import { combineReducers } from 'redux';
import auththentical from './userSlice';

export * from './userSlice';

const rootReducer = combineReducers({ auth: auththentical });

export default rootReducer;
