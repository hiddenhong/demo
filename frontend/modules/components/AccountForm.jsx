import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { checkPassStrength } from '../helpers';

const validate = values => {
  const requiredFieldText = 'This field is required!'

  const errors = {}
  if (!values.current_password){
    errors.current_password = requiredFieldText
  }

  if (!values.new_password){
    errors.new_password = requiredFieldText
  } else {
    if (values.new_password && values.new_password.length < 6){
      errors.new_password = 'Password must be at least 6 characters long.'
    }
    if (!values.new_password_confirmation){
      errors.new_password_confirmation = requiredFieldText
    } else if (values.new_password !== values.new_password_confirmation){
      errors.new_password_confirmation = 'The new passwords do not match!'
    }
  }

  if (values.current_password && values.new_password){
    if (values.current_password === values.new_password){
      errors.new_password = 'The new password cannot be the same as the current password!'
    }
  }

  return errors
}


const renderField = ({ input, label, type, fontIcon, meta: {touched, error} }) => (
  <div className="input-wrapper">
    <div className="input-group">
      <span className="input-group-addon"><i className={`fa fa-fw ${fontIcon}`} aria-hidden="true" /></span>
      <input {...input}  type="password" placeholder={label} type={type} className="form-control"/>
      { (input.name === 'new_password') &&
        <span className={`form-control-feedback label warning pdr5 ${checkPassStrength(input.value)}`} aria-hidden="true">{checkPassStrength(input.value)}</span>
      }
    </div>
    <p className={`form-error text-danger ${touched && error ? "" : "hide"}`}>{error}</p>
  </div>
)

const AccountForm = (props) => {
  const { pristine, handleSubmit, submitting, isSubmitting } = props
  // console.log('_AccountForm.jsx', submitting, isSubmitting)
  return (
    <div className="change-password-form">
      <form>
        <Field name="current_password" type="password" component={renderField} label="Current Password" fontIcon="fa-unlock" />
        <Field name="new_password" type="password" component={renderField} label="New Password" fontIcon="fa-key" />
        <Field name="new_password_confirmation" type="password" component={renderField} label="Confirm Password" fontIcon="fa-key" />
        { !isSubmitting ?
          <button type="submit" disabled={pristine || submitting} className="btn btn-primary btn-block margin-top-sm" onClick={handleSubmit}>Submit</button> :
          <button className="btn btn-primary btn-block margin-bottom-sm" disabled>
            <i className="fa fa-spinner fa-spin fa-fw" />
            <span className="sr-only">Loading...</span>
          </button>
        }
      </form>
    </div>
  )
}

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'account',
  validate
})(AccountForm)