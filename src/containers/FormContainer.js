import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import * as FormActions from './../actions'
import Form from './../components/Form'

class FormContainer extends React.Component {
  static propTypes = {
    form: PropTypes.object,
    actions: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      form: props.form
    }
  }

  componentWillReceiveProps(nextProps) {
    let { form } = nextProps
    this.setState({
      form: form
    })
  }

  render() {
    let { form } = this.state
    let { actions } = this.props
    return (
      <Form form={form} actions={actions} />
    )
  }
}

const mapStateToProps = state => ({
  form: state.form
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    FormActions,
    dispatch
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)

