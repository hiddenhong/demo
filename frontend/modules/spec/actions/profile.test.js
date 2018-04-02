import * as actionCreator from 'actions/profile';
import * as ActionType from 'actions/profile';

describe('Action::FETCH_PROFILE', function() {
  describe('#fetchProfileRequest()', function() {
    it('return action `FETCH_PROFILE_REQUEST` info', function() {
      let action = actionCreator.fetchProfileRequest
      expect(action()).to.deep.equal({
        type: ActionType.FETCH_PROFILE_REQUEST
      })
    })
  })

  describe('#fetchProfileSuccess()', function() {
    it('return action `FETCH_PROFILE_SUCCESS` info', function() {
      let action = actionCreator.fetchProfileSuccess
      const profile = {
        username: 'anonymous',
        name: 'anonymous',
        email: 'anonymous@example.org'
      }
      const expectedAction = {
        type: ActionType.FETCH_PROFILE_SUCCESS,
        ...profile
      }
      expect(action(profile)).to.deep.equal(expectedAction)
    })
  })

  describe('#fetchProfileFailure()', function() {
    it('return action `FETCH_PROFILE_FAILURE` info', function() {
      let action = actionCreator.fetchProfileFailure;
      const message = 'There\'re something wrong';
      const expectedAction = {
        type: ActionType.FETCH_PROFILE_FAILURE,
        message
      }
      expect(action(message)).to.deep.equal(expectedAction);
    })
  })
})