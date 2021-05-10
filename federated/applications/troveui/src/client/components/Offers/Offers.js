import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import OpportunityCard from "../../containers/OpportunityCardContainer";
import OffersApplicable from "../../containers/OffersApplicableContainer";
import { offerTypes, offersApplicableStatuses, errorTypes } from '../../utils/Constants';
import { Typography, Container } from '@material-ui/core';
import AgencyRemarks from "../../containers/AgencyRemarksContainer";
import TierTwoGuidanceCard from "../../containers/TierTwoGuidanceCardContainer";
import IneligibleOffersCard from "../../containers/IneligibleOffersCardContainer";
import ErrorCard from "../../containers/ErrorCardContainer";

const styles = theme => ({
	noOffers: {
		color: theme.palette.primary.main,
		paddingTop: 16,
		paddingLeft: 16
	},
	applicableStatus: {
		fontFamily: "Roboto",
		padding: "16px 16px 0px 16px",
		color: theme.palette.primary.main,
    }
});

class Offers extends Component {
	render() {
	  const { classes, offers, error, activeOfferType, offersApplicableStatus } = this.props;

        return (
            <div>
                {[errorTypes.NO_HOUSEHOLD_OR_POLICY, errorTypes.KICKOUT_RULE].includes(error.type) ?
                <ErrorCard/>
            :
                <div>
                    <IneligibleOffersCard/>
                    {activeOfferType ?
                        <div>
                            {offersApplicableStatus === offersApplicableStatuses.APPLICABLE && activeOfferType === offerTypes.UPSELL ? (
                                    Object.values(offers).map((offer, index) => (
                                    (offer.type === offerTypes.UPSELL) &&
                                        <OpportunityCard offer={offer} key={index}/>
                                )))
                            :
                            offersApplicableStatus === offersApplicableStatuses.APPLICABLE && activeOfferType === offerTypes.XSELL ? (
                                Object.values(offers).map((offer, index) => (
                                    (offer.type === offerTypes.XSELL) &&
                                    <OpportunityCard offer={offer} key={index}/>
                            )))
                            :
                                null
                            }
                            <OffersApplicable/>
                        </div>
                    :
                        <div>
                            <Container className={classes.noOffers}>
                                <Typography id="text-no-xsell-or-upsell">No cross-sell or upsell offers available.</Typography>
                            </Container>
                        </div>
                    }
                        <TierTwoGuidanceCard/>
                    </div>}
                    
                    <AgencyRemarks/>
                </div>
        )
    }
}

Offers.propTypes = {};

export default withStyles(styles)(Offers);
