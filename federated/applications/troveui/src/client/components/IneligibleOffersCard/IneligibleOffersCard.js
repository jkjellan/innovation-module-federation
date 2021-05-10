import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { List, ListItem, Notification } from "@lmig/lmds-react";
import { getIneligibleOffers } from "../../helpers/OffersHelper";
import { offersApplicableStatuses } from "../../utils/Constants";

const styles = theme => ({
	card: {
		padding: "16px 16px 0px 16px"
	},
    list: {
        margin: "0px 0px 0px -26px"
    }
});

class IneligibleOffersCard extends Component {
	render() {
		const { classes, offersApplicableStatus } = this.props;

		const ineligibleOffers = getIneligibleOffers();

		return (
			(offersApplicableStatus === offersApplicableStatuses.APPLICABLE && ineligibleOffers.length != 0) ?	  
				<div id="card-ineligible-offers" className={classes.card}>
					<Notification highlightType="informative"
						alert="We thought you should know">
						{ineligibleOffers.length > 1 ?
							<List id="ineligible-offers-list" compact className={classes.list}>
								{Object.values(ineligibleOffers).map((offer, index) => (
									<ListItem id={"ineligible-offer-text-"+index} key={index}>
										<Typography variant="body2" style={{paddingTop: 2}}>
											{offer}
										</Typography>
									</ListItem>
								))}
							</List>
						:
							<Typography id="ineligible-offer-text" variant="body2">
								{ineligibleOffers[0]}
							</Typography>
						}
					</Notification>
				</div>
			:
				null
		);
	}
}

export default withStyles(styles)(IneligibleOffersCard);
