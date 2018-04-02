import * as actionCreator from 'actions/inRouting';
import * as ActionType from 'actions/inRouting';

describe('Action::IN_ROUTING', function() {
  describe('#inRouting()', function() {
    it('return action `IN_ROUTING` info', function() {
      let action = actionCreator.inRouting
      expect(action(false)).to.deep.equal({
        type: ActionType.IN_ROUTING,
        isInRouting: false
      })
    })
  })
})