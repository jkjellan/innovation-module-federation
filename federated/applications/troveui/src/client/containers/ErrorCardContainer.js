import { connect } from 'react-redux';

// Components
import ErrorCard from '../components/ErrorCard/ErrorCard';

function mapStateToProps(state) {
  return {
    error: state.error.error,
    offersApplicableStatus: state.offers.offersApplicableStatus,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorCard);
