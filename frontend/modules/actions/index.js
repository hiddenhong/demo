import * as authActions from './auth';
import * as profileActions from './profile';
import * as serviceActions from './service';
import * as inRoutingActions from './inRouting';
import * as statusActions from './status';

const LABELMESSAGES = {
  "SERVER_404_MESSAGE":   "The server is currently undergoing maintainence. Try again later!",
  "INVALID_CREDENTIALS":  "Invalid password or username!",
  "EMAIL_ALREADY_EXISTS": "The email address already exists!",
  "SESSION_EXPIRED":      "Your session has expired. Log in again!",
  "ACTIVATION_ERROR":     "There was an error activating your account. Please try again later!",
  "UPDATE_USER_ERROR":    "Your previous password was invalid."
}

module.exports = {
  ...authActions,
  ...profileActions,
  ...serviceActions,
  ...inRoutingActions,
  ...statusActions,
  ...LABELMESSAGES
}