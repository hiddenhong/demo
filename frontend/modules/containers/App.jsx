import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { logout, selectService, inRouting } from '../actions';
import NavBar from '../components/NavBar';
import LabelMessage from '../components/LabelMessage';
import { ServiceView } from '../views';
// import Footer from '../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedService, isInRouting } = this.props;
    const isVisible = selectedService !== "";
    return (
      <div>
        <NavBar {...this.props}/>
        <LabelMessage hasError={this.props.hasError} statusText={this.props.statusText}/>
        {/* <div className="content container-fuild">*/}
          <div className="route-serive">
            {this.props.children}
          </div>

          <ServiceView selectedService={selectedService} isInRouting={isInRouting} isVisible={isVisible} />
        {/* </div> */}
        {/* <Footer />*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth, selectedService, isInRouting } = state;
  const { isAuthenticated, username, isAuthenticating } = auth;
  return {
    isAuthenticated,
    username,
    selectedService,
    isInRouting,
    hasError: state.status.isFailure,
    statusText: state.status.statusText,
    loginSuccess: state.status.isSuccess,
    logoutSuccess: !isAuthenticated && !isAuthenticating && state.status.isSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogout: () => {
      dispatch(logout());
    },
    handleSelectService: (service) => {
      dispatch(selectService(service));
      dispatch(inRouting(false));
      browserHistory.replace('/services/' + service);
      // console.log(service);
    },
    handleClearService: () => {
      dispatch(selectService(''));
      dispatch(inRouting(true));
      // console.log('handleClearService');
    },
    handleIsInRouting: () => {
      dispatch(inRouting(true));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

