import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import OpportunityDisposition from '../components/OpportunityDisposition/OpportunityDisposition'

// Actions
import {
  dispositionOffer
} from '../actions/offersActions';

function mapStateToProps(state) {
  return {
    dispositionSaved: state.offers.dispositionSaved,
  };
}

const mapDispatchToProps = dispatch => ({
  dispositionOffer: bindActionCreators(dispositionOffer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDisposition);
