import store from "../store/store";
import { linesOfBusiness, policyStatusCodes } from "../utils/Constants";
import { ignoreCaseCompare } from '../utils/StringUtils';

export function getIneligibleOffers() {
    const offersState = store.getState().offers;
    const policies = store.getState().app.policies;
    let ineligibleOffers = [];

    if (policies && policies.length) {
        const cdiPolicies = policies.reduce((accumulator, currentPolicy) => {
            if (currentPolicy.source === "CDI" && currentPolicy.statusCode === policyStatusCodes.ACTIVE) {
                const lineOfBusiness = linesOfBusiness[currentPolicy.lineOfBusiness];
                if (lineOfBusiness) {
                    if (accumulator[lineOfBusiness]) {
                        accumulator[lineOfBusiness] = accumulator[lineOfBusiness].concat(currentPolicy.policyNumber);
                    } else {
                        accumulator[lineOfBusiness] = [currentPolicy.policyNumber];
                    }
                }
            }
            return accumulator;
        }, {});
        if (Object.keys(cdiPolicies).length != 0) {
            let xrefs = [];
            Object.entries(cdiPolicies).sort().forEach(([lob, lobPolicies]) => {
                xrefs.push(lob + " (" + lobPolicies.join(", ") + ")");
            });
            if (xrefs.length != 0) {
                ineligibleOffers = [ "We found non-XREF policies associated to customer: " + xrefs.join(", ") ];
            }
        }
    }

    if (offersState.xsellOffers && offersState.xsellOffers.length != 0) {
        ineligibleOffers = ineligibleOffers.concat(offersState.xsellOffers.filter(x => x.longMessage).reduce((a, x) => a.concat(x.longMessage), []));
    }

    if (offersState.upsellOffers && offersState.upsellOffers.length != 0) {
        ineligibleOffers = ineligibleOffers.concat(offersState.upsellOffers.filter(x => x.longMessage).reduce((a, x) => a.concat(x.longMessage), []));
    }

    return ineligibleOffers;
}

export function getTieredGuidanceOpportunities(guidanceOpportunities) {
  let tierOneGuidanceOpportunities = [];
  let tierTwoGuidanceOpportunities = [];
  if (guidanceOpportunities && guidanceOpportunities.length !== 0) {
	tierOneGuidanceOpportunities = tierOneGuidanceOpportunities.concat(guidanceOpportunities.filter(x => x.longMessage && ignoreCaseCompare(x.messageType, "g1")));
	tierTwoGuidanceOpportunities = tierTwoGuidanceOpportunities.concat(guidanceOpportunities.filter(x => x.longMessage && ignoreCaseCompare(x.messageType, "g2")));
  }

  return {tierOneGuidanceOpportunities, tierTwoGuidanceOpportunities};
}
