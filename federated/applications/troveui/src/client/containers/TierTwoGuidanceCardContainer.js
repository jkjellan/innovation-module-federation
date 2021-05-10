import { connect } from 'react-redux';

// Components
import TierTwoGuidanceCard from '../components/TierTwoGuidanceCard/TierTwoGuidanceCard';

function mapStateToProps(state) {
  return {
	  tierTwoGuidanceOpportunities: state.offers.tierTwoGuidanceOpportunities,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TierTwoGuidanceCard);
