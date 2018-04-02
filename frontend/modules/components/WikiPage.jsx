import React, { Component } from 'react';
import Iframe from '../components/Iframe';
import API from '../endpoints/api';

export default class WikiPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible } = this.props;

    // console.log('WikiPage', isVisible)

    const className = "iframe container-fuild" + (isVisible ? '' : ' hide');
    return (
      <div className={className}>
        <Iframe url={API.WIKI} frameborder="0" id="wiki"/>
      </div>
    )
  }
}