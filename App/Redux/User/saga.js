import {call, put, takeLatest, select} from 'redux-saga/effects';
import {Platform} from 'react-native';
import Actions, {UserTypes, currentUser} from './reducer';
import PracticeActions from '../Practices/reducer';
import AppActions, {app} from '../Root/reducer';
import {setToken} from '../../Services/genericApi';
import {navigate, popToTop, goBack} from '../../Utils/rNavigation';
import AsapApis from '../../Services/AsapApis';

function* register(res) {
  try {
    yield put(AppActions.loading(true));
    const {data} = yield call(AsapApis.register, res.payload);
    if (data) {
      setToken(data.access_token);
      yield put(
        Actions.setUser({
          auth: true,
          auth_token: data.access_token,
          ...data,
        }),
      );
      yield put(AppActions.loading(false));
      yield call(navigate, 'MainTab');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
function* login(res) {
  try {
    yield put(AppActions.loading(true));
    const {data} = yield call(AsapApis.login, res.payload);
    if (data) {
      setToken(data.access_token);
      yield put(
        Actions.setUser({
          auth: true,
          auth_token: data.access_token,
          ...data,
        }),
      );
      yield put(AppActions.loading(false));
      yield call(navigate, 'MainTab');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
function* forgotPassword(res) {
  try {
    yield put(AppActions.loading(true));
    const data = yield call(AsapApis.forgotPassword, res.payload);
    if (data) {
      yield put(AppActions.loading(false));
      yield call(navigate, 'MainTab');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* changePassword(res) {
  try {
    const data = yield select(currentUser);
    yield put(AppActions.loading(true));
    const dataGet = yield call(
      AsapApis.changePassword,
      data.user.id,
      res.payload,
    );
    if (dataGet) {
      yield put(AppActions.loading(false));
      yield call(navigate, 'Login');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* updateProfile(res) {
  try {
    const dataUser = yield select(currentUser);
    yield put(AppActions.loading(true));
    const {data} = yield call(
      AsapApis.updateProfile,
      dataUser.user.id,
      res.payload,
    );
    if (data) {
      yield put(AppActions.loading(false));
      console.log('dataGet', data);
      yield put(
        Actions.setUser({
          ...data,
        }),
      );
      // yield call(navigate, 'Login');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* logout() {
  try {
    yield call(popToTop, null);
    yield call(navigate, 'Login');
    yield put(Actions.resetUser());
    yield put(PracticeActions.resetPractice());
    setToken(null);
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
export default [
  takeLatest(UserTypes.REGISTER, register),
  takeLatest(UserTypes.LOGIN, login),
  takeLatest(UserTypes.FORGOT_PASSWORD, forgotPassword),
  takeLatest(UserTypes.CHANGE_PASSWORD, changePassword),
  takeLatest(UserTypes.LOGOUT, logout),
  takeLatest(UserTypes.UPDATE_PROFILE, updateProfile),
];
