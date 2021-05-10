import { expect } from 'chai';
import * as appActions from '../appActions';

describe('appActions', () => { 
    describe('setLoading', () => {
        it(`should dispatch ${appActions.SET_LOADING} successfully when setLoading is called`, () => {
            const dispatchObj = appActions.setLoading(true);

            expect(dispatchObj.type).to.equal(appActions.SET_LOADING);
            expect(dispatchObj.isLoading).to.equal(true);
        });
    });
     
    describe('createSession', () => {
        it(`should dispatch ${appActions.CREATE_SESSION} successfully when createSession is called`, () => {
            const dispatchObj = appActions.createSession();

            expect(dispatchObj.type).to.equal(appActions.CREATE_SESSION);
        });
    });  
});
