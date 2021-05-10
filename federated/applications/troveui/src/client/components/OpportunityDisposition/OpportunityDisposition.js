import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CardActions } from "@material-ui/core";
import DispositionOptions from "../../containers/DispositionOptionsContainer";
import DispositionSelected from "../../containers/DispositionSelectedContainer";
import DispositionOptionsPopover from "../../containers/DispositionOptionsPopoverContainer";
import { dispositionValues } from "../../utils/Constants";

const styles = theme => ({
	dispositionContainer: {
		display: "flex",
		flexGrow: 1,
		alignItems: "center",
	},
});

class OpportunityDisposition extends Component {

	render() {	
		const { classes, offer, dispositionSaved } = this.props;

		return (
			<div>
				{(!offer.disposition || offer.disposition == dispositionValues.DISPLAYED) && !dispositionSaved ?
					<DispositionOptions offer={offer}/>
					: 
					<CardActions className={classes.cardActions}>
						<div className={classes.dispositionContainer}>
							<DispositionSelected offer={offer} />
							{!dispositionSaved ? <DispositionOptionsPopover offer={offer} /> : null }
						</div>
					</CardActions>
				}
			</div>
						
		);
	}
}

export default withStyles(styles)(OpportunityDisposition);
