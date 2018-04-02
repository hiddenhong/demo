import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actionCreator from 'actions/';
import * as ActionType from 'actions/';
import API from 'endpoints/api';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

describe('Action::Register', function() {
  describe('#registerRequest()', function() {
    it('return action `REGISTER_REQUEST` info', function() {
      let action = actionCreator.registerRequest;
      expect(action()).to.deep.equal({
        type: ActionType.REGISTER_REQUEST
      })
    })
  })

  describe('#registerSuccess()', function() {
    it('return action `REGISTER_SUCCESS` info', function() {
      let action = actionCreator.registerSuccess
      expect(action()).to.deep.equal({
        type: ActionType.REGISTER_SUCCESS
      })
    })
  })

  describe('#registerFailure()', function() {
    it('return action `REGISTER_FAILURE` info', function() {
      let action = actionCreator.registerFailure;
      expect(action('message')).to.deep.equal({
        type: ActionType.REGISTER_FAILURE,
        message: 'message'
      })
    })
  })

  /* describe('#register()', function() {
    afterEach(function() {
      nock.cleanAll()
    })

    const fileds = {
      username: 'anonymousio',
      name: 'anonymous',
      email: 'anonymousio@example.org',
      password: 'password'
    }

    it('should call request and success actions if the register response was successful', function() {
      nock(API.ROOT_URL)
        .log(console.log)
        .post(API.REGISTER, fileds)
        .reply(201, {
          username: fileds.username,
          name: fileds.name,
          email: fileds.email,
          id: '1'
        })

      const initialState = {
        isAuthenticating: false,
        isAuthenticated: false,
        isRegistering: false,
        username: '',
      }

      const expectedActions = [
        { type: ActionType.REGISTER_REQUEST },
        { type: ActionType.REGISTER_SUCCESS },
        { type: ActionType.IN_ROUTING, isInRouting: true },
        // { type: ActionType.REGISTER_FAILURE, message: undefined }
      ]

      const store = mockStore(initialState)

      return store.dispatch(actionCreator.register(fileds))
        .then(() => {
          console.log(store.getActions(), store.getActions().length, store.getState())
          // expect(store.getActions().length).equal(3)
          expect(store.getActions()).to.deep.equal(expectedActions)
          // done()
        });
    })
  })*/
}) // Action::Register end


describe('Action::Login', function() {
  describe('#loginRequest()', function() {
    it('returns action `LOGIN_REQUEST` info', function() {
      let action = actionCreator.loginRequest;
      expect(action('anonymous')).to.deep.equal({
        type: ActionType.LOGIN_REQUEST,
        username: 'anonymous'
      })
    })
  })

  describe('#loginSuccess()', function() {
    it('returns action `LOGIN_SUCCESS` info', function() {
      let action = actionCreator.loginSuccess;
      expect(action('anonymous')).to.deep.equal({
        type: ActionType.LOGIN_SUCCESS,
        username: 'anonymous'
      })
    })
  })

  describe('#loginFailure()', function() {
    it('returns action `LOGIN_FAILURE` info', function() {
      let action = actionCreator.loginFailure;
      expect(action('username or password is invalid')).to.deep.equal({
        type: ActionType.LOGIN_FAILURE,
        message: 'username or password is invalid'
      })
    })
  })

  /* describe('#login()', function() {
    afterEach(function() {
      nock.cleanAll()
    })

    it('should login success', function() {
      const username = 'anonymous'
      const password = 'password'
      nock(API.ROOT_URL)
        .post(API.LOGIN)
        .reply(200, {
          token: 'test token'
        })

      const expectedActions = [
        { type: ActionType.LOGIN_REQUEST, username},
        { type: ActionType.LOGIN_SUCCESS, username}
      ]

      const store = mockStore()

      return store.dispatch(actionCreator.login(username, password))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })*/
})


describe('Action::Logout', function() {
  describe('#logoutUser()', function() {
    it('return action `LOGOUT_USER` info', function() {
      let action = actionCreator.logoutUser;
      expect(action()).to.deep.equal({
        type: ActionType.LOGOUT_USER
      });
    })
  })
})


describe('Action::UPDATE_USER', function(){
  describe('#updateUserRequest()', function() {
    it('return action `UPDATE_USER_REQUEST` info', function() {
      let action = actionCreator.updateUserRequest
      expect(action()).to.deep.equal({
        type: ActionType.UPDATE_USER_REQUEST
      })
    })
  })


  describe('#updateUserSuccess()', function() {
    it('return action `UPDATE_USER_SUCCESS` info', function() {
      let action = actionCreator.updateUserSuccess
      expect(action()).to.deep.equal({
        type: ActionType.UPDATE_USER_SUCCESS
      })
    })
  })


  describe('#updateUserFailure()', function() {
    it('return action `UPDATE_USER_FAILURE` info', function() {
      let action = actionCreator.updateUserFailure;
      expect(action()).to.deep.equal({
        type: ActionType.UPDATE_USER_FAILURE
      })
    })
  })
})
















