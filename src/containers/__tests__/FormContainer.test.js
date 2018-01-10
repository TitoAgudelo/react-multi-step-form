import React from 'react';
import renderer from 'react-test-renderer';
import FormContainer from './../FormContainer';

jest.mock('./../../components/Form');

it('renders correctly', () => {
  const tree = renderer
    .create(
      <FormContainer.WrappedComponent />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});