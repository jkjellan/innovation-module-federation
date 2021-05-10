import queryString from "query-string";
import store from "../store/store";

import { offersApplicableStatuses, dispositionValues } from "../utils/Constants";
import { getParams } from "../utils/Environment";
import { apiGet } from "../utils/ServiceProxy";
import { cleanParamString, ignoreCaseCompare, ignoreCaseIncludes } from "../utils/StringUtils";

import { 
    disposition, 
    setIsTimeout, 
    dispositionOffer,
} from "../actions/offersActions";

export const listenForEvents = () => {
    window.addEventListener("message", (event) => {
        console.log("printing event data", event.data);

        if (!(event.data && event.data.action && event.data.action == "onload")) {
            apiGet("health")
                .then(response => {
                    if (response && response.status === "UP") {
                        console.log("Server healthy");
                        parent.postMessage({ action: "onload", applet: "sellTools" }, "*");
                        const offersApplicableStatus = store.getState().offers.offersApplicableStatus;
                        const noRefreshForApplicableStatus = offersApplicableStatus === offersApplicableStatuses.CALL_NOT_APPLICABLE;
                        console.log("offersApplicableStatus: " + offersApplicableStatus);

                        if (event.data && event.data.name) {
                            switch (event.data.name) {
                                case "Opened CSW Customer View":
                                    console.log("getState CSW: ", store.getState());
                                    const currentParams = store.getState().app.params;
                                    const eventParams = getParams(event.data.params);

                                    const sameEduId = ignoreCaseCompare(cleanParamString(eventParams.eduId), cleanParamString(currentParams.eduId));
                                    const sameHouseholdId = ignoreCaseCompare(cleanParamString(eventParams.householdId), cleanParamString(currentParams.householdId));

                                    if (!(sameEduId && (sameHouseholdId || noRefreshForApplicableStatus))) {
                                        console.log("Dispositioning offers before loading new household");
                                        store.dispatch(setIsTimeout(false));
                                        disposition();
                                        const newQueryString = "?" + queryString.stringify(eventParams);
                                        console.log({ newQueryString: newQueryString });
                                        location = location.origin + newQueryString;
                                    }
                                    break;
                                case "Opened PST Policy":
                                    console.log("getState PST: ", store.getState());
                                    const eventPolicyNumber = event.data.policyNumber;
                                    if (eventPolicyNumber) {
                                        const policyNumbers = store.getState().app.policyNumbers;
                                        const policyInHousehold = ignoreCaseIncludes(policyNumbers, eventPolicyNumber);

                                        if (!policyInHousehold) {
                                            console.log("Dispositioning offers before loading new household");
                                            store.dispatch(setIsTimeout(false));
                                            disposition();
                                            let eventParams = {
                                                policyNumber: eventPolicyNumber,
                                                customerName: event.data.customerName,
                                                userId: event.data.userId,
                                            }
                                            if (event.data.testMode) {
                                                eventParams.testMode = event.data.testMode;
                                            }
                                            if (event.data.dispositionEnabled) {
                                                eventParams.dispositionEnabled = event.data.dispositionEnabled;
                                            }
                                            const newQueryString = "?" + queryString.stringify(eventParams);
                                            console.log({ newQueryString: newQueryString });
                                            location = location.origin + newQueryString;
                                        }
                                    }
                                    break;
                                case "Opened Drawer":
                                    const offers = store.getState().offers.offers;
                                    
                                    if (offers && event.data.appletId === "sellTools") {
                                        offers.forEach(offer => {
                                            if (!offer.disposition) {
                                                store.dispatch(dispositionOffer({ offerIndex: offer.offerIndex, disposition: dispositionValues.DISPLAYED }));
                                            }
                                        })
                                    }
                                    break;
                                default:
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log("Server not healthy: ", err);
                    let newQueryString;
                    if (event.data) {
                        if (event.data.params) {
                            newQueryString = event.data.params;
                        } else {
                            newQueryString = "?" + queryString.stringify(event.data);
                        }
                        location = location.origin + newQueryString;
                    }
                });
        }
    });

    const userAgent = navigator.userAgent.toLowerCase();
    console.log("userAgent: ", userAgent);

    if (userAgent.indexOf(' electron/') == -1) {
        console.log("Not running in Electron.  Setting up beforeunload to disposition.");
        window.addEventListener('beforeunload', () => {
            store.dispatch(setIsTimeout(false));
            disposition();
        });
    }
}

export const respondToCCUI = () => {
    apiGet("health")
        .then(response => {
            if (response && response.status === "UP") {
                console.log("healthy");
                parent.postMessage({ action: "onload", applet: "sellTools" }, "*");
            }
        })
        .catch(err => {
            console.log("Not healthy: ", err);
        });
}