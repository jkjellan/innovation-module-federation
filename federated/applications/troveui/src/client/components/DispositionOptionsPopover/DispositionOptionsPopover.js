import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, IconButton, Popover } from "@material-ui/core";
import IconSeeMore from "@lmig/lmds-react/icons/SeeMore";
import { dispositionValues } from "../../utils/Constants";
import { config } from "../../utils/Config";

const styles = theme => ({
	dispositionIconButton: {
		height: 48,
		width: 48,
	},
	popOverButtons: {
		display: "flex",
		flexDirection: "column",
	},
});

class DispositionOptionsPopover extends Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({anchorEl: event.currentTarget});
	};
	
	handleClose = () => {
		this.setState({anchorEl: null});
	};

	dispositionOffer = (dispositionValue) => {
		parent.postMessage({action: "badge", applet: "sellTools", value: null}, "*");
		
		this.props.dispositionOffer(dispositionValue);

		if(dispositionValue === "Lead Created") {
			const { params } = this.props;
			window.open(sellUrl() + "?customerOID=" + params.customerKey + "&pin=" + params.userId, "_blank", "toolbar=0,location=0,menubar=0,resizable=1");
		}
	}

	render() {	
		const { classes, offer } = this.props;
		const { type, opportunityId, offerIndex } = offer;
		const open = Boolean(this.state.anchorEl);

		return (
			<div className={classes.dispositionIconButton}>
				<IconButton
					aria-describedby={"popover-" + opportunityId}
					id={"icon-disposition-more-" + opportunityId} 
					className={classes.dispositionIconButton}
					onClick={this.handleClick}
				>
					<IconSeeMore size="24"/>	
				</IconButton>						
				<Popover
					id={"popover-" + opportunityId}
					open={open}
					anchorEl={this.state.anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
					}}
					transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
					}}
				>
					<div className={classes.popOverButtons}>
					{
						config.dispositionButton[type].map((dispositionButton) => {
							const disposition = dispositionButton.dispositionValue;
							const dispositionText = dispositionButton.dispositionText;
							const buttonId = "button-" + dispositionText.toLowerCase().split(" ").join("-") + "-popover-" + opportunityId;

							return (
							<Button
								style={{display: offer.disposition == disposition ? "none" : ""}} 
								onClick={() => {this.setState({anchorEl:null}); this.dispositionOffer({ offerIndex, disposition }); }} 
								key={buttonId}
								id={buttonId}
							>
								{dispositionText}
							</Button>
							)
						})
}
						<Button
							onClick={() => {this.setState({anchorEl:null}); this.dispositionOffer({ offerIndex, disposition: [dispositionValues.DISPLAYED]});}} 
							id={"button-reset-offer-popover-" + opportunityId}
						>
							Reset offer
						</Button>
					</div>									
				</Popover>
			</div>					
		);
	}
}

export default withStyles(styles)(DispositionOptionsPopover);
