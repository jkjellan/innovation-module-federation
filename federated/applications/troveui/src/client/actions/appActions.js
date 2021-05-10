import checkAuth from "../helpers/AuthHelper";
import { api } from "../utils/ServiceProxy";
import { cleanParamString } from "../utils/StringUtils";
import { config } from "../utils/Config";
import { offerTypes, offersApplicableStatuses, errorTypes, brandNames } from '../utils/Constants';
import { disposition, loadIsCancelCall, toggleActiveOfferType, expandCard,
    loadOffers, loadKickOutOffers, loadGuidanceOpportunities, loadXsellOffers, loadUpsellOffers,
    setOffersApplicableStatus, setIsTimeout, setOfferCounts, setAgencyInfo, setSessionReferenceId } from './offersActions';
import { setError } from './errorActions';
import store from "../store/store";

import {
    listenForEvents,
    respondToCCUI,
} from "../helpers/AppHelper.js";

/* Action Types */

// Thunk Actions
export const initialize =
dispatch => {
    respondToCCUI();
    listenForEvents();

    dispatch(setLoading(true));

    parent.postMessage({action: "badge", applet: "sellTools", value: null}, "*");

    dispatch(setParams());

    const params = store.getState().app.params;
    console.log("Params in initialize: ", params);

    const brand = Object.prototype.hasOwnProperty.call(params, 'householdId') ? brandNames.LIBERTY : brandNames.SAFECO;
    dispatch(setBrand(brand));

    if (!(params.householdId || params.policyNumber)) {
        console.log("No household/policy specified");
        const error = {
            type: errorTypes.NO_HOUSEHOLD_OR_POLICY,
            alert: config.errorMessages[errorTypes.NO_HOUSEHOLD_OR_POLICY].alert,
            message: config.errorMessages[errorTypes.NO_HOUSEHOLD_OR_POLICY].message,
        };
        dispatch(setError(error));
        dispatch(setLoading(false));
    } else {
        checkAuth()
            .then(user => {
                dispatch(setUser(user));

                const troveOffersRoute = config.troveOffersRoutes[brand];
                const client = config.troveClientMapping[brand][user.effectiveGroup];

                if (!client || !troveOffersRoute) {
                    return;
                }

                dispatch(createSession());
                dispatch(logSession);

                const sessionId = store.getState().app.session.sessionId;

                const request = {
                    client: client,
                    sessionId: sessionId,
                    sessionReferenceId: sessionId,
                    user: user.userId,
                    householdId: params.householdId,
                    policy: params.policyNumber,
                }

                return api(troveOffersRoute, request)
                    .then(response => {
                        return new Promise((resolve, reject) => {
                            console.log("response from Trove: ", response);
                            dispatch(setSessionReferenceId(response.sessionReferenceId));
                            dispatch(loadIsCancelCall(response.guidanceOpportunities));
                            dispatch(setPolicyNumbers(response.policyNumbers));
                            dispatch(setPolicies(response.policies));
                            dispatch(setAgencyInfo(response.agencyInfo));
						  	dispatch(loadGuidanceOpportunities(response.guidanceOpportunities));
                            dispatch(loadXsellOffers(response.xsellOffers));
                            dispatch(loadUpsellOffers(response.upsellOffers));
                            dispatch(loadKickOutOffers(response.kickOutOffers));
                            const kickOutOffers = store.getState().offers.kickOutOffers;
                            if (kickOutOffers && kickOutOffers.length != 0) {
                                const kickOutMessage = kickOutOffers[0].longMessage ? kickOutOffers[0].longMessage : kickOutOffers[0].shortMessage;
                                const error = {
                                    type: errorTypes.KICKOUT_RULE,
                                    alert: config.errorMessages[errorTypes.KICKOUT_RULE].alert,
                                    message: kickOutMessage,
                                };
                                dispatch(setError(error));
                            }
                            resolve(dispatch(loadOffers(response.rankedOffers)));
                        })
                    })
                    .then(() => {
                        dispatchOffers(dispatch, params, user);
                    })
                    .catch((error) => {
                        console.log("offers error: ", error);
                        error = { type: errorTypes.OFFERS_REQUEST, userInfo: user };
                        dispatch(setError(error));
                    });

            })
            .catch((error) => {
                console.log("checkAuth error: ", error);

                if(!error.type)
                    error = { type: errorTypes.DEFAULT, userInfo: store.getState().app.user };

                dispatch(setError(error));
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }
};

export const logSession =
dispatch => {
    const sessionId = store.getState().app.session.sessionId;
    const userId = store.getState().app.user.userId;
    const params = store.getState().app.params;

    if (cleanParamString(params.eduId) && cleanParamString(params.householdId) && sessionId) {
        const body = {
            eduId: cleanParamString(params.eduId),
            householdId: cleanParamString(params.householdId),
            userId: cleanParamString(userId),
            sessionId: cleanParamString(sessionId),
        }

        return api("logEduIdSessionId", body)
            .then(data => {
                console.log("logSession data: ", data);
                return data;
            })
            .catch(error => {
                console.log("logSession error: ", error);
            });
    }
}

export const collapseCards =
dispatch => {
    const offers = store.getState().offers.offers;

    Object.values(offers).forEach((offer) => {
        dispatch(expandCard({ offerIndex: offer.offerIndex, expanded: false }));
    });
}

function dispatchOffers(dispatch, params, userInfo) {
    setTimeout(() => { dispatch(setIsTimeout(true)); disposition(); }, config.dispositionTimeout);
    const brand = store.getState().app.brand;
    const offers = store.getState().offers.offers;
    const numberOfOffers = Object.values(offers).length;
    const xsellOffersCount = Object.values(offers).filter(offer => offer.type == offerTypes.XSELL).length;
    const upsellOffersCount = Object.values(offers).filter(offer => offer.type == offerTypes.UPSELL).length;

    dispatch(setOfferCounts({ numberOfOffers, xsellOffersCount, upsellOffersCount }));
    xsellOffersCount > 0 ? dispatch(toggleActiveOfferType(offerTypes.XSELL)) :
        upsellOffersCount > 0 ? dispatch(toggleActiveOfferType(offerTypes.UPSELL)) : dispatch(toggleActiveOfferType(""));

    const tierOneOpportunitiesCount = store.getState().offers.tierOneGuidanceOpportunities.length

    if (tierOneOpportunitiesCount){
        dispatch(setOffersApplicableStatus(offersApplicableStatuses.CALL_NOT_APPLICABLE));
    } else {
	  	dispatch(setOffersApplicableStatus(offersApplicableStatuses.APPLICABLE));
	}

  if ((tierOneOpportunitiesCount || numberOfOffers || (offers.agencyInfo && offers.agencyInfo.agencyRemarks)) &&
	  (cleanParamString(params.eduId) || brand == brandNames.SAFECO ||
        (userInfo.effectiveGroup == config.ldapGroups.systems.name))) {
      	parent.postMessage({ action: "badge", applet: "sellTools", value: numberOfOffers }, "*");
        if (config.enablePopForNewOffers && !store.getState().offers.isCancelCall) {
            parent.postMessage({ action: "pop-badge", applet: "sellTools" }, "*");
        }
    }
}

export const SET_LOADING = 'SET_LOADING';

export function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        isLoading,
    };
}

export const CREATE_SESSION = 'CREATE_SESSION';

export function createSession() {
    return {
        type: CREATE_SESSION,
    };
}

export const SET_USER = 'SET_USER';

export function setUser(user) {
    return {
        type: SET_USER,
        user,
    };
}

export const SET_PARAMS = 'SET_PARAMS';

export function setParams() {
    return {
        type: SET_PARAMS,
    }
}

export const SET_BRAND = 'SET_BRAND';

export function setBrand(brand) {
    return {
        type: SET_BRAND,
        brand,
    }
}

export const SET_POLICY_NUMBERS = 'SET_POLICY_NUMBERS';

export function setPolicyNumbers(policyNumbers = []) {
    return {
        type: SET_POLICY_NUMBERS,
        policyNumbers,
    }
}

export const SET_POLICIES = 'SET_POLICIES';

export function setPolicies(policies = []) {
    return {
        type: SET_POLICIES,
        policies,
    }
}
