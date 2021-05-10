import { connect } from 'react-redux';

// Components
import IneligibleOffersCard from '../components/IneligibleOffersCard/IneligibleOffersCard'

function mapStateToProps(state) {
  return {
    offersApplicableStatus: state.offers.offersApplicableStatus,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(IneligibleOffersCard);
