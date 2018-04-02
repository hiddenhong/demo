import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkTokenExpiry } from '../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/login');
      } else {
        this.props.checkTokenExpiry()
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/login');
      } else {
        this.props.checkTokenExpiry()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.isAuthenticated };
  }

  function mapDispatchToProps(dispatch) {
    return {
      checkTokenExpiry: () => {
        dispatch(checkTokenExpiry())
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}