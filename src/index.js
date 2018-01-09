import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import FormContainer from './containers/FormContainer';
import reducer from './reducers';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const initialState = {}
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

render(
  <Provider store={store}>
    <FormContainer />
  </Provider>,
  document.getElementById('root')
);
