import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import API from '../endpoints/api';

export default class NavBar extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static PropTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    selectedService: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
  }

  static defaultProps = {
    isAuthenticated: false,
    handleLogout: () => {}
  }

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('logout componentWillReceiveProps', nextProps.logoutSuccess, this.props.logoutSuccess)

    if (nextProps.logoutSuccess && this.props.logoutSuccess === false) {
      this.context.router.push('/login');
      return;
    }

    if (nextProps.logoutSuccess && this.props.logoutSuccess) {
      window.location.reload()
      return;
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('active');
  }


  logout(e) {
    e.preventDefault();
    this.props.handleLogout();
  }
  render() {
    const { isAuthenticated, username, selectedService, handleSelectService, handleClearService } = this.props;

    // console.log(isAuthenticated);
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid pdr30">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>

          <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
           <ul className="nav navbar-nav">
              <li><a href={API.WORDPRESS} className="navbar-logo">WORDPRESS</a></li>

              <li><a href="#" className={selectedService === 'wiki' ? 'is-selected-service' : ''}
                onClick={ (e) => {e.preventDefault(); handleSelectService("wiki") }}>Wiki</a></li>
              <li><a href="#" className={selectedService === 'gitlab' ? 'is-selected-service' : ''}
               onClick={ (e) => {e.preventDefault(); handleSelectService("gitlab") }}>GitLab</a></li>
            </ul> {/* nav navbar-nav end */}

            { !isAuthenticated ?
              <ul className="nav navbar-nav navbar-right">
                <li onClick={handleClearService}><Link to="/login">Sign in&nbsp;&nbsp;<i className="fa fa-user" aria-hidden="true" /></Link></li>
                <li onClick={handleClearService}><Link to="/register">Sign up</Link></li>
              </ul> :
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{username}&emsp;<span className="caret" /></a>
                  <ul className="dropdown-menu">
                    <li onClick={handleClearService}><Link to="/account/me">My profile</Link></li>
                    <li onClick={handleClearService}><Link to="/account/edit">Edit Account</Link></li>

                    <li onClick={this.logout}><a href="#">Sign out</a></li>
                  </ul>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    )
  }
}
