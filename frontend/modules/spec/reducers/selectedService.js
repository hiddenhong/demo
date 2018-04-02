import * as ActionType from 'actions';
import selectedServiceReducer from 'reducers/selectedService';

describe('Reducer::selectedServiceReducer', function() {
  describe('handle ACTION_TYPE', function() {
    let initialState = null

    before(function() {
      initialState = ''
    })

    describe('handle UNKNOWN', function() {
      it('should return the initial state', function() {
        const action = { type: 'UNKNOWN' }
        const newState = selectedServiceReducer(initialState, action)

        expect(newState).equal(initialState)
      })
    })

    describe('handle SELECT_SERVICE', function() {
      it('should setting it to given value', function() {
        const service = 'wiki'
        const action = { type: ActionType.SELECT_SERVICE, service }
        const newState = selectedServiceReducer(initialState, action)

        expect(newState).equal(service)
      })
    })
  })
}) // Reducer:selectedServiceReducer