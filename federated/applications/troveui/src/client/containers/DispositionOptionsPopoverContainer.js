import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import DispositionOptionsPopover from '../components/DispositionOptionsPopover/DispositionOptionsPopover'

// Actions
import {
  dispositionOffer,
} from '../actions/offersActions';

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = dispatch => ({
  dispositionOffer: bindActionCreators(dispositionOffer, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DispositionOptionsPopover);
