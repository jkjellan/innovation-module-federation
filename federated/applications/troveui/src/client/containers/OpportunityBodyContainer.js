import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import OpportunityBody from '../components/OpportunityBody/OpportunityBody'

// Actions
import {
} from '../actions/offersActions';

function mapStateToProps(state) {
  return {
    activeOfferType: state.offers.activeOfferType,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityBody);
