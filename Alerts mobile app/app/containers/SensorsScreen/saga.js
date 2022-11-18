import { put, takeLatest } from 'redux-saga/effects';
import { find } from 'utils/realm';

function* getSensorsSaga({ payload }) {
  try {
    const response = yield find('sensors', payload?.realm);
    yield put({ type: 'GET_SENSORS', response });
  } catch (error) {
    yield put({ type: 'GET_SENSORS_FAILURE', error: error.message });
  }
}

export default function* SensorsScreenSaga() {
  yield takeLatest('GET_SENSORS_REQUEST', getSensorsSaga);
}
