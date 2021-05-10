import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Rating } from '@material-ui/lab';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { config } from "../../utils/Config";
import { offerTypes } from "../../utils/Constants";
import { formatPolicyNumber } from "../../utils/StringUtils";

import Icon12MonthGuarantee from "../../assets/12monthguarantee-32.svg";
import Icon24HrRoadsideAssistance from "../../assets/24hrroadsideassistance-32.svg"; 
import IconAuto from "../../assets/auto-32.svg";
import IconBetterCarReplacement from "../../assets/bettercarreplacement-32.svg";
import IconBodilyInjury from "../../assets/bodilyinjury-32.svg"; 
import IconBurglar from "../../assets/burglar-32.svg";
import IconCaretDown from "../../assets/caretdown-16.svg";
import IconCheckmark from "../../assets/checkmark-16.svg";
import IconClose from "../../assets/close-16.svg";
import IconDeductableFund from "../../assets/deductiblefund-32.svg";
import IconEFTPayment from "../../assets/documenteft-32.svg";
import IconEarthquake from "../../assets/earthquake-32.svg";
import IconEsign from "../../assets/esign-32.svg";
import IconHome from "../../assets/home-32.svg";
import IconHomeProtectorPlus from "../../assets/homeprotectorplus-32.svg";
import IconLife from "../../assets/life-32.svg";
import IconMotorcycle from "../../assets/motorcycle-32.svg";
import IconPaperless from "../../assets/paperless-32.svg"; 
import IconPersonalComputerReplacement from "../../assets/personalcomputerreplacement-32.svg";
import IconPolicy from "../../assets/policy-32.svg";
import IconProperty from "../../assets/property-32.svg";
import IconQuestionMark from "../../assets/questionmark-16.svg";
import IconRentalCarReimbursement from "../../assets/rentalcarreimbursement-32.svg";
import IconRenters from "../../assets/renters-32.svg";
import IconSeeMore from "../../assets/seemore-24.svg";
import IconSewerBackup from "../../assets/sewerbackup-32.svg";
import IconSpecialtyInsurance from "../../assets/specialtyinsurance-32.svg";
import IconUmbrellaOpen from "../../assets/umbrellaopen-32.svg";
import IconValuables from "../../assets/valuables-32.svg";
import IconWatercraft from "../../assets/watercraft-32.svg";

const styles = theme => ({
	pos: {
		display: "flex",
		alignItems: "center",
		padding: "16px 16px 0px 16px",
	},
	policyinfo: {
		display: "flex",
		flexDirection: "column",
	},
	rating: {
		padding: 0,
		display: 'flex',
		alignItems: 'center',
	  },
	ratingContainer: {
		padding: 0,
		marginBottom: 16,
		margin: 0,
		maginInline: 0,
	},
	starIcon: {
		height: 16,
		width: 16,
	},
	iconContainer: {
		// marginRight: 16,
		// marginBottom: 16,
	},
	offerIcon: {
		marginRight: 16,
		marginBottom: 16,
		// width: 32,
		// height: 32,
		fill: theme.palette.primary.main,
	},
});

