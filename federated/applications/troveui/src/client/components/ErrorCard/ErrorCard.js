import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Notification } from "@lmig/lmds-react";

const styles = theme => ({	
	card: {
		padding: 16
	},
});

class ErrorCard extends Component {
	render() {
		const { classes, error } = this.props;

		return ( 
			<div id="card-error" className={classes.card}>
				<Notification highlightType="negative" alert={error.alert}>
					<Typography id="error-notification-text" variant="body2">
						{error.message}
					</Typography>
				</Notification>
			</div>
		);
	}
}

export default withStyles(styles)(ErrorCard);
