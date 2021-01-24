import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  createPractice: ['payload'],
  setCreatePractice: ['payload'],
  getListPractices: ['payload'],
  setListPractice: ['payload'],
  setSelectedPractice: ['payload'],
  practiceFeedback: ['payload'],
  setPracticeFeedback: ['payload'],
  resetPractice: ['payload'],
  getPracticeFeedbackReport: ['payload'],
  setPracticeFeedbackReport: ['payload'],
  setSelectedPracticeFeedbackReports: ['payload'],
  practiceFeedbackReflection: ['payload'],
  setFeedbackByUser: ['payload'],
  downloadPracticeFeedbackReport: ['payload'],
  practiceDelete: ['payload'],
});

export const PracticesType = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  newCreatedPractice: null,
  listPractice: null,
  selectedPractice: null,
  practiceFeedback: null,
  practiceFeedbackReports: null,
  selectedPracticeFeedbackReports: null,
  feedbackByUser: null,
});
const setCreatePractice = (state, {payload}) =>
  state.set('newCreatedPractice', payload);
const setListPractice = (state, {payload}) =>
  state.set('listPractice', payload);
const setSelectedPractice = (state, {payload}) =>
  state.set('selectedPractice', payload);
const setPracticeFeedback = (state, {payload}) =>
  state.set('practiceFeedback', payload);
const setPracticeFeedbackReport = (state, {payload}) =>
  state.set('practiceFeedbackReport', payload);
const resetPractice = () => INITIAL_STATE;
const setSelectedPracticeFeedbackReports = (state, {payload}) =>
  state.set('selectedPracticeFeedbackReports', payload);
const setFeedbackByUser = (state, {payload}) =>
  state.set('feedbackByUser', payload);

// /* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CREATE_PRACTICE]: setCreatePractice,
  [Types.SET_LIST_PRACTICE]: setListPractice,
  [Types.SET_SELECTED_PRACTICE]: setSelectedPractice,
  [Types.SET_PRACTICE_FEEDBACK]: setPracticeFeedback,
  [Types.RESET_PRACTICE]: resetPractice,
  [Types.SET_PRACTICE_FEEDBACK_REPORT]: setPracticeFeedbackReport,
  [Types.SET_SELECTED_PRACTICE_FEEDBACK_REPORTS]: setSelectedPracticeFeedbackReports,
  [Types.SET_FEEDBACK_BY_USER]: setFeedbackByUser,
});

export const practices = (state) => state.practices;
