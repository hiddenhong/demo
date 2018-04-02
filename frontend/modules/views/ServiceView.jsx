import React, { Component } from 'react';
import WikiPage from '../components/WikiPage';
import GitlabPage from '../components/GitlabPage';
import Footer from '../components/Footer';

export default class ServiceView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedService, isInRouting, isVisible } = this.props;
    // console.log('ServiceView line 15', isInRouting, selectedService, selectedService === 'wiki' && !isInRouting);
    const className = "service-page" + (isVisible ? '' : ' hide');
    return (
      <div className={className} >
        <WikiPage isVisible={selectedService === 'wiki' && !isInRouting}/>
        <GitlabPage isVisible={selectedService === 'gitlab'}/>
        {/* <QodlabPage isVisible={selectedService === 'qodlab'}/>*/}
        <Footer />
      </div>
    )
  }
}