import {call, put, takeLatest, select} from 'redux-saga/effects';
import {Platform, Linking} from 'react-native';
import Actions, {PracticesType} from './reducer';
import AppActions, {app} from '../Root/reducer';
import {navigate, popToTop, goBack} from '../../Utils/rNavigation';
import AsapApis from '../../Services/AsapApis';
import UserAction, {currentUser} from '../User/reducer';
import AlertApi from '../../Services/alert';

function* createPractice(res) {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(AsapApis.createPractice, res.payload);
    console.log('dataDet', dataGet);
    if (dataGet) {
      yield getListPractices();
      yield put(AppActions.loading(false));
      yield call(navigate, 'MainTab');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
function* getListPractices() {
  try {
    const data = yield select(currentUser);
    var paramData = {
      user_id: data.user.id,
    };
    yield put(AppActions.loading(true));
    const dataGet = yield call(AsapApis.getListPractices, paramData);
    if (dataGet) {
      yield put(AppActions.loading(false));
      yield put(Actions.setListPractice(dataGet.data.practices));
      // yield call(navigate, 'MainTab');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* practiceFeedback(res) {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(AsapApis.practiceFeedback, res.payload);
    if (dataGet) {
      yield put(Actions.setFeedbackByUser(res.payload));
      yield put(AppActions.loading(false));
      yield put(Actions.setPracticeFeedback(dataGet.data.practice_feedback[0]));
      yield getPracticeFeedbackReport();
      yield call(navigate, 'FeedbackThankyou');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}
function* getPracticeFeedbackReport() {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(AsapApis.getPracticeFeedbackReport);
    if (dataGet) {
      yield put(AppActions.loading(false));
      yield put(
        Actions.setPracticeFeedbackReport(
          dataGet.data.practice_feedback_report,
        ),
      );
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* practiceFeedbackReflection(res) {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(
      AsapApis.practiceFeedbackReflection,
      res.payload,
    );
    if (dataGet) {
      yield put(AppActions.loading(false));
      yield getPracticeFeedbackReport();
      yield call(navigate, 'FeedbackReports');
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* downloadPracticeFeedbackReport(res) {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(
      AsapApis.downloadPracticeFeedbackReport,
      res.payload,
    );
    if (dataGet) {
      console.log('dataGet', dataGet);
      yield put(AppActions.loading(false));
      yield Linking.openURL(dataGet.data.practice_feedback_report_url);
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

function* practiceDelete(res) {
  try {
    yield put(AppActions.loading(true));
    const dataGet = yield call(AsapApis.practiceDelete, res.payload);
    if (dataGet) {
      yield getListPractices();
      yield getPracticeFeedbackReport();
      yield put(AppActions.loading(false));
    }
  } catch (e) {
    yield put(AppActions.error(e));
  }
}

export default [
  takeLatest(PracticesType.CREATE_PRACTICE, createPractice),
  takeLatest(PracticesType.GET_LIST_PRACTICES, getListPractices),
  takeLatest(PracticesType.PRACTICE_FEEDBACK, practiceFeedback),
  takeLatest(
    PracticesType.GET_PRACTICE_FEEDBACK_REPORT,
    getPracticeFeedbackReport,
  ),
  takeLatest(
    PracticesType.PRACTICE_FEEDBACK_REFLECTION,
    practiceFeedbackReflection,
  ),
  takeLatest(
    PracticesType.DOWNLOAD_PRACTICE_FEEDBACK_REPORT,
    downloadPracticeFeedbackReport,
  ),
  takeLatest(PracticesType.PRACTICE_DELETE, practiceDelete),
];
