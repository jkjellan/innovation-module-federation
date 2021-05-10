import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { List, ListItem, Notification  } from "@lmig/lmds-react";
import { offersApplicableStatuses } from '../../utils/Constants';

const styles = theme => ({
	card: {
		padding: "16px 16px 0px 16px"
	},
    list: {
        margin: "0px 0px 0px -26px",
	  	paddingBottom: 16
    },
	singleOpportunity: {
		paddingBottom: 16
	}
});

class TierOneGuidanceCard extends Component {
	handleChange = () => {
	  this.props.setOffersApplicableStatus(offersApplicableStatuses.APPLICABLE);
	};

	render() {
		const { classes, tierOneGuidanceOpportunities } = this.props;

		return (
		  <div id="card-tier-one-guidance" className={classes.card}>
			<Notification highlightType="caution"
							alert="We don't think offers apply here">
				{tierOneGuidanceOpportunities.length > 1 ?
				<List id="tier-one-opportunity-list" compact className={classes.list}>
					{Object.values(tierOneGuidanceOpportunities).map((opportunity, index) => (
					<ListItem id={"opportunity-text-" + opportunity.name} key={index}>
						<Typography variant="body2" style={{paddingTop: 2}}>
						{opportunity.longMessage}
						</Typography>
					</ListItem>
					))}
				</List>
				:
				<Typography id="opportunity-text" variant="body2" className={classes.singleOpportunity}>
					{tierOneGuidanceOpportunities[0].longMessage}
				</Typography>

				}
				<Typography variant="body2">To view offers, select&nbsp;
				<a onClick={() => this.handleChange()} href="#"
					id="link-show-offers">show offers</a>
				</Typography>
			</Notification>
		</div>
		);
	}
}

export default withStyles(styles)(TierOneGuidanceCard);
