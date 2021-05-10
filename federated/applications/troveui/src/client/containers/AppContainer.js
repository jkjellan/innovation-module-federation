import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import App from '../components/App/App';

// Actions

import {
  initialize,
} from '../actions/appActions'

function mapStateToProps(state) {
  return {
    error: state.error.error,
    offersApplicableStatus: state.offers.offersApplicableStatus,
    isLoading: state.app.isLoading,
  };
}

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(initialize),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
