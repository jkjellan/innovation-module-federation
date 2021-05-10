import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { offersApplicableStatuses } from "../../utils/Constants";
import TierOneGuidanceCard from "../../containers/TierOneGuidanceCardContainer";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = theme => ({
	pinBottom: {
		width: "100%",
		position: "center",
		background: "white",
		position: "fixed",
		bottom: "-1%",
		borderTop: "1px solid" + theme.palette.border.light,
		paddingBottom: 24,
		zIndex: 10
	},
	button: {
		width: "100%",
		fontSize: "1rem",	
		paddingLeft: 16,
		paddingRight: 16,
		marginBottom: -4
	},
	secondButton: {
		width: "100%",
		fontSize: "1rem",	
		paddingLeft: 16,
		paddingRight: 16,
		marginTop: 16,
		marginBottom: -4
	},
	buttonWrapper: {
		paddingTop: 16,
		paddingLeft: 16,
		paddingRight: 16
	},
	applicableStatus: {
		fontFamily: "Roboto",
		padding: 16,
		color: theme.palette.primary.main,
	}
});

class OffersApplicable extends Component {

	handleChange = status => {	
		this.props.setOffersApplicableStatus(status);
		this.props.collapseCards();

		if (status !== offersApplicableStatuses.APPLICABLE) {
			parent.postMessage({action: "badge", applet: "sellTools", value: null}, "*");
		}
	};

	render() {	
		const { classes, offersApplicableStatus, tierOneGuidanceOpportunities } = this.props;

		return (
			<div>
				{ offersApplicableStatus === offersApplicableStatuses.CALL_NOT_APPLICABLE ?
					tierOneGuidanceOpportunities.length ?
						<TierOneGuidanceCard/>
						:
						<Typography id="call-not-applicable-message" className={classes.applicableStatus} variant="body1">
							Offers not applicable to this call
						</Typography>
					:
					this.props.offersApplicableStatus === offersApplicableStatuses.UPSELLS_NOT_APPLICABLE ?
						<Typography id="upsells-not-applicable-message" className={classes.applicableStatus} variant="body1">
							These upsells don't apply to the policy customer is calling about
						</Typography>
					:
						null
				}

				<div className={classes.pinBottom}>
					<div className={classes.buttonWrapper}>
						{(offersApplicableStatus === offersApplicableStatuses.CALL_NOT_APPLICABLE) ||
							offersApplicableStatus === offersApplicableStatuses.UPSELLS_NOT_APPLICABLE ?
							<Button id="show-offers-button" onClick={() => this.handleChange(offersApplicableStatuses.APPLICABLE)} className={classes.button} variant="outlined" color="primary" size="small">
								Show offers
							</Button>
						:
							<div>
								<Button id="call-not-applicable-button" onClick={() => this.handleChange(offersApplicableStatuses.CALL_NOT_APPLICABLE)} className={classes.button} variant="outlined" color="primary" size="small">
									Call not applicable
								</Button>
							</div>
						}
					</div>
				</div>	
			</div>				
		);
	}
}

export default withStyles(styles)(OffersApplicable);
