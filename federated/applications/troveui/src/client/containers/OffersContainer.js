import { connect } from 'react-redux';

// Components
import Offers from '../components/Offers/Offers';


function mapStateToProps(state) {
  return {
    offers: state.offers.offers,
    activeOfferType: state.offers.activeOfferType,
    offersApplicableStatus: state.offers.offersApplicableStatus,
    error: state.error.error,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
