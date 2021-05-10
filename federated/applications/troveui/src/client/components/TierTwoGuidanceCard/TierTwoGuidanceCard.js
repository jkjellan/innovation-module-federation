import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { List, ListItem } from "@lmig/lmds-react";

const styles = theme => ({
    card: {
		padding: "16px 16px 0px 16px"
	},
	headerContainer: {
		display: "flex",
		alignItems: "center",
		padding: "16px 16px 0px 16px",
	},
	content: {
		margin: 16
	}
});

class TierTwoGuidanceCard extends Component {
	render() {
		const { classes, tierTwoGuidanceOpportunities } = this.props;

		return (
			tierTwoGuidanceOpportunities.length ?
				<div id="card-tier-two-guidance" className={classes.card}>
					<Card>
						<div className={classes.headerContainer}>
							<Typography id={"text-title-other-considerations"} variant="h6" component="h2">
							Other considerations
							</Typography>
						</div>
						<div id="text-content-other-considerations" className={classes.content}>
							{tierTwoGuidanceOpportunities.length > 1 ?
								<List>
									{tierTwoGuidanceOpportunities.map((opportunity, index) => (
									<ListItem key={index}>
										<Typography variant="body2" style={{paddingTop: 4}}>
											{opportunity.longMessage}
										</Typography>
									</ListItem>))}
								</List>
							:
								<Typography variant="body2">
									{tierTwoGuidanceOpportunities[0].longMessage}
								</Typography>
						}
						</div>
					</Card>
				</div>
			:
				null
		);
	}
}

export default withStyles(styles)(TierTwoGuidanceCard);
