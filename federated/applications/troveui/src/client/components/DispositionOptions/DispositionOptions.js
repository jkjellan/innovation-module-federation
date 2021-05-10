import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, CardActions } from "@material-ui/core";
import { config } from "../../utils/Config";
import { sellUrl } from "../../utils/Environment";
import { brandNames } from "../../utils/Constants";

const styles = theme => ({
	button: {
		fontSize: "1rem",	
		paddingLeft: 10,
		paddingRight: 10
	},
});

class DispositionOptions extends Component {
	handleDispositionClick = (offerIndex, disposition) => {
		parent.postMessage({action: "badge", applet: "sellTools", value: null}, "*");
		
		this.props.dispositionOffer({ offerIndex, disposition });
		this.props.expandCard({ offerIndex, expanded: false });

		if(disposition === "Lead Created") {
			const { params, brand } = this.props;
			if (brand === brandNames.LIBERTY) {
				window.open(sellUrl() + "?customerOID=" + params.customerKey + "&pin=" + params.userId, "_blank", "toolbar=0,location=0,menubar=0,resizable=1");
			}
		}
	};

	render() {	
		const { classes, offer } = this.props;
		const { type, opportunityId, offerIndex } = offer;

		return (
			<CardActions style={{padding:16}}>
				{
					config.dispositionButton[type].map((dispositionButton) => {
						const disposition = dispositionButton.dispositionValue;
						const dispositionText = dispositionButton.dispositionText;
						const buttonId = "button-" + dispositionText.toLowerCase().split(" ").join("-") + "-" + opportunityId;

						return (
						<Button 
							onClick={() => this.handleDispositionClick(offerIndex, disposition)}
							key={buttonId}
							id={buttonId} 
							className={classes.button} 
							variant="outlined" 
							color="primary" 
							size="small">
							{dispositionText}
						</Button>
						)
					})
				}
			</CardActions>					
		);
	}
}

export default withStyles(styles)(DispositionOptions);
