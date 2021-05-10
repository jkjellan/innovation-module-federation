import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import OpportunityHeader from "../OpportunityHeader/OpportunityHeader";
import OpportunityBody from "../../containers/OpportunityBodyContainer";
import OpportunityDisposition from "../../containers/OpportunityDispositionContainer";
import { Card, Divider, IconButton } from "@material-ui/core";
import clsx from "clsx";
import IconCaretDown from "@lmig/lmds-react/icons/CaretDown";

const styles = theme => ({
	text: {
		marginTop: 250
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		marginRight: 16,
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	headerContainer: {		
		display: "flex",
		alignItems: "center",
	}
});

class OpportunityCard extends Component {
	handleExpandClick = () => {	
		const { expandCard, offer } = this.props;	
		expandCard({ offerIndex: offer.offerIndex, expanded: !offer.expanded });
	};

	render() {
		const { classes, offer } = this.props;
		const { opportunityId, expanded } = offer;

		return (
			<div id={"card-" + opportunityId} style={{padding:"16px 16px 0px 16px"}} >
				<Card>
					<div className={classes.headerContainer}>
						<OpportunityHeader offer={offer}/>		
						<IconButton id={"button-expand-" + opportunityId} 
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded
							})}
							onClick={this.handleExpandClick}
							aria-expanded={expanded}
							aria-label="Show more"
						>
							<IconCaretDown size="16" color="teal"/>
						</IconButton>	
					</div>	
					<Divider />
					<OpportunityBody offer={offer} content={offer.longMessage} expanded={expanded} />
					<OpportunityDisposition offer={offer}/>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(OpportunityCard);