class OpportunityHeader extends Component {
	render() {
		const { classes, offer} = this.props;
		const { offerQuality, policyNumbers, opportunityId, messageName, type } = offer;
		
		policyNumbers.length = Math.min(policyNumbers.length, config.maxQualifyingPolicies);
		
		let qualifyingPolicies = [];
		policyNumbers.map((policyNumber, index) => {
			let formattedPolicyNumber = formatPolicyNumber(policyNumber);

			if (index < (policyNumbers.length - 1)) {
				qualifyingPolicies.push(<nobr key={"policy-" + opportunityId + "-" + index}>{formattedPolicyNumber + ","}</nobr>);
				qualifyingPolicies.push(" ");
			}
			else {
				qualifyingPolicies.push(<nobr key={"policy-" + opportunityId + "-" + index}>{formattedPolicyNumber}</nobr>);
			}	
		});
		
		const title = offer.shortMessage;

		const className = classes.offerIcon
		const id = "icon-" + opportunityId;
		const offerIcons = {
			"100002": <IconBetterCarReplacement id={id} className={className}/>,
			"100003": <IconEFTPayment id={id} className={className}/>,
			"100004": <IconPaperless id={id} className={className}/>,
			"100005": <IconBodilyInjury id={id} className={className}/>,
			"100006": <IconRentalCarReimbursement id={id} className={className}/>,
			"100007": <Icon24HrRoadsideAssistance id={id} className={className}/>,
			"100008": <IconProperty id={id} className={className}/>,
			"100009": <IconAuto id={id} className={className}/>,
			"100015": <IconUmbrellaOpen id={id} className={className}/>,
			"100016": <IconDeductableFund id={id} className={className}/>,
			"100017": <IconValuables id={id} className={className}/>,
			"100018": <IconPersonalComputerReplacement id={id} className={className}/>,
			"100019": <IconBurglar id={id} className={className}/>,
			"100020": <IconSewerBackup id={id} className={className}/>,
			"100021": <IconEsign id={id} className={className}/>,
			"100030": <IconMotorcycle id={id} className={className}/>,
			"100031": <IconLife id={id} className={className}/>,
			"AnnualAutoRule": <Icon12MonthGuarantee id={id} className={className}/>,
			"AutoRule": <IconAuto id={id} className={className}/>,
			"AutoRulePreQualify": <IconAuto id={id} className={className}/>,
			"EarthquakeOfferRule": <IconEarthquake id={id} className={className}/>,
			"EarthquakeOfferRuleWaOr": <IconEarthquake id={id} className={className}/>,
			"EssentialUpsellRuleAuto": <IconBetterCarReplacement id={id} className={className}/>,
			"EssentialUpsellRuleHome": <IconHomeProtectorPlus id={id} className={className}/>,
			"MotorRule": <IconMotorcycle id={id} className={className}/>,
			"PropertyRuleHome": <IconHome id={id} className={className}/>,
			"PropertyRuleHomeEvent": <IconHome id={id} className={className}/>,
			"PropertyRulePreQualifyHome": <IconHome id={id} className={className}/>,
			"PropertyRulePreQualifyRenters": <IconRenters id={id} className={className}/>,
			"PropertyRuleRenters": <IconRenters id={id} className={className}/>,
			"SpecialtyNCMessage": <IconSpecialtyInsurance id={id} className={className}/>,
			"SpecialtyRule": <IconSpecialtyInsurance id={id} className={className}/>,
			"SpecialtyRuleIndicator": <IconSpecialtyInsurance id={id} className={className}/>,
			"TruePriceRewriteRule": <IconPolicy id={id} className={className}/>,
			"UmbrellaLimits": <IconUmbrellaOpen id={id} className={className}/>,	
			"UmbrellaRule": <IconUmbrellaOpen id={id} className={className}/>,
			"WaterRule": <IconWatercraft id={id} className={className}/>,
		}

		const offerQualityValues = {
			'Best': 1.0,
			'Good': 0.5,
			'Average': 0.0
		  };

		return (
			<div className={classes.pos}>
				<div className={classes.iconContainer} id={"icon-container-" + opportunityId}>
					{offerIcons[messageName]}
				</div>
				<div className={classes.policyinfo}>
					<Typography id={"text-offer-name-" + opportunityId} variant="h6" component="h2">
						{title}
					</Typography>
					<Box className = {classes.ratingContainer} component="fieldset" mb={3} borderColor="transparent">
						{ offerQuality == "Best" ?									
							<div className={classes.rating}>
								<Rating id={"icon-rating-" + opportunityId} 
									emptyIcon={<StarBorderIcon color={"primary"} className={classes.starIcon}/>} 
									icon={<StarIcon color={"primary"} className={classes.starIcon}/>}
									readOnly value={offerQualityValues[offerQuality]} max={1} precision={0.5} />
								<Typography id={"text-rating-" + opportunityId} style={{fontSize: ".75rem", marginLeft: 4}}>
									{"Great offer"}
								</Typography>
							</div>
						: 
							null
						}
						{type == offerTypes.UPSELL ?
							<Typography id={"text-qualifying-policies-" + opportunityId} style={{fontSize:".75rem"}}>
								{qualifyingPolicies}
							</Typography>
						: 
							null
						}
					</Box>
				</div> 
			</div>
		);
	}
}

export default withStyles(styles)(OpportunityHeader);
