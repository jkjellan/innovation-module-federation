import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import DispositionOptions from '../components/DispositionOptions/DispositionOptions'

// Actions
import {
  dispositionOffer,
  expandCard
} from '../actions/offersActions';

function mapStateToProps(state) {
  return {
    offers: state.offers.offers,
    user: state.app.user,
    params: state.app.params,
    activeOfferType: state.offers.activeOfferType,
    brand: state.app.brand,
  };
}

const mapDispatchToProps = dispatch => ({
  dispositionOffer: bindActionCreators(dispositionOffer, dispatch),
  expandCard: bindActionCreators(expandCard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DispositionOptions);
