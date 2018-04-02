import * as ActionType from 'actions';
import isInRoutingReducer  from 'reducers/isInRouting';


describe('Reducer::isInRoutingReducer', function() {
  describe('handle ACTION_TYPE', function() {
    let initialState = null

    before(function() {
      initialState = ''
    })

    describe('handle UNKNOWN', function() {
      it('shoule return the initial state', function() {
        const action = { type: 'UNKNOWN' }
        const newState = isInRoutingReducer(initialState, action)

        expect(newState).equal(initialState);
      })
    })

    describe('handle IN_ROUTING', function() {
      it('should setting it to given value', function() {
        const isInRouting = true
        const action = { type: ActionType.IN_ROUTING, isInRouting }
        const newState = isInRoutingReducer(initialState, action)

        expect(newState).equal(isInRouting)
      })
    })

  })
}) // Reducer::isInRoutingReducer end


