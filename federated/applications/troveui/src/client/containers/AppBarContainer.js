import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import AppBar from '../components/AppBar/AppBar';

// Actions
import { toggleActiveOfferType } from '../actions/offersActions';
import { collapseCards } from '../actions/appActions';

function mapStateToProps(state) {
  return {
    activeOfferType: state.offers.activeOfferType,    
    offersApplicableStatus: state.offers.offersApplicableStatus,
    xsellOffersCount: state.offers.xsellOffersCount,
    upsellOffersCount: state.offers.upsellOffersCount,
    error: state.error.error,
  };
}

const mapDispatchToProps = dispatch => ({
  toggleActiveOfferType: bindActionCreators(toggleActiveOfferType, dispatch),
  collapseCards: () => dispatch(collapseCards),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
