import { expect } from 'chai';

import * as offersActions from '../../../actions/offersActions';
import offersReducer from '../offersReducer';
import { createOffersObject } from '../offersReducer';

const offer1 = {
    policyNumbers: [
        "policy1",
        "policy2",
    ],
    message: {
        messageName: "100007",
        shortMessage: "testShortMessage",
        longMessage: "testLongMessage",
        messageType: "Up_Sell"
    },
    offerQuality: "Excellent",
    opportunityId: 1,
    type: "xsell",
    offerIndex: 0,
};

const offer2 = {
    policyNumbers: [
        "policy1",
    ],
    message: {
        messageName: "100008",
        shortMessage: "testShortMessage2",
        longMessage: "testLongMessage2",
        messageType: "Cross_Sell"
    },
    opportunityId: 2,
    type: "upsell",
    offerIndex: 1,
};

describe('createOffersObject', () => {
    it('should return offers object successfully when ranked offers are passed', () => {
        const rankdedOffers = [ offer1, offer2 ];

        const offers = createOffersObject(rankdedOffers);

        // console.log("mocha offers: ", offers['0']);
        // console.log("offers keys", Object.keys(offers).length)
        // console.log("polNum length", offers['0'].policyNumbers.length);

        expect(Object.keys(offers).length).to.equal(2);
        expect(offers['0'].policyNumbers.length).to.equal(2);
        expect(offers['0'].type).to.equal(offer1.type);
        expect(offers['0'].policyNumbers[0]).to.equal(offer1.policyNumbers[0]);
        expect(offers['0'].policyNumbers[1]).to.equal(offer1.policyNumbers[1]);
        expect(offers['0'].shortMessage).to.equal(offer1.message.shortMessage);
        expect(offers['0'].longMessage).to.equal(offer1.message.longMessage);
        expect(offers['0'].offerQuality).to.equal(offer1.offerQuality);
        expect(offers['0'].opportunityId).to.equal(offer1.opportunityId);
        expect(offers['0'].disposition).to.equal(null);
        expect(offers['0'].offerIndex).to.equal(0);

        expect(offers['1'].policyNumbers.length).to.equal(1);
        expect(offers['1'].type).to.equal(offer2.type);
        expect(offers['1'].policyNumbers[0]).to.equal(offer2.policyNumbers[0]);
        expect(offers['1'].shortMessage).to.equal(offer2.message.shortMessage);
        expect(offers['1'].longMessage).to.equal(offer2.message.longMessage);
        expect(offers['1'].offerQuality).to.equal("Average");
        expect(offers['1'].opportunityId).to.equal(offer2.opportunityId);
        expect(offers['1'].disposition).to.equal(null);
        expect(offers['1'].offerIndex).to.equal(1);
    });
});

