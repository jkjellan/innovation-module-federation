import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { Typography } from '@material-ui/core';
import { List, ListItem } from "@lmig/lmds-react";
import { formatAgencyRemarks } from "../../utils/StringUtils";

const styles = theme => ({
    card: {
        padding:"16px 16px 0px 16px"
    },
    text: {
		marginTop: 250
	},
	headerContainer: {		
		display: "flex",
		alignItems: "center",
		padding: "16px 16px 0px 16px",
    },
});

class AgencyRemarks extends Component {
	render() {
		const { classes, agencyInfo } = this.props;
        
        var agencyRemarks = agencyInfo && agencyInfo.agencyRemarks ? formatAgencyRemarks(agencyInfo.agencyRemarks) : "";

		return (
            agencyInfo ?
                <div id="card-agency-remarks" className={classes.card}>
                    <Card>
                        <div className={classes.headerContainer}>
                            <Typography id={"text-offer-name-agency-remarks"} variant="h6" component="h2">
                                Agency Remarks
                            </Typography>		
                        </div>	
                        <div id="text-content-agency-remarks" style={{padding:"0px 16px 0px 16px"}}>
                            <List>
                                {agencyRemarks ?
                                    agencyRemarks.split("|").map((bulletItem, index) => (
                                    <ListItem key={index}>
                                        <Typography variant="body2" style={{paddingTop: 4}}>
                                            {bulletItem.split("\n").map((lineItem) => (lineItem))}
                                        </Typography>
                                    </ListItem>))
                                :
                                    <Typography variant="body2">
                                        No Agency Remarks for this Agency
                                    </Typography>
                                }
                            </List>
                        </div>
                    </Card>
                </div>
            :
                null
		);
	}
}

export default withStyles(styles)(AgencyRemarks);
