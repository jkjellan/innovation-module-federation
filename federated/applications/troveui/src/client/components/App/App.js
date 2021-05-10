import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Offers from "../../containers/OffersContainer";
import SimpleAppBar from "../../containers/AppBarContainer";
import { offersApplicableStatuses } from '../../utils/Constants';
import { CircularProgress } from "@material-ui/core";


const styles = theme => ({
	screen: {
		// height: '100%',
		backgroundColor: theme.palette.background.default,
	},
	wrapper: {
		marginTop: 104,
		marginBottom: 68,
		paddingBottom: 16,
		textAlign: "left",

	},
	wrapperNoTabs: {
		marginTop: 56,
		marginBottom: 68,
		paddingBottom: 16,
		textAlign: "left",
	},
	loadingSpinner: {
		paddingTop: 16,
		textAlign: "center",
	},
});

class App extends Component {
	componentDidMount() {
		this.props.initialize();
	};

	render() {
		const { classes, error, isLoading, offersApplicableStatus } = this.props;

		return (
			<div className={classes.screen}>
				<SimpleAppBar />
				<div className={offersApplicableStatus === offersApplicableStatuses.APPLICABLE && !error.type ? classes.wrapper : classes.wrapperNoTabs}>
					{isLoading ? 
						<div className={classes.loadingSpinner}><CircularProgress/></div> 
						: 
						<Offers/>
					}
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(App);
