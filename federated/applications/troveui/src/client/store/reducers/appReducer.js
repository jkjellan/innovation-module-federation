import { 
    SET_USER,
    SET_LOADING,
    SET_PARAMS,
    SET_BRAND,
    SET_POLICY_NUMBERS,
    SET_POLICIES,
    CREATE_SESSION,
} from '../../actions/appActions';

import { getParams } from "../../utils/Environment";
import { v1 as uuidV1 } from "uuid";

const initialState = {
    isLoading: true,
    policyNumbers: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SESSION:
            const session = {
                sessionId: uuidV1(),
            };
            return {
                ...state,
                session: session,
            };
        case SET_PARAMS:
            return {
                ...state,
                params: getParams(),
            };
        case SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        case SET_BRAND:
            return {
                ...state,
                brand: action.brand,
            };
        case SET_POLICY_NUMBERS:
            return {
                ...state,
                policyNumbers: action.policyNumbers, 
            };
        case SET_POLICIES:
            return {
                ...state,
                policies: action.policies, 
            };
        default:
            return { ...state };
    }
};

export default appReducer;
