import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from '../components/AccountForm';
import Footer from '../components/Footer';

import { updateUser } from '../actions';

class EditAccountView extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updationSuccess) {
      this.context.router.push('/account/me')
    }
  }

  handleSubmit(data) {
    this.props.updateUser(data);
  }

  render() {
    return (
      <div className="container change-password-page">
        <AccountForm onSubmit={this.handleSubmit.bind(this)} isSubmitting={this.props.submitting}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    updationSuccess: !state.auth.isAuthenticating && state.status.isSuccess && state.status.status === 204,
    submitting: state.auth.isAuthenticating
  }
}
const mapDispathToProps = (dispatch) => ({
  updateUser: (data) => {
    dispatch(updateUser(data))
  }
})

export default connect(mapStateToProps, mapDispathToProps)(EditAccountView)