import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import OffersApplicable from '../components/OffersApplicable/OffersApplicable'

// Actions
import {
  setOffersApplicableStatus,
} from '../actions/offersActions';

import {
  collapseCards,
} from '../actions/appActions';

function mapStateToProps(state) {
  return {
    offersApplicableStatus: state.offers.offersApplicableStatus,
	  tierOneGuidanceOpportunities: state.offers.tierOneGuidanceOpportunities,
  };
}

const mapDispatchToProps = dispatch => ({
  setOffersApplicableStatus: bindActionCreators(setOffersApplicableStatus, dispatch),
  collapseCards: () => dispatch(collapseCards),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersApplicable);
