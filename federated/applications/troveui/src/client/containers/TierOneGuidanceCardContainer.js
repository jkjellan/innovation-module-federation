import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import TierOneGuidanceCard from '../components/TierOneGuidanceCard/TierOneGuidanceCard';

// Actions
import { setOffersApplicableStatus } from '../actions/offersActions';

function mapStateToProps(state) {
  return {
	  tierOneGuidanceOpportunities: state.offers.tierOneGuidanceOpportunities,
  };
}

const mapDispatchToProps = dispatch => ({
  setOffersApplicableStatus: bindActionCreators(setOffersApplicableStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TierOneGuidanceCard);
