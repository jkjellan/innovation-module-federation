import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import OpportunityCard from '../components/OpportunityCard/OpportunityCard'

// Actions
import {
  expandCard
} from '../actions/offersActions';

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = dispatch => ({
  expandCard: bindActionCreators(expandCard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCard);
