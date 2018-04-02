import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../actions';

class LoginForm extends Component  {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentWillMount() {
    // console.log('LoginForm componentWillMount')

    if(this.props.isAuthenticated) {
      this.context.router.replace('/services/wiki')
    }

    if(this.props.logoutSuccess) {
      window.location.reload();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Refresh window after login Success.
    // console.log('componentWillReceiveProps', nextProps.logoutSuccess)
    if (nextProps.loginSuccess || nextProps.logoutSuccess) {
      window.location.reload();
      return;
    }

    if(nextProps.isAuthenticated) {
      this.context.router.replace('/services/wiki')
      return;
    }
  }

  shouldComponentUpdate(){
    // Return false when login Success.
    // Otherwise return true.
    // console.log('LoginForm shouldComponentUpdate', this.props.loginSuccess, this.props.logoutSuccess)
    if (this.props.loginSuccess || this.props.logoutSuccess) {
      return false;
    }

    return true;
  }

  handleLogin(e) {
    e.preventDefault();
    // console.log(this.username.value, this.password.value);

    const username = this.username.value.toLowerCase().trim();
    const password = this.password.value.trim();
    if ( username === '' ) {
      this.username.focus();
      return;
    }

    if ( password === '') {
      this.password.focus();
      return;
    }

    this.props.login(username, password);
  }

  render() {
    const { isAuthenticating, logoutSuccess } = this.props;
    return (
      (!logoutSuccess && <div className="account-form">
        <form>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-user fa-fw" aria-hidden="true" /></span>
            <input className="form-control" ref={ (node) => { this.username = node } }type="text" placeholder="Username" />
          </div>
          <div className="input-group margin-bottom-sm">
            <span className="input-group-addon"><i className="fa fa-key fa-fw" aria-hidden="true" /></span>
            <input className="form-control" ref={ (node) => { this.password = node } } type="password" placeholder="Password" />
          </div>

          { !isAuthenticating ?
            <button className="btn btn-primary btn-block margin-bottom-sm" onClick={this.handleLogin}>Sign in</button> :
            <button className="btn btn-primary btn-block margin-bottom-sm" disabled>
              <i className="fa fa-spinner fa-spin fa-fw" />
              <span className="sr-only">Loading...</span>
            </button>
          }
          { !isAuthenticating &&
            <div className="text-right active">
             {/* <Link to="register" className="btn-default">Sign up</Link>
             | Forgot password?*/ }
          </div>}
         {/* <button className="btn btn-primary btn-lg btn-block"></button>*/}

        </form>
      </div>)
    )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticating, isAuthenticated } = state.auth;
  return {
    isAuthenticating: isAuthenticating,
    isAuthenticated: isAuthenticated,
    loginSuccess: state.status.isSuccess,
    logoutSuccess: !isAuthenticated && !isAuthenticating && state.status.isSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(loginUser(username, password))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)