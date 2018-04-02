import React, { Component } from 'react';
import Iframe from '../components/Iframe';
import API from '../endpoints/api';

export default class QodlabPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible } = this.props;
    // console.log('QodlabPage', isVisible);
    const className = "iframe container-fuild" + (isVisible ? '' : ' hide');
    return (
      <div className={className} style={{marginTop: '-44px'}}>
        <Iframe url={API.QODLAB} frameborder="0"/>
      </div>
    )
  }
}