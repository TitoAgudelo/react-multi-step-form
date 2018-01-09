import {
  STEP_ONE, STEP_TWO, STEP_THREE, STEP_FOUR,
  SUBMIT_FORM_DATA, SUBMIT_FORM_DATA_SUCCESS, SUBMIT_FORM_DATA_ERROR,
  CHECK_TEXT, CHECK_TEXT_SUCCESS, CHECK_TEXT_FAILURE
} from './../constants/';

import { checkIt, submitIt } from './../api';

export function stepOne(formInfo) {
  return {
    type: STEP_ONE,
    payload: formInfo,
  };
}

export function stepTwo(formInfo) {
  return {
    type: STEP_TWO,
    payload: formInfo,
  };
}

function submitData() {
  return {
    type: SUBMIT_FORM_DATA,
  };
}

function submitDataSuccess() {
  return {
    type: SUBMIT_FORM_DATA_SUCCESS,
  };
}

function submitDataFailure(error) {
  return {
    type: SUBMIT_FORM_DATA_ERROR,
    payload: {
      error,
    },
  };
}

function checkText() {
  return {
    type: CHECK_TEXT,
  };
}

function checkTextSuccess() {
  return {
    type: CHECK_TEXT_SUCCESS,
  };
}

function checkTextFailure(error) {
  return {
    type: CHECK_TEXT_FAILURE,
    payload: {
      error,
    },
  };
}

export function stepThree(formInfo) {
  return (dispatch) => {
    dispatch(checkText());
    checkIt(formInfo.value)
    .then(() => {
      dispatch(checkTextSuccess());
      dispatch({
        type: STEP_THREE,
        payload: formInfo,
      });
    }, (error) => {
      dispatch(checkTextFailure(error.message));
    });
  };
}


export function stepFour(formInfo) {
  return {
    type: STEP_FOUR,
    payload: formInfo,
  };
}

export function stepFive() {
  return (dispatch, getState) => {
    const state = getState();
    let formPayload = state.form.payload;
    dispatch(submitData());
    submitIt(formPayload).then(() => {
        dispatch(submitDataSuccess());
      }, (error) => {
        dispatch(submitDataFailure(error.message));
      });
  };
}
