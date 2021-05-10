import {
    LOAD_OFFERS,
    LOAD_KICKOUT_OFFERS,
    LOAD_GUIDANCE_OPPORTUNITIES,
    LOAD_XSELL_OFFERS,
    LOAD_UPSELL_OFFERS,
    DISPOSITION_OFFER,
    SAVE_DISPOSITION,
    TOGGLE_ACTIVE_OFFER_TYPE,
    SET_OFFERS_APPLICABLE_STATUS,
    SET_IS_TIMEOUT,
    LOAD_IS_CANCEL_CALL,
    EXPAND_CARD,
    SET_OFFER_COUNTS,
    SET_AGENCY_INFO,
    SET_SESSION_REFERENCE_ID,
} from '../../actions/offersActions';

import { getTieredGuidanceOpportunities } from '../../helpers/OffersHelper';

const initialState = {
    offers: [],
    kickOutOffers: [],
  	tierOneGuidanceOpportunities: [],
  	tierTwoGuidanceOpportunities: [],
    xsellOffers: [],
    upsellOffers: [],
    isCancelCall: false,
};

export const createOffersObject = (newOffers) => {
    let offers = [];

    // parse ranked offers
    newOffers.forEach((offer, index) => {
        let tempOffer = new Object();
        tempOffer.policyNumbers = offer.policyNumbers;
        tempOffer.messageName = offer.message.messageName;
        tempOffer.shortMessage = offer.message.shortMessage;
        tempOffer.longMessage = offer.message.longMessage;
        tempOffer.offerQuality = offer.offerQuality ? offer.offerQuality : "Average";
        tempOffer.opportunityId = offer.opportunityId;
        tempOffer.dispositionOfferId = offer.preferredPropensityThreshold;
        tempOffer.type = offer.type;
	  	tempOffer.messageType = offer.message.messageType;
        tempOffer.disposition = null;
        tempOffer.expanded = false;
        tempOffer.offerIndex = index;

        offers[index] = tempOffer;
    });

    return offers;
}

export const isCancelCall = (guidanceOpportunities) => {
    const previousRule = guidanceOpportunities.find(x => (x.message && (/^NbsPreviousRun/).test(x.message.messageName)));

    return previousRule ? true : false;
}

const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_OFFERS:
            return {
                ...state,
                offers: createOffersObject(action.rankedOffers),
            };
        case LOAD_KICKOUT_OFFERS:
            return {
                ...state,
                kickOutOffers: createOffersObject(action.kickOutOffers),
            };
	    case LOAD_GUIDANCE_OPPORTUNITIES:
		    const guidanceOpportunities = createOffersObject(action.guidanceOpportunities);
            const tieredGuidanceOpportunities = getTieredGuidanceOpportunities(guidanceOpportunities);
            return {
                ...state,
                tierOneGuidanceOpportunities: tieredGuidanceOpportunities.tierOneGuidanceOpportunities,
                tierTwoGuidanceOpportunities: tieredGuidanceOpportunities.tierTwoGuidanceOpportunities
            };
        case LOAD_XSELL_OFFERS:
            return {
                ...state,
                xsellOffers: createOffersObject(action.xsellOffers),
            };
        case LOAD_UPSELL_OFFERS:
            return {
                ...state,
                upsellOffers: createOffersObject(action.upsellOffers),
            };
        case DISPOSITION_OFFER:
            const oppIndex = action.offerDisposition.offerIndex;
            return {
                ...state,
                offers: Object.values({
                    ...state.offers,
                    [oppIndex]: {
                        ...state.offers[oppIndex],
                        disposition: action.offerDisposition.disposition,
                    }
                })
            };
        case SAVE_DISPOSITION:
            return {
                ...state,
                dispositionSaved: action.dispositionSaved,
            };
        case TOGGLE_ACTIVE_OFFER_TYPE:
            return {
                ...state,
                activeOfferType: action.activeOfferType,
            };
        case SET_OFFERS_APPLICABLE_STATUS:
            return {
                ...state,
                offersApplicableStatus: action.offersApplicableStatus,
            };
        case SET_IS_TIMEOUT:
            return {
                ...state,
                isTimeout: action.isTimeout,
            };
        case LOAD_IS_CANCEL_CALL:
            return {
                ...state,
                isCancelCall: isCancelCall(action.guidanceOpportunities),
            };
        case EXPAND_CARD:
            const offerIndex = action.card.offerIndex;
            return {
                ...state,
                offers: Object.values({
                    ...state.offers,
                    [offerIndex]: {
                        ...state.offers[offerIndex],
                        expanded: action.card.expanded,
                    }
                })
            };
        case SET_OFFER_COUNTS:
            return {
                ...state,
                numberOfOffers: action.offerCounts.numberOfOffers,
                xsellOffersCount: action.offerCounts.xsellOffersCount,
                upsellOffersCount: action.offerCounts.upsellOffersCount,
            };
        case SET_AGENCY_INFO:
            return {
                ...state,
                agencyInfo: action.agencyInfo,
            };
        case SET_SESSION_REFERENCE_ID:
            return {
                ...state,
                sessionReferenceId: action.sessionReferenceId,
            };
        default:
            return { ...state };
    }
};

export default offersReducer;
