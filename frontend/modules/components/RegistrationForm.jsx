import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { checkPassStrength } from '../helpers';

const validate = values => {
  const requiredFieldText = 'This field is required!'

  const errors = {}
  if (!values.username) {
    errors.username = requiredFieldText
  }

  if (!values.name) {
    errors.name = requiredFieldText
  }

  if (!values.email) {
    errors.email = requiredFieldText
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.'
  } else {
    values.email = values.email.toLowerCase()
  }

  if (!values.password) {
    errors.password = requiredFieldText
  } else {
    if (values.password && values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.'
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = requiredFieldText
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'The passwords do not match!'
    }
  }

  return errors
}

const renderField = ({ input, label, type, disabled, meta: { touched, error} }) => (
  <div className="input-wrapper">
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input {...input} type={type} disabled={disabled} id={label} placeholder={input.name === 'email' ? 'user@example.org' : label}  className="form-control" />
      { (input.name === 'password') &&
        <span className={`form-control-feedback label warning pdr5 ${checkPassStrength(input.value)}`} aria-hidden="true">{checkPassStrength(input.value)}</span>
      }
    </div>
    <p className={`form-error text-danger ${touched && error ? '' : 'hide'}`}>{error}</p>
  </div>
)

const RegistrationForm = (props) => {
  const { pristine, handleSubmit, submitting, isSubmitting } = props

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" component={renderField} label="Username" />
        <Field name="name" type="text" component={renderField} label="Name" />
        <Field name="email" type="text" component={renderField} label="Email" />
        <Field name="password" type="password" component={renderField} label="Password" />
        <Field name="password_confirmation" type="password" component={renderField} label="Password Confirmation" />

        <div className="row">
          <div className="col-md-6">

            { !isSubmitting ?
              <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-block mrb10">Submit</button> :
              <button className="btn btn-primary btn-block margin-bottom-sm" disabled>
                <i className="fa fa-spinner fa-spin fa-fw" />
                <span className="sr-only">Registering...</span>
              </button> }
          </div>
          <div className="col-md-6">
            {
              !isSubmitting ?
              <Link className="btn btn-default btn-block active" to="/login">Cancel</Link> :
              <button className="btn btn-default btn-block active">Cancel</button>
            }
          </div>
        </div>

      </form>
    </div>
  )
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
}


export default reduxForm({
  form: 'registration',
  validate
})(RegistrationForm)

