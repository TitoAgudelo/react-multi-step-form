import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Form from './../Form';
import * as actions from './../../actions';

it('renders correctly', () => {
  const form = {
    nextStep: 1,
    payload: {},
  };

  const tree = renderer
    .create(
      <Form form={form} actions={actions}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
