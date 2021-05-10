import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
	contentItem: {
		padding: "2px 0px 8px 0px",
	},
});

class ScriptTab extends Component {	
	render() {
		const {classes, contentToggleValue, offer } = this.props
		const content = offer.longMessage;
		const { opportunityId } = offer;

		return (
			<div id={"text-content-script-" + opportunityId} hidden={contentToggleValue !== 1} style={{marginTop: "1em", paddingTop: 2}}>	
                {content && content.split("|").length > 1 && content.split("|")[1].split(";").map((bulletItem, index) => (
                    <Typography key={index} variant="body2" className={classes.contentItem} >
                            {bulletItem}
                    </Typography>										
                ))}
			</div>	
		);
	}
}

export default withStyles(styles)(ScriptTab);