describe('offersReducer', () => {
    it('should return initial state on default action', () => {
        const sampleAction = {
            type: 'test-type',
        };
        const result = offersReducer(undefined, sampleAction);

        expect(Object.keys(result.offers).length).to.equal(0);
        expect(result.isCancelCall).to.equal(false);
        expect(result.offers.constructor).to.equal(Array);
    });

    it('should return state with offers on LOAD_OFFERS action', () => {
        const rankedOffers = [ offer1, offer2 ];
        const sampleAction = {
            type: offersActions.LOAD_OFFERS,
            rankedOffers,
        };
        const result = offersReducer(undefined, sampleAction);

        expect(Object.keys(result.offers).length).to.equal(2);
        expect(result.offers['0'].policyNumbers.length).to.equal(2);
        expect(result.offers['0'].type).to.equal(offer1.type);
        expect(result.offers['0'].policyNumbers[0]).to.equal(offer1.policyNumbers[0]);
        expect(result.offers['0'].policyNumbers[1]).to.equal(offer1.policyNumbers[1]);
        expect(result.offers['0'].shortMessage).to.equal(offer1.message.shortMessage);
        expect(result.offers['0'].longMessage).to.equal(offer1.message.longMessage);
        expect(result.offers['0'].offerQuality).to.equal(offer1.offerQuality);
        expect(result.offers['0'].opportunityId).to.equal(offer1.opportunityId);
        expect(result.offers['0'].disposition).to.equal(null);
        expect(result.offers['0'].offerIndex).to.equal(0);

        expect(result.offers['1'].policyNumbers.length).to.equal(1);
        expect(result.offers['1'].type).to.equal(offer2.type);
        expect(result.offers['1'].policyNumbers[0]).to.equal(offer2.policyNumbers[0]);
        expect(result.offers['1'].shortMessage).to.equal(offer2.message.shortMessage);
        expect(result.offers['1'].longMessage).to.equal(offer2.message.longMessage);
        expect(result.offers['1'].offerQuality).to.equal("Average");
        expect(result.offers['1'].opportunityId).to.equal(offer2.opportunityId);
        expect(result.offers['1'].disposition).to.equal(null);
        expect(result.offers['1'].offerIndex).to.equal(1);
    });

    it('should return state with offers that have updated dispositions on DISPOSITION_OFFER action', () => {
        const rankedOffers = [ offer1, offer2 ];
        const sampleAction = {
            type: offersActions.LOAD_OFFERS,
            rankedOffers,
        };
        const offers = offersReducer(undefined, sampleAction);

        const offerDisposition1 = { offerIndex: 0, disposition: "Accepted" };
        const offerDisposition2 = { offerIndex: 1, disposition: "Declined" };

        const dispositionAction1 = {
            type: offersActions.DISPOSITION_OFFER,
            offerDisposition: offerDisposition1,
        };

        const dispositionAction2 = {
            type: offersActions.DISPOSITION_OFFER,
            offerDisposition: offerDisposition2,
        };
        
        let result = offersReducer(offers, dispositionAction1);
        result = offersReducer(result, dispositionAction2);

        //console.log("updatedOffers: ", result)

        expect(Object.keys(result.offers).length).to.equal(2);
        expect(result.offers['0'].policyNumbers.length).to.equal(2);
        expect(result.offers['0'].type).to.equal(offer1.type);
        expect(result.offers['0'].policyNumbers[0]).to.equal(offer1.policyNumbers[0]);
        expect(result.offers['0'].policyNumbers[1]).to.equal(offer1.policyNumbers[1]);
        expect(result.offers['0'].shortMessage).to.equal(offer1.message.shortMessage);
        expect(result.offers['0'].longMessage).to.equal(offer1.message.longMessage);
        expect(result.offers['0'].offerQuality).to.equal(offer1.offerQuality);
        expect(result.offers['0'].opportunityId).to.equal(offer1.opportunityId);
        expect(result.offers['0'].disposition).to.equal("Accepted");
        expect(result.offers['0'].offerIndex).to.equal(0);

        expect(result.offers['1'].policyNumbers.length).to.equal(1);
        expect(result.offers['1'].type).to.equal(offer2.type);
        expect(result.offers['1'].policyNumbers[0]).to.equal(offer2.policyNumbers[0]);
        expect(result.offers['1'].shortMessage).to.equal(offer2.message.shortMessage);
        expect(result.offers['1'].longMessage).to.equal(offer2.message.longMessage);
        expect(result.offers['1'].offerQuality).to.equal("Average");
        expect(result.offers['1'].opportunityId).to.equal(offer2.opportunityId);
        expect(result.offers['1'].disposition).to.equal("Declined");
        expect(result.offers['1'].offerIndex).to.equal(1);
    });

    it('should return state with the saved status of dispositions on SAVE_DISPOSITION action', () => {
        const dispositionSaved = true;
        const sampleAction = {
            type: offersActions.SAVE_DISPOSITION,
            dispositionSaved,
        };
        const result = offersReducer(undefined, sampleAction);

        expect(result.dispositionSaved).to.equal(true);
    });

    it('should return state with the toggle of active offer type on TOGGLE_ACTIVE_OFFER_TYPE action', () => {
        const activeOfferType = "Up_Sell";
        const sampleAction = {
            type: offersActions.TOGGLE_ACTIVE_OFFER_TYPE,
            activeOfferType,
        };
        const result = offersReducer(undefined, sampleAction);

        expect(result.activeOfferType).to.equal("Up_Sell");
    }); 

    it('should return state with the session reference Id type on SET_SESSION_REFERENCE_ID action', () => {
        const sessionReferenceId = "testSessionReferenceId";
        const sampleAction = {
            type: offersActions.SET_SESSION_REFERENCE_ID,
            sessionReferenceId,
        };
        const result = offersReducer(undefined, sampleAction);

        expect(result.sessionReferenceId).to.equal("testSessionReferenceId");
    }); 
});
