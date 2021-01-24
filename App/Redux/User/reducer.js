import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setUser: ['payload'],
  resetUser: ['payload'],
  register: ['payload'],
  login: ['payload'],
  forgotPassword: ['payload'],
  changePassword: ['payload'],
  logout: ['payload'],
  updateProfile: ['payload'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  auth: false,
  auth_token: null,
});

// /* ------------- Reducers ------------- */

const set = (state, {payload}) => state.merge(payload);
const resetUser = () => INITIAL_STATE;

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: set,
  [Types.RESET_USER]: resetUser,
});

export const currentUser = (state) => state.user;
