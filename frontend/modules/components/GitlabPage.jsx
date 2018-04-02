import React, { Component } from 'react';
import Iframe from '../components/Iframe';
import API from '../endpoints/api';

export default class GitlabPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible } = this.props;
    // console.log('GitlabPage', isVisible);
    const className = "iframe container-fuild" + (isVisible ? '' : ' hide');
    return (
      <div className={className}>
        <Iframe url={API.GITLAB} frameborder="0" />
      </div>
    )
  }
}