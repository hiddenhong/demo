import React from 'react'
import { Route, IndexRedirect, Redirect } from 'react-router';
import App from '../containers/App';
import RequireAuth from '../components/RequireAuth';
import {
    RegistrationView,
    LoginView,
    ProfileView,
    EditAccountView,
    TransferServiceView,
    NotFoundView
} from '../views';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/login" />
    <Route path="register" component={RegistrationView} />
    <Route path="login" component={LoginView} />
    <Route path="account/me" component={RequireAuth(ProfileView)} />
    <Route path="account/edit" component={RequireAuth(EditAccountView)} />
    <Route path="services/:service" component={TransferServiceView} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="/404" />
  </Route>
)