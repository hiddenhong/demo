import React from 'react';
import { Component, PropTypes } from 'react';

export default class LabelMessage extends Component {
  componentWillUnmount() {
    this.props.statusText = ''
  }
  render() {
    const { hasError, statusText } = this.props;

    if (statusText !== '') {
      if (hasError) {
        return (<div className="alert label text-center">{statusText}</div>);
      }
      return (<div className="success label text-center">{statusText}</div>);
    }

    return (<div/>);
  }
}

LabelMessage.propTypes = {
  hasError: PropTypes.bool.isRequired,
  statusText: PropTypes.string.isRequired,
};