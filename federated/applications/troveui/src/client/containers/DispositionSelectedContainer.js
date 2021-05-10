import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import DispositionSelected from '../components/DispositionSelected/DispositionSelected'

// Actions
import {

} from '../actions/appActions';

function mapStateToProps(state) {
  return {
    dispositions: state.offers.dispositions,
  };
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DispositionSelected);
