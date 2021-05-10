import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import AgencyRemarks from '../components/AgencyRemarks/AgencyRemarks';

function mapStateToProps(state) {
  return {
    agencyInfo: state.offers.agencyInfo,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AgencyRemarks);