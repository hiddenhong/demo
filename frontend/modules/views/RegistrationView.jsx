import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';
import { registerUser } from '../actions';

class RegistrationView extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    if(this.props.isAuthenticated) {
      this.context.router.replace('/services/wiki')
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isAuthenticated){
      this.context.router.replace('/services/wiki')
      return;
    }

    if (nextProps.registrationSuccess) {
      this.context.router.push('/login');
      return;
    }
  }

  render() {
    return(
      <div className="container registration-page">
        <RegistrationForm onSubmit={this.props.handleSubmit.bind(this)} isSubmitting={this.props.submitting} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  registrationSuccess: state.status.isSuccess,
  submitting: state.auth.isRegistering
})

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (data) => {
    dispatch(registerUser(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationView)