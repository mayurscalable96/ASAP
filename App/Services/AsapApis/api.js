import {
  post,
  get,
  put,
  patch,
  postMultipart,
  downloadFile,
  setToken,
} from '../genericApi';
import apiConstants from '../apiConstants';
/* ------------- Global Functions  ------------- */

const getErrorText = (error) => error || 'Error completing request';

const checkError = (res) => {
  if (res === undefined || res.data.status === 0 || res.status === 401) {
    console.log("ifff");
    throw new Error(
      getErrorText(res === undefined ? 'Somting Went Wrong' : res.data.message),
    );
  }
};
/* ------------- Non-Auth(Apis) Functions  ------------- */

export const register = async (payload) => {
  const res = await post(apiConstants.REGISTER, payload);
  checkError(res);
  return res.data;
};

export const login = async (payload) => {
  const res = await post(apiConstants.LOGIN, payload);
  checkError(res);
  return res.data;
};
export const forgotPassword = async (payload) => {
  const res = await post(apiConstants.FORGOT_PASSWORD, payload);
  checkError(res);
  return res.data;
};

/* ------------- Auth(Apis) Functions  ------------- */
export const changePassword = async (id, payload) => {
  const res = await patch(apiConstants.CHANGE_PASSWORD + '/' + id, payload);
  checkError(res);
  return res.data;
};

export const updateProfile = async (id, payload) => {
  const res = await patch(apiConstants.UPDATE_PROFILE + '/' + id, payload);
  checkError(res);
  return res.data;
};

export const createPractice = async (payload) => {
  const res = await post(apiConstants.PRACTICE, payload);
  checkError(res);
  return res.data;
};

export const getListPractices = async (payload) => {
  const res = await get(apiConstants.PRACTICE, payload);
  checkError(res);
  return res.data;
};

//
export const practiceFeedback = async (payload) => {
  const res = await post(apiConstants.PRACTICE_FEEDBACK, payload);
  checkError(res);
  return res.data;
};

export const getPracticeFeedbackReport = async (payload) => {
  const res = await get(apiConstants.PRACTICE_FEEDBACK_REPORT, payload);
  checkError(res);
  return res.data;
};

export const practiceFeedbackReflection = async (payload) => {
  const res = await patch(apiConstants.PRACTICE_FEEDBACK_REFLECTION, payload);
  checkError(res);
  return res.data;
};
export const downloadPracticeFeedbackReport = async (payload) => {
  const res = await get(
    apiConstants.DOWNLOAD_PRACTICE_FEEDBACK_REPORT,
    payload,
  );
  checkError(res);
  return res.data;
};

export const practiceDelete = async (payload) => {
  const res = await get(apiConstants.PRACTICE_DELETE, payload);
  checkError(res);
  return res.data;
};
