import { expect } from 'chai';

import * as appActions from '../../../actions/appActions';
import appReducer from '../appReducer';


describe('appReducer', () => {
    it('should return state with the page loading status on SET_LOADING action', () => {
        const isLoading = true;
        const sampleAction = {
            type: appActions.SET_LOADING,
            isLoading,
        };
        const result = appReducer(undefined, sampleAction);

        expect(result.isLoading).to.equal(true);
    });

    it('should return state with the session on CREATE_SESSION action', () => {
        const sampleAction = {
            type: appActions.CREATE_SESSION,
        };
        const result = appReducer(undefined, sampleAction);

        expect(result.session).to.have.all.keys("sessionId");
    });
});
