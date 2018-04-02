import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';

export default class LoginView extends Component {
  render() {
    return (
      <div className="container login-page">
        <LoginForm />
        <Footer />
      </div>
    )
  }
}