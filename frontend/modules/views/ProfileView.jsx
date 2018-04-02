import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions';
import Footer from '../components/Footer';

class ProfileView extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { handleFetchProfile } = this.props;
    handleFetchProfile();
  }


  render() {
    const {name, username, email} = this.props;
    return(
      <div className="container me-page">
        <div className="row">
          <div className="col-xs-4 col-md-4 col-sm-4 text-right">Username:</div>
          <div className="col-xs-4 col-md-4 col-sm-4">{username}</div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-4 col-sm-4 text-right">Name:</div>
          <div className="col-xs-4 col-md-4 col-sm-4">{name}</div>
        </div>
        <div className="row">
          <div className="col-xs-4 col-md-4 col-sm-4 text-right">Email:</div>
          <div className="col-xs-4 col-md-4 col-sm-4">{email}</div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    ...profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchProfile: () => {
      // console.log('ProfileView')
      dispatch(fetchProfile());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)