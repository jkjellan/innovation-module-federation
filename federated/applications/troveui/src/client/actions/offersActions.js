import { api } from "../utils/ServiceProxy";
import { isProd } from "../utils/Environment";
import { brandNames } from "../utils/Constants";
import { createDispositionRequest, createTroveDispositionRequest} from "../helpers/DispositionHelper";
import store from "../store/store";

/* Thunk Actions */
export const disposition = (state = store.getState(), isProduction = isProd(), request = null, troveDisposition = null)  => {
    const dispositionSaved = state.offers.dispositionSaved;
    const params = state.app.params;
    const brand = state.app.brand;

    if (!dispositionSaved && (isProduction || params.dispositionEnabled)) {
        if (!troveDisposition) {
            troveDisposition = createTroveDispositionRequest();
        }

        console.log("troveDisposition: ", JSON.stringify(troveDisposition));
        if (troveDisposition.dispositions && troveDisposition.dispositions.length > 0) {
            if (brand === brandNames.LIBERTY) {
                if (!request) {
                    request = createDispositionRequest();
                }
        
                api("interact/logDisposition", request);
            }

            api("offers/dispositions/"+brand, troveDisposition);

            store.dispatch(saveDisposition(true));
            console.log("Disposition completed");
            return true;
        }
    }

    return false;
}

/* Action Types */
export const LOAD_OFFERS = 'LOAD_OFFERS';

export function loadOffers(rankedOffers = []) {
    return {
        type: LOAD_OFFERS,
        rankedOffers,
    };
}

export const LOAD_KICKOUT_OFFERS = 'LOAD_KICKOUT_OFFERS';

export function loadKickOutOffers(kickOutOffers = []) {
    return {
        type: LOAD_KICKOUT_OFFERS,
        kickOutOffers,
    };
}

export const LOAD_GUIDANCE_OPPORTUNITIES = 'LOAD_GUIDANCE_OPPORTUNITIES';

export function loadGuidanceOpportunities(guidanceOpportunities = []) {
    return {
        type: LOAD_GUIDANCE_OPPORTUNITIES,
        guidanceOpportunities,
    };
}

export const LOAD_XSELL_OFFERS = 'LOAD_XSELL_OFFERS';

export function loadXsellOffers(xsellOffers = []) {
    return {
        type: LOAD_XSELL_OFFERS,
        xsellOffers,
    };
}

export const LOAD_UPSELL_OFFERS = 'LOAD_UPSELL_OFFERS';

export function loadUpsellOffers(upsellOffers = []) {
    return {
        type: LOAD_UPSELL_OFFERS,
        upsellOffers,
    };
}

export const DISPOSITION_OFFER = 'DISPOSITION_OFFER';

export function dispositionOffer(offerDisposition = {}) {
    return {
        type: DISPOSITION_OFFER,
        offerDisposition,
    };
}

export const SAVE_DISPOSITION = 'SAVE_DISPOSITION';

export function saveDisposition() {
    return {
        type: SAVE_DISPOSITION,
        dispositionSaved: true
    };
}

export const TOGGLE_ACTIVE_OFFER_TYPE = 'TOGGLE_ACTIVE_OFFER_TYPE';

export function toggleActiveOfferType(activeOfferType) {
    return {
        type: TOGGLE_ACTIVE_OFFER_TYPE,
        activeOfferType
    };
}

export const SET_OFFERS_APPLICABLE_STATUS = 'SET_OFFERS_APPLICABLE_STATUS';

export function setOffersApplicableStatus(offersApplicableStatus) {
    return {
        type: SET_OFFERS_APPLICABLE_STATUS,
        offersApplicableStatus
    };
}

export const SET_IS_TIMEOUT = 'SET_IS_TIMEOUT';

export function setIsTimeout(isTimeout) {
    return {
        type: SET_IS_TIMEOUT,
        isTimeout
    };
}

export const LOAD_IS_CANCEL_CALL = 'LOAD_IS_CANCEL_CALL';

export function loadIsCancelCall(guidanceOpportunities = {}) {
    return {
        type: LOAD_IS_CANCEL_CALL,
        guidanceOpportunities
    };
}

export const EXPAND_CARD = 'EXPAND_CARD';

export function expandCard(card = {}) {
    return {
        type: EXPAND_CARD,
        card
    };
}

export const SET_OFFER_COUNTS = 'SET_OFFER_COUNTS';

export function setOfferCounts(offerCounts = {}) {
    return {
        type: SET_OFFER_COUNTS,
        offerCounts,
    }
}

export const SET_AGENCY_INFO = 'SET_AGENCY_INFO';

export function setAgencyInfo(agencyInfo) {
    return {
        type: SET_AGENCY_INFO,
        agencyInfo,
    }
}

export const SET_SESSION_REFERENCE_ID = 'SET_SESSION_REFERENCE_ID';

export function setSessionReferenceId(sessionReferenceId) {
    return {
        type: SET_SESSION_REFERENCE_ID,
        sessionReferenceId,
    }
}
