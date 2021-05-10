import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import IconCheckmark from "@lmig/lmds-react/icons/Checkmark";
import { List, ListItem } from "@lmig/lmds-react";


const styles = theme => ({
});

class BenefitsTab extends Component {	
	render() {
		const {classes, contentToggleValue, offer } = this.props
		const content = offer.longMessage;
        const { opportunityId } = offer;
 
        return (
			<div id={"text-content-benefits-" + opportunityId} hidden={contentToggleValue !== 0}>
            {content &&
			<List icon={<IconCheckmark />}>
				{content.split("|")[0].split(";").map((bulletItem, index) => (
				<ListItem key={index}>
					<Typography variant="body2" style={{paddingTop: 4}}>
						{bulletItem}
					</Typography>										
				</ListItem>))}
			</List>
            }
		</div>	
		);
	}
}

export default withStyles(styles)(BenefitsTab);
