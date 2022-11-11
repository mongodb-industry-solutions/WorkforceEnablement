import { combineReducers } from 'redux';
import sensorReducer from 'containers/SensorsScreen/reducer';
import homeReducer from 'containers/HomeScreen/reducer';

export const createReducer = combineReducers({
  home: homeReducer,
  sensors: sensorReducer,
});
