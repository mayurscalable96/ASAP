import {all} from 'redux-saga/effects';
import app from '../Redux/Root/saga';
import user from '../Redux/User/saga';
import practices from '../Redux/Practices/saga';

export default function* sagas() {
  yield all([...app, ...user, ...practices]);
}
