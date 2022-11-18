import { all } from 'redux-saga/effects';
import SensorsScreenSaga from '../containers/SensorsScreen/saga';
import HomeScreenSaga from '../containers/HomeScreen/saga';

function* rootSaga() {
  yield all([HomeScreenSaga(), SensorsScreenSaga()]);
}

export default rootSaga;
