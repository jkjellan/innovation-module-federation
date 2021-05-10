import { expect } from 'chai';
import * as offersActions from '../offersActions';

describe('offersActions', () => {
    describe('loadOffers', () => {
        it(`should dispatch ${offersActions.LOAD_OFFERS} successfully when loadOffers is called with ranked offers`, () => {
            const rankedOffers = { name: "rankedObjects" };
            const dispatchObj = offersActions.loadOffers(rankedOffers);

            expect(dispatchObj.type).to.equal(offersActions.LOAD_OFFERS);
            expect(dispatchObj.rankedOffers).to.equal(rankedOffers);
        });
    });
    
    describe('dispositionOffer', () => {
        it(`should dispatch ${offersActions.DISPOSITION_OFFER} successfully when dispositionOffer is called with an offer disposition`, () => {
            const offerDisposition = { name: "dispositionedOffer" };
            const dispatchObj = offersActions.dispositionOffer(offerDisposition);

            expect(dispatchObj.type).to.equal(offersActions.DISPOSITION_OFFER);
            expect(dispatchObj.offerDisposition).to.equal(offerDisposition);
        });
    });
    
    describe('saveDisposition', () => {
        it(`should dispatch ${offersActions.SAVE_DISPOSITION} successfully when saveDisposition is called`, () => {
            const dispatchObj = offersActions.saveDisposition();

            expect(dispatchObj.type).to.equal(offersActions.SAVE_DISPOSITION);
            expect(dispatchObj.dispositionSaved).to.equal(true);
        });
    });
    
    describe('toggleActiveOfferType', () => {
        it(`should dispatch ${offersActions.TOGGLE_ACTIVE_OFFER_TYPE} successfully when toggleActiveOfferType is called`, () => {
            const dispatchObj = offersActions.toggleActiveOfferType("upsell");

            expect(dispatchObj.type).to.equal(offersActions.TOGGLE_ACTIVE_OFFER_TYPE);
            expect(dispatchObj.activeOfferType).to.equal("upsell");
        });
    }); 

    describe('setSessionReferenceId', () => {
        it(`should dispatch ${offersActions.SET_SESSION_REFERENCE_ID} successfully when setSessionReferenceId is called`, () => {
            const dispatchObj = offersActions.setSessionReferenceId("testSessionReferenceId");

            expect(dispatchObj.type).to.equal(offersActions.SET_SESSION_REFERENCE_ID);
            expect(dispatchObj.sessionReferenceId).to.equal("testSessionReferenceId");
        });
    });
});
