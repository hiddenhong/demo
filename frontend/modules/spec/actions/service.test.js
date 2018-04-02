import * as actionCreator from 'actions/service';
import * as ActionType from 'actions/service';

describe('Action::SELECT_SERVICE', function() {
  describe('#selectService()', function() {
    it('return action `SELECT_SERVICE` info', function() {
      let action = actionCreator.selectService
      expect(action('wiki')).to.deep.equal({
        type: ActionType.SELECT_SERVICE,
        service: 'wiki'
      })
    })
  })
})