import store from "../store/store";
import { dispositionValues, offersApplicableStatuses } from "../utils/Constants";
import { config } from "../utils/Config";

function createNewDisposition(offerId) {
    let disposition = new Object();
    disposition.offerId = offerId;
    disposition.wasAccepted = false;
    disposition.wasAppSuppressed = false;
    disposition.wasInterested = false;
    disposition.wasLead = false;
    disposition.wasPresented = false;
    disposition.wasRejected = false;
    disposition.wasTimeout = false;

    return disposition;
}

export function createDispositionRequest(state = store.getState()) {
    const householdId = state.app.params.householdId;
    const userId = state.app.user.userId;
    const sessionId = state.app.session.sessionId;
    const offers = state.offers.offers;

    const request = {
        employeeId: userId,
        customerId: 123,
        householdId,
        sessionId, 
        offerDispositions: createOfferDispositions(offers)
    };

    return request;
}

function createOfferDispositions(offers = store.getState().offers.offers, isTimeout = store.getState().offers.isTimeout,
    offersApplicableStatus = store.getState().offers.offersApplicableStatus) {
    let offerDispositions = [];

    Object.values(offers).forEach((offer) => {
        console.log("offer: ", offer)
        let disposition = createNewDisposition(offer.dispositionOfferId);

        disposition.wasPresented = true;

        if(isTimeout){
            disposition.wasTimeout = true;
        }
        
        if (offersApplicableStatus === offersApplicableStatus.CALL_NOT_APPLICABLE) {
            disposition.wasAppSuppressed = true;
        }
        else if (offersApplicableStatus === offersApplicableStatus.UPSELLS_NOT_APPLICABLE) {
            disposition.wasPresented = false;
            disposition.wasTimeout = true;
        }
        else {
            switch(offer.disposition) {
                case dispositionValues.ACCEPTED:
                    disposition.wasAccepted = true;
                    break;
                case dispositionValues.DECLINED:
                    disposition.wasRejected = true;
                    break;
                case dispositionValues.INTERESTED:
                    disposition.wasInterested = true;
                    break;
                case dispositionValues.LEAD_CREATED:
                    disposition.wasLead = true;
                    disposition.wasAccepted = true;
                    break;
                default:
                    break;
            }
        }

        offerDispositions.push(disposition);
    });

    return offerDispositions;
}

export function createTroveDispositionRequest(offers = store.getState().offers.offers, sessionReferenceId = store.getState().offers.sessionReferenceId) {
    const request = {
        sessionReferenceId: sessionReferenceId,
        dispositions: createTroveOfferDispositions(offers)
    }

    return request;
}

function createTroveOfferDispositions(offers, offersApplicableStatus = store.getState().offers.offersApplicableStatus) {

    let offerDispositions = [];

    Object.values(offers).forEach((offer) => {
        if (offer.disposition || offersApplicableStatus != offersApplicableStatuses.APPLICABLE) {
            let disposition = new Object();

            disposition.opportunityId = offer.opportunityId;
            
            if (offersApplicableStatus === offersApplicableStatuses.CALL_NOT_APPLICABLE) {
                disposition.dispositionId = config.dispositionId[dispositionValues.CALL_NOT_APPLICABLE];
            }
            else if (offersApplicableStatus === offersApplicableStatuses.UPSELLS_NOT_APPLICABLE) {						
                disposition.dispositionId = config.dispositionId[dispositionValues.UPSELLS_NOT_APPLICABLE];
            }
            else {
                switch(offer.disposition) {
                    case dispositionValues.DISPLAYED:					
                        disposition.dispositionId = config.dispositionId[dispositionValues.DISPLAYED];
                        break;
                    case dispositionValues.ACCEPTED:					
                        disposition.dispositionId = config.dispositionId[dispositionValues.ACCEPTED];
                        break;
                    case dispositionValues.DECLINED:					
                        disposition.dispositionId = config.dispositionId[dispositionValues.DECLINED];
                        break;
                    case dispositionValues.INTERESTED:					
                        disposition.dispositionId = config.dispositionId[dispositionValues.INTERESTED];
                        break;
                    case dispositionValues.LEAD_CREATED:					
                        disposition.dispositionId = config.dispositionId[dispositionValues.LEAD_CREATED];
                        break;
                    default:
                        break;
                }
            }

            offerDispositions.push(disposition);
        }
    });

    return offerDispositions;
}