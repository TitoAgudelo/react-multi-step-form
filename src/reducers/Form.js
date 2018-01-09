import {
  STEP_ONE, STEP_TWO, STEP_THREE, STEP_FOUR,
  SUBMIT_FORM_DATA, SUBMIT_FORM_DATA_SUCCESS, SUBMIT_FORM_DATA_ERROR,
  CHECK_TEXT, CHECK_TEXT_SUCCESS, CHECK_TEXT_FAILURE,
  PENDING, SUCCESS, FAILED
} from './../constants/';

const initialState = {
  nextStep: 1,
  payload: {}
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case STEP_ONE:
      let A1 = action.payload.A1 === true ? 'A1' : '';
      let A2 = action.payload.A2 === true ? 'A2' : '';
      let a = [A1, A2].filter((item) => {
        return item !== '';
      });
      return {
        ...state,
        nextStep: 2,
        payload: Object.assign({}, state.payload,{
          a: a
        })
      };

    case STEP_TWO:
      let b = action.payload.B1 === true ? 'B1' : 'B2';
      return {
        ...state,
        nextStep: 3,
        payload: Object.assign({}, state.payload,{
          b: b
        })
      };

    case STEP_THREE:
      return {
        ...state,
        nextStep: 4,
        payload: Object.assign({}, state.payload,{
          text: action.payload.value
        })
      };

    case STEP_FOUR:
      return {
        ...state,
        nextStep: 5,
        payload: Object.assign({}, state.payload,{
          c: action.payload.value
        })
      };

    case SUBMIT_FORM_DATA:
      return {
        ...state,
        formSubmissionStatus: PENDING
      };

    case SUBMIT_FORM_DATA_SUCCESS:
      return {
        ...state,
        formSubmissionStatus: SUCCESS
      };

    case SUBMIT_FORM_DATA_ERROR:
      return {
        ...state,
        formSubmissionStatus: FAILED,
        formSubmissionError: action.payload.error
      };

    case CHECK_TEXT:
      return {
        ...state,
        checkTextStatus: PENDING
      };

    case CHECK_TEXT_SUCCESS:
      return {
        ...state,
        checkTextStatus: SUCCESS
      };

    case CHECK_TEXT_FAILURE:
      return {
        ...state,
        checkTextStatus: FAILED,
        checkTextError: action.payload.error
      };

    default:
      return state;
  }
}
