import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFoundView extends Component {
  render() {
    return (
      <div className="container notFound-page">
        <div className="row">
          <div className="col-xs-12">
            <img src="/assets/images/iCenter-logo.png" className="img-responsive center-block logo mrt30"/>
            <h1 className="text-center">Page not found!</h1>
          </div>
          <div className="col-xs-12 col-sm-4 col-sm-offset-4 text-center">
            <br/>
            <Link to="/" className="btn btn-warning"> GO BACK TO HOMEPAGE </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundView
