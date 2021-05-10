import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { dispositionValues } from "../../utils/Constants";
import { config } from "../../utils/Config";
import { Typography } from "@material-ui/core";
import IconCheckmark from "@lmig/lmds-react/icons/Checkmark";
import IconQuestionMark from "@lmig/lmds-react/icons/QuestionMark";
import IconClose from "@lmig/lmds-react/icons/Close";

const styles = theme => ({
	button: {
		fontSize: "1rem",	
		paddingLeft: 10,
		paddingRight: 10
	},
	dispositionIcon: {
		marginRight: 16,
		marginLeft: 4,
		width: 16,
		height: 24,
		fill: theme.palette.primary.main,
	},
	dispositionText: {
		display: "flex",
		flexDirection: "column",
	},
	dispositionInfo: {
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
		width: 32,
		height: 32,
		fill: theme.palette.primary.main,
	},
});

class DispositionSelected extends Component {
	render() {	
		const { classes, offer } = this.props;
		const { opportunityId } = offer;

		const dispositionInfo = {
            [null]: {
				icon: <IconCheckmark className={classes.dispositionIcon} size="16" />,
				text: "Offer presented",
				subText : "",
			},
			[dispositionValues.DISPLAYED]: {
				icon: <IconCheckmark className={classes.dispositionIcon} size="16" />,
				text: "Offer presented",
				subText : "",
			},
			[dispositionValues.ACCEPTED]: {
				icon: <IconCheckmark className={classes.dispositionIcon} size="16" />,
				text: "Offer accepted",
				subText : "Make update in policy",
			},
			[dispositionValues.INTERESTED]: {
				icon: <IconQuestionMark className={classes.dispositionIcon} size="16" />,
				text: "Interested in offer",
				subText : "Will display next time customer calls",
			},
			[dispositionValues.DECLINED]: {
				icon: <IconClose className={classes.dispositionIcon} size="16" />,
				text: "Offer declined",
				subText : "Suppressed for 60 days",
			},
			[dispositionValues.LEAD_CREATED]: {
				icon: <IconCheckmark className={classes.dispositionIcon} size="16" />,
				text: "Create Lead",
				subText : "Follow steps to create lead",
			},
		}

		return (
			<div className={classes.dispositionInfo}>
				<div id={"icon-disposition-" + opportunityId} className={classes.dispositionIcon}  >
					{dispositionInfo[offer.disposition].icon}
				</div>
				<div className={classes.dispositionText}>
					<Typography id={"text-disposition-" + opportunityId} color="primary">
						{dispositionInfo[offer.disposition].text}
					</Typography>
					<Typography id={"sub-text-disposition-" + opportunityId} style={{fontSize: ".75rem"}}>
						{dispositionInfo[offer.disposition].subText}
					</Typography>
				</div>
			</div>						
		);
	}
}

export default withStyles(styles)(DispositionSelected);
