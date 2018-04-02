import * as ActionType from 'actions';
import profileReducer from 'reducers/profile';

describe('Reducer::profileReducer', function() {
  describe('handle ACTION_TYPE', function() {
    let initialState = {}

    before(function() {
      initialState = JSON.parse(localStorage.getItem('proqod_profile') || '{}' )
    })

    describe('handle UNKNOWN', function() {
      it('should return the initial state', function() {
        const action = { type: 'UNKNOWN' }
        const newState = profileReducer(initialState, action)

        expect(newState).to.deep.equal(initialState)
      })
    })

    describe('handle FETCH_PROFILE_REQUEST', function() {
      it('should merge `fetching status` to state.', function() {
        const action = { type: ActionType.FETCH_PROFILE_REQUEST }
        const newState = profileReducer(initialState, action)

        expect(newState).to.deep.equal({
          ...initialState,
          isFetching: true,
          isFetched: false,
          errorMessage: ''
        })
      })
    })

    describe('handle FETCH_PROFILE_SUCCESS', function() {
      it('should merge `profile` to state', function() {
        const response = {
          username: 'anonymous',
          name: 'anonymous',
          email: 'anonymous@example.org'
        };
        const action = { type: ActionType.FETCH_PROFILE_SUCCESS, ...response }
        const newState = profileReducer(initialState, action);

        expect(newState).to.deep.equal({
          ...initialState,
          ...response,
          isFetching: false,
          isFetched: true,
          errorMessage: ''
        })
      })
    })

    describe('handle FETCH_PROFILE_FAILURE', function() {
      it('should merge `fetch failure status` to state', function() {
        const err = 'There\'re something wrong.'
        const action = { type: ActionType.FETCH_PROFILE_FAILURE,  err }
        const newState = profileReducer(initialState, action)

        expect(newState).to.deep.equal({
          ...initialState,
          isFetching: false,
          isFetched: false,
          errorMessage: err
        })
      })
    })

  })
}) // Reducer::profileReducer