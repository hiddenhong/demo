import * as ActionType from 'actions';
import authReducer from 'reducers/auth';

describe('Reducer::authReducer', function() {
  describe('handle ACTION_TYPE', function() {

    let initialState = {}

    before(function() {
      initialState = {
        isAuthenticating: false,
        isAuthenticated: false,
        isRegistering: false,
        username: '',
      }
    })

    describe('handle ACTION_TYPE::UNKNOWN', function() {
      it('should return the initial state', function() {
        const action = { type: 'UNKNOWN' };
        const newState = authReducer(undefined, action);

        expect(newState).to.deep.equal(initialState)
      })
    })

    describe('handle ACTION_TYPE::REGISTER', function() {
      describe('handle REGISTER_REQUEST', function() {
        it('should merge `isRegistering` to state, setting it to true', function() {
          const action = { type: ActionType.REGISTER_REQUEST }
          const newState = authReducer(initialState, action);

          expect(newState).to.deep.equal({
            ...initialState,
            isRegistering: true
          })
        })
      })

      describe('handle REGISTER_SUCCESS', function() {
        it('should merge `isRegistering` to state, setting it to false', function() {
          const action = { type: ActionType.REGISTER_SUCCESS };
          const newState = authReducer(initialState, action);

          expect(newState).to.deep.equal({
            ...initialState,
            isRegistering: false
          })
        })
      })

      describe('handle REGISTER_FAILURE', function() {
        it('should merge `isRegistering` to state, setting it to false', function() {
          const message = 'There\'re something wrong.';
          const action = { 
            type: ActionType.REGISTER_FAILURE,
            message
          };
          const newState = authReducer(initialState, action);

          expect(newState).to.deep.equal({
            ...initialState,
            isRegistering: false,
            errorMessage: message
          })
        })
      })
    }) // ACTION_TYPE::REGISTER end


    describe('handle ACTION_TYPE::LOGIN', function() {
      describe('handle LOGIN_REQUEST', function() {
        it('should merge `logining status` to state', function() {
          const action = {
            type: ActionType.LOGIN_REQUEST,
            username: 'anonymous'
          }
          const newState = authReducer(initialState, action)

          expect(newState).to.deep.equal({
            ...initialState,
            username: action.username,
            isAuthenticating: true,
            isAuthenticated: false,
            errorMessage: ''
          })
        })
      })

      describe('handle LOGIN_SUCCESS', function() {
        it('should merge `logined status` to state', function() {
          const action = {
            type: ActionType.LOGIN_SUCCESS,
            username: 'anonymous'
          }
          const newState = authReducer(initialState, action)

          expect(newState).to.deep.equal({
            ...initialState,
            username: action.username,
            isAuthenticating: false,
            isAuthenticated: true,
            errorMessage: ''
          })
        })
      })

      describe('handle LOGIN_FAILURE', function() {
        it('should merge `login failure status` to state', function() {
          const message = 'There\'re something wrong.';
          const action = {
            type: ActionType.LOGIN_FAILURE,
            message
          }
          const newState = authReducer(initialState, action)

          expect(newState).to.deep.equal({
            ...initialState,
            username: '',
            isAuthenticating: false,
            isAuthenticated: false,
            errorMessage: message
          })
        })
      })
    })// ACTION_TYPE::LOGIN end

    describe('handle ACTION_TYPE::LOGOUT', function() {
      describe('handle LOGOUT_USER', function() {
        it('should merge `logout status` to state', function() {
          const action = { type: ActionType.LOGOUT_USER }
          const newState = authReducer(initialState, action)

          expect(newState).to.deep.equal({
            ...initialState,
            username: '',
            isAuthenticating: false,
            isAuthenticated: false
          })
        })
      })
    }) // ACTION_TYPE::LOGOUT end

  })
}) // Reducer::authReducer end