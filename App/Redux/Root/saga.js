import {call, put, takeLatest, select} from 'redux-saga/effects';
import Actions, {AppTypes} from './reducer';
import AlertApi from '../../Services/alert';
import {navigate} from '../../Utils/rNavigation';
import UserAction, {currentUser} from '../User/reducer';
import {setToken} from '../../Services/genericApi';
import {Toast} from 'native-base';

function* error({payload}) {
  yield put(Actions.loading(false));
  if (typeof payload === 'string') {
    yield put(Actions.showAlert(payload));
  } else {
    yield put(Actions.showAlert(payload.message));
  }
}

function* startup() {
  const user = yield select(currentUser);
  alert(user);
  console.log('user', user);
  if (user.auth) {
    setToken(user.access_token);
    yield call(navigate, 'MainTab');
  } else {
    yield call(navigate, 'Login');
  }
}

function* alert({payload}) {
  yield call(AlertApi.alert, payload);
}
function* showToast(payload) {
  return Toast.show({
    text: payload.payload.message,
    textStyle: {paddingHorizontal: 10},
    style: {borderRadius: 30},
    // position:'top',
    duration: 3000,
  });
}

export default [
  takeLatest(AppTypes.STARTUP, startup),
  takeLatest(AppTypes.ERROR, error),
  takeLatest(AppTypes.SHOW_ALERT, alert),
  takeLatest(AppTypes.SHOW_TOAST, showToast),
];
