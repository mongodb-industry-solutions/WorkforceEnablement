import { put, takeLatest } from 'redux-saga/effects';
import { login, getRealm } from 'utils/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

function* loginUserSaga({ payload }) {
  try {
    const response = yield login(payload?.email, payload?.password);
    yield put({ type: 'LOGIN_USER', response });
  } catch (error) {
    yield put({ type: 'LOGIN_USER_FAILURE', error: error.message });
  }
}

function* logoutUserSaga({}) {
  try {
    messaging().deleteToken();
    AsyncStorage.clear();
    yield put({ type: 'LOGOUT_USER' });
  } catch (error) {
    yield put({ type: 'LOGOUT_USER_FAILURE', error: error.message });
  }
}

function* realmConnectionSaga({ payload }) {
  try {
    const response = yield getRealm(payload?.realmUser);
    yield put({ type: 'REALM_CONNECTION', response });
  } catch (error) {
    yield put({ type: 'REALM_CONNECTION_FAILURE', error: error.message });
  }
}

export default function* HomeScreenSaga() {
  yield takeLatest('LOGIN_REQUEST', loginUserSaga);
  yield takeLatest('LOGOUT_REQUEST', logoutUserSaga);
  yield takeLatest('REALM_CONNECTION_REQUEST', realmConnectionSaga);
}
