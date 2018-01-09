import React from 'react'
import classnames from 'classnames'
import { PropTypes } from 'prop-types';

import {
  PENDING, FAILED
} from './../constants/'

const options = ['C1', 'C2', 'C3']

export default class StepForm extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStep: props.form.nextStep,
      A1: false,
      A2: false,
      B1: false,
      B2: false,
      step3Text: '',
      selectedOption: options[0]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentStep: nextProps.form.nextStep,
      checkTextStatus: nextProps.form.checkTextStatus,
      formSubmissionStatus: nextProps.form.formSubmissionStatus,
      formSubmissionError: nextProps.form.formSubmissionError,
      checkTextError: nextProps.form.checkTextError
    });
  }

  renderErrorText(error) {
    let errorText = error || 'Error: Please try again.';
    return (
     <div>
       <span className="error-text">{errorText}</span>
     </div>
    );
  }

  /*
    Step 1
   */

  onCheckBoxesClicked(event) {
    let checkBoxId = event.target.id;
    let isA1Checked = checkBoxId === 'A1' ? !this.state.A1 : this.state.A1;
    let isA2Checked = checkBoxId === 'A2' ? !this.state.A2 : this.state.A2;
    this.setState({
      A1: isA1Checked,
      A2: isA2Checked
    });
    this.props.actions.stepOne({
      A1: isA1Checked,
      A2: isA2Checked
    });
  }

  renderStepOne() {
    return (
      <div className="step1">
        <h3>Step one</h3>
        <input type="checkbox" id="A1" value={this.state.A1} onChange={this.onCheckBoxesClicked.bind(this)} />
        <label> A1</label>
        <br/>
        <input type="checkbox" id="A2" value={this.state.A2} onChange={this.onCheckBoxesClicked.bind(this)} />
        <label>A2</label>
      </div>
    );
  }

  /*
    Step 2
   */

  onStepTwoButtonsClicked(event) {
    let buttonId = event.target.id;
    let b2Selected = buttonId === 'B2' ? true : false;
    let b1Selected = buttonId === 'B1' ? true : false;
    this.setState({
      B2: b2Selected,
      B1: b1Selected
    });
    this.props.actions.stepTwo({
      B2: b2Selected,
      B1: b1Selected
    });
  }

  renderStepTwo() {
    let b1ClassNames = classnames({
      'button-step-two': true,
      'active':  this.state.B1 === true
    });

    let b2ClassNames = classnames({
      'button-step-two': true,
      'active': this.state.B2 === true
    });

    return (
      <div className="step2">
        <h3>Step two</h3>
        <div className={b1ClassNames} id="B1" onClick={this.onStepTwoButtonsClicked.bind(this)}>
          B1
        </div>
        <div className={b2ClassNames} id="B2" onClick={this.onStepTwoButtonsClicked.bind(this)}>
          B2
        </div>
      </div>
    );
  }

  /*
    Step 3
   */

  handleStep3Change(event) {
    this.setState({step3Text: event.target.value});
  }

  checkStepThree() {
    this.props.actions.stepThree({
      value: this.state.step3Text
    });
  }

  renderStepThree() {
    let checkButtonClasses = classnames({
      'button-step-two': true,
      'active':  this.state.checkTextStatus !== PENDING
    });
    return (
      <div className="step3">
        <h3>Step three</h3>
        <input type="text" value={this.state.step3Text} onChange={this.handleStep3Change.bind(this)} />
        <div className={checkButtonClasses} onClick={this.checkStepThree.bind(this)}>
          Check
        </div>
        {this.state.checkTextStatus === FAILED ? this.renderErrorText(this.state.checkTextError) : ''}
      </div>
    );
  }

  /*
    Step 4
   */

  onSelectChange(event) {
    let option = event.target.value;
    this.setState({selectedOption: option});
    this.props.actions.stepFour({
      value: option
    });
  }

  renderOptions(options) {
    return (
      options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })
    );
  }

  renderStepFour() {
    return (
      <div className="step4">
        <h3>Step four</h3>
        <select onChange={this.onSelectChange.bind(this)}>
          {
            this.renderOptions(options)
          }
        </select>
      </div>
    );
  }

  /*
    Final step
   */

  renderSubmit() {
    let disabled = this.state.formSubmissionStatus === PENDING;
    let showErorr = this.state.formSubmissionStatus === FAILED;
    if(disabled){
      return (
        <input type="submit" value="Submit" disabled/>
      );
    }
    return (
      <div>
        {showErorr ? this.renderErrorText(this.state.formSubmissionError) : ''}
        <input type="submit" value="Submit" />
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.stepFive();
  }

  /*
    Render the steps
   */
  render() {
    let stepOneJSX = this.state.currentStep  >= 1 ? this.renderStepOne() : '';
    let stepTwoJSX = this.state.currentStep  >= 2 ? this.renderStepTwo() : '';
    let stepThreeJSX = this.state.currentStep  >= 3 ? this.renderStepThree() : '';
    let stepFourJSX = this.state.currentStep  >= 4 ? this.renderStepFour() : '';
    let formButtonJSX = this.state.currentStep >= 5 ? this.renderSubmit() : '';
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          {stepOneJSX}
          <br/>
          {stepTwoJSX}
          <br/>
          {stepThreeJSX}
          <br/>
          {stepFourJSX}
          <br/>
          {formButtonJSX}
        </div>
      </form>
    );
  }
}
