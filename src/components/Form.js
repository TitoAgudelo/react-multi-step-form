import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';
import { PENDING, FAILED } from './../constants/';
import './../styles/form.css';

const options = ['C1', 'C2', 'C3'];

export default class StepForm extends React.Component {

  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object,
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
      selectedOption: options[0],
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

  /* Step one */
  onCheckBoxesClicked(event) {
    let checkBoxId = event.target.id;
    let isA1Checked = checkBoxId === 'A1' ? !this.state.A1 : this.state.A1;
    let isA2Checked = checkBoxId === 'A2' ? !this.state.A2 : this.state.A2;
    this.setState({
      A1: isA1Checked,
      A2: isA2Checked,
    });
    this.props.actions.stepOne({
      A1: isA1Checked,
      A2: isA2Checked,
    });
  }

  renderStepOne() {
    return (
      <div className="step1">
        <h3 className="step-title">Step one</h3>
        <p className="step-legend">Next step is available after at least one of them is checked</p>
        <input type="checkbox" id="A1" value={this.state.A1} onChange={this.onCheckBoxesClicked.bind(this)} />
        <label>A1</label>
        <br/>
        <input type="checkbox" id="A2" value={this.state.A2} onChange={this.onCheckBoxesClicked.bind(this)} />
        <label>A2</label>
      </div>
    );
  }

  /* Step two */
  onStepTwoButtonsClicked(event) {
    let buttonId = event.target.id;
    let b2Selected = buttonId === 'B2' ? true : false;
    let b1Selected = buttonId === 'B1' ? true : false;
    this.setState({
      B2: b2Selected,
      B1: b1Selected,
    });
    this.props.actions.stepTwo({
      B2: b2Selected,
      B1: b1Selected,
    });
  }

  renderStepTwo() {
    let b1ClassNames = classnames({
      'button-step-two': true,
      'active':  this.state.B1 === true,
    });

    let b2ClassNames = classnames({
      'button-step-two': true,
      'active': this.state.B2 === true,
    });

    return (
      <div className="step2">
        <h3 className="step-title">Step two</h3>
        <p className="step-legend">Next step is available after at least one of them is checked</p>
        <label className={b1ClassNames}>
          <input type="radio" name="options" id="B1" onClick={this.onStepTwoButtonsClicked.bind(this)} /> B1
        </label>
        <label className={b2ClassNames}>
          <input type="radio" name="options" id="B2" onClick={this.onStepTwoButtonsClicked.bind(this)} /> B2
        </label>
      </div>
    );
  }

  /* Step three */
  handleStep3Change(event) {
    this.setState({step3Text: event.target.value});
  }

  checkStepThree() {
    this.props.actions.stepThree({
      value: this.state.step3Text,
    });
  }

  renderStepThree() {
    let checkButtonClasses = classnames({
      'button-step-three': true,
      'active':  this.state.checkTextStatus !== PENDING,
    });
    return (
      <div className="step3">
        <h3 className="step-title">Step three</h3>
        <p className="step-legend">Next step is available if a response from API is fine. <br/> Value should start with `@`.</p>
        <div className="step-content">
          <input placeholder="Insert value" type="text" value={this.state.step3Text} onChange={this.handleStep3Change.bind(this)} />
          <span className={checkButtonClasses} onClick={this.checkStepThree.bind(this)}>
            Check
          </span>
        </div>
        {this.state.checkTextStatus === FAILED ? this.renderErrorText(this.state.checkTextError) : ''}
      </div>
    );
  }

  /* Step four */
  onSelectChange(event) {
    let option = event.target.value;
    this.setState({selectedOption: option});
    this.props.actions.stepFour({
      value: option,
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
        <h3 className="step-title">Step four</h3>
        <p className="step-legend">Next step is available when any option has been chosen.</p>
        <select onChange={this.onSelectChange.bind(this)}>
          {
            this.renderOptions(options)
          }
        </select>
      </div>
    );
  }

  /* Last step */
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
        <input className="step-submit" type="submit" value="Submit" />
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.stepFive();
  }

  /* Stepline */
  renderStepline() {
    let currentStep = this.state.currentStep;
    return (
      <div className="stepline">
        <div className={"line " + (currentStep >= 1 ? 'active' : '')}>step one</div>
        <div className={"line " + (currentStep >= 2 ? 'active' : '')}>step two</div>
        <div className={"line " + (currentStep >= 3 ? 'active' : '')}>step three</div>
        <div className={"line " + (currentStep >= 4 ? 'active' : '')}>step four</div>
        <div className={"line " + (currentStep >= 5 ? 'active' : '')}>submit</div>
      </div>
    );
  }

  /* Render the steps */
  render() {
    let stepOne = this.state.currentStep  === 1 ? this.renderStepOne() : '';
    let stepTwo = this.state.currentStep  === 2 ? this.renderStepTwo() : '';
    let stepThree = this.state.currentStep  === 3 ? this.renderStepThree() : '';
    let stepFour = this.state.currentStep  === 4 ? this.renderStepFour() : '';
    let formButton = this.state.currentStep === 5 ? this.renderSubmit() : '';
    let stepLine = this.renderStepline();
    return (
      <div className="container">
        <h1 className="title">Multistep React & Redux</h1>
        { stepLine }
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
          <div>
            { stepOne }
            { stepTwo }
            { stepThree }
            { stepFour }
            { formButton }
          </div>
        </form>
      </div>
    );
  }
}
