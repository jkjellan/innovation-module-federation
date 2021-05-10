import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/Icon";
import { CardContent, Collapse, List, ListItem, Tabs, Tab, Typography } from "@material-ui/core";
import IconCheckmark from "@lmig/lmds-react/icons/Checkmark";
import BenefitsTab from "../BenefitsTab/BenefitsTab";
import ScriptTab from "../ScriptTab/ScriptTab";

const styles = theme => ({
	checkMark: {
		height: 16,
		width: 16,
	},
	bullet: {
		width: 28,
		height: 28,
		marginRight: 8,
		marginTop: -8,
	},
	button: {
		fontSize: "1rem",	
		paddingLeft: 10,
		paddingRight: 10
	},
	contentContainer: {
		padding: 0,
		paddingTop: 0,
		"&:last-child": {
			paddingBottom: 0,
		},
	},
	contentItem: {
		padding: "6px 0px 6px 0px",
	},
});

class OpportunityBody extends Component {
	state = {
		contentToggleValue: 0,
	};
	
	handleChange = (event, newValue) => {
		this.setState({contentToggleValue: newValue});
	};
	
	a11yProps(index) {
		return {
			id: `tab-${index}-${this.props.offer.opportunityId}`,
			'aria-controls': `tabpanel-${index}`,
		};
	}	

	render() {
		const {contentToggleValue} = this.state;
		const { classes, expanded, offer } = this.props;
		const { opportunityId } = offer;

		return (
			<Collapse id={"collapse-content-" + opportunityId} style={{padding:"0px 16px 0px 16px"}} in={expanded} timeout="auto" unmountOnExit>
				<CardContent className={classes.contentContainer}>
					<Tabs variant="fullWidth" className={classes.tabs} value={contentToggleValue} onChange={this.handleChange} aria-label="Benefits and Scripts">
						<Tab classes={{root: classes.tab, selected: classes.selectedTab}} label="Benefits" {...this.a11yProps(0)} />
						<Tab classes={{root: classes.tab, selected: classes.selectedTab}} label="Script" {...this.a11yProps(1)} />
					</Tabs>							
					<BenefitsTab offer = {offer} contentToggleValue = {contentToggleValue}/>						
					<ScriptTab offer = {offer} contentToggleValue = {contentToggleValue}/>				
				</CardContent>
			</Collapse>
		);
	}
}

export default withStyles(styles)(OpportunityBody);
