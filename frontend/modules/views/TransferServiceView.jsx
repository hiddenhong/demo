import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectService, inRouting, checkTokenExpiry } from '../actions';

class TransferServiceView extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  // only once in client and server, immediately before the initial rendering occurs.
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.checkTokenExpiry()
    }
    this.selectService(this.props);
  }

  shouldComponentUpdate() {
    return true;
  }

  // Invoked immediately before rendering when new props or state are being received.
  // This method is not called for the initial render.
  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.props.checkTokenExpiry()
    }
    this.selectService(nextProps);
  }

  selectService(props) {
    const { params, handleSelectService } = props;
    const services = ['wiki', 'gitlab'];
    const service = params.service.toLowerCase()

    if (services.indexOf(service) >= 0) {
      handleSelectService(service);
    } else {
      this.context.router.replace('/404')
    }
  }

  render() {
    const { params } = this.props;
    return (
      <div className="hide">{params.service} Service.
        {this.props.children}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.auth.isAuthenticated,
  selectedService: state.selectedService
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleSelectService: (service) => {
      dispatch(selectService(service));
      dispatch(inRouting(false));
    },
    checkTokenExpiry: () => {
      dispatch(checkTokenExpiry());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferServiceView);