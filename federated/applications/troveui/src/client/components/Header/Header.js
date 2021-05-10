import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getParams } from "../../utils/Environment";

const styles = theme => ({
	applicationHeaderNameWithHouseholdName: {
		fontSize: 13,
	},
	header: {
		fontWeight: 800
	}
  });

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;
		const params = getParams();

		return (				
			params && (params.householdName || params.customerName) ?
			<div id="header-with-household-label">
				<Typography className={classes.header} variant="h6">
					{params.householdName ? <span>{params.householdName} household</span> : <span>{params.customerName}</span>}
				</Typography>
				<Typography id="application-header-name"  className ={classes.applicationHeaderNameWithHouseholdName}>
					Cross-sell & upsell opportunities
				</Typography>
			</div>
			:
			<Typography className={classes.header} id="application-header-name"  variant="h6">
				Cross-sell & upsell opportunities
			</Typography>
		);
	}
}

export default withStyles(styles)(Header);
