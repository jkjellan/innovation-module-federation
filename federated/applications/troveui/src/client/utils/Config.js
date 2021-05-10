import { ldapNames, troveClients, dispositionValues, errorTypes, offerTypes, brandNames, messageTypes } from "./Constants";

export const config = {
    appName: "trove-ui",
    dispositionTimeout: 4500000,
    enablePopForNewOffers: true,
    maxQualifyingPolicies: 3,
    url: {
        sell: {
            production: "http://sell.libertyec.com/PiSellClient/#/",
            test: "http://ete-sell.libertyec.com/PiSellClient/#/",
            local: "http://ete-sell.libertyec.com/PiSellClient/#/"
        },
    },
    ldapGroups:	{
		unlicensed: { name: ldapNames.UNLICENSED, accessLevel: 2, brand: brandNames.LIBERTY },
		thirdPartyAuto: { name: ldapNames.THIRD_PARTY_AUTO, accessLevel: 3, brand: brandNames.LIBERTY },
		primary: { name: ldapNames.PRIMARY, accessLevel: 4, brand: brandNames.LIBERTY },
		expanded: { name: ldapNames.EXPANDED, accessLevel: 5, brand: brandNames.LIBERTY },
		expandedPlus: { name: ldapNames.EXPANDED_PLUS, accessLevel: 6, brand: brandNames.LIBERTY },
		advanced: { name: ldapNames.ADVANCED, accessLevel: 7, brand: brandNames.LIBERTY },
		advancedPlus: { name: ldapNames.ADVANCED_PLUS, accessLevel: 8, brand: brandNames.LIBERTY },
		retention: { name: ldapNames.RETENTION, accessLevel: 9, brand: brandNames.LIBERTY },
		goldUnlicensed: { name: ldapNames.GOLD_UNLICENSED, accessLevel: 10, brand: brandNames.SAFECO },
		goldAssociate: { name: ldapNames.GOLD_ASSOCIATE, accessLevel: 11, brand: brandNames.SAFECO },
		goldMidlevel: { name: ldapNames.GOLD_MIDLEVEL, accessLevel: 12, brand: brandNames.SAFECO },
        goldSenior: { name: ldapNames.GOLD_SENIOR, accessLevel: 13, brand: brandNames.SAFECO },        
		admin: { name: ldapNames.ADMIN, accessLevel: 14 },
		systems: { name: ldapNames.SYSTEMS, accessLevel: 15 }
    },
    troveClientMapping : {
        [brandNames.LIBERTY]: {
            [ldapNames.UNLICENSED]: troveClients.UNLICENSED,
            [ldapNames.THIRD_PARTY_AUTO]: troveClients.SERVICE_CALL,
            [ldapNames.PRIMARY]: troveClients.SERVICE_CALL,
            [ldapNames.EXPANDED]: troveClients.SERVICE_CALL,
            [ldapNames.EXPANDED_PLUS]: troveClients.SERVICE_CALL,
            [ldapNames.ADVANCED]: troveClients.SERVICE_CALL_HOME,
            [ldapNames.ADVANCED_PLUS]: troveClients.SERVICE_CALL_HOME,
            [ldapNames.RETENTION]: null,
            [ldapNames.GOLD_UNLICENSED]: null,
            [ldapNames.GOLD_ASSOCIATE]: null,
            [ldapNames.GOLD_MIDLEVEL]: null,
            [ldapNames.GOLD_SENIOR]: null,
            [ldapNames.ADMIN]: troveClients.SYSTEM_TEST_CALL,
            [ldapNames.SYSTEMS]: troveClients.SYSTEM_TEST_CALL
        },
        [brandNames.SAFECO]: {
            [ldapNames.UNLICENSED]: null,
            [ldapNames.THIRD_PARTY_AUTO]: null,
            [ldapNames.PRIMARY]: null,
            [ldapNames.EXPANDED]: null,
            [ldapNames.EXPANDED_PLUS]: null,
            [ldapNames.ADVANCED]: null,
            [ldapNames.ADVANCED_PLUS]: null,
            [ldapNames.RETENTION]: null,
            [ldapNames.GOLD_UNLICENSED]: troveClients.GOLD_UNLICENSED,
            [ldapNames.GOLD_ASSOCIATE]: troveClients.GOLD,
            [ldapNames.GOLD_MIDLEVEL]: troveClients.GOLD,
            [ldapNames.GOLD_SENIOR]: troveClients.GOLD,
            [ldapNames.ADMIN]: troveClients.GOLD,
            [ldapNames.SYSTEMS]: troveClients.GOLD
        },        
    },
    dispositionId : {
        [dispositionValues.ACCEPTED]: 1,
        [dispositionValues.DECLINED]: 2,
        [dispositionValues.INTERESTED]: 3,
        [dispositionValues.DISPLAYED]: 8,
        [dispositionValues.LEAD_CREATED]: 9,
        [dispositionValues.CALL_NOT_APPLICABLE]: 10,
        [dispositionValues.UPSELLS_NOT_APPLICABLE]: 11
    },
    errorMessages: {
        [errorTypes.NO_HOUSEHOLD_OR_POLICY]: {
            alert: "Unable to complete this request",
            message: "No household or policy found. Please access one to receive guidance."
        },
        [errorTypes.KICKOUT_RULE]: {
            alert: "Unable to complete this request",
            message: ""
        }
    },
    dispositionButton: {
        [offerTypes.XSELL]: [
            {dispositionValue: dispositionValues.LEAD_CREATED, dispositionText: "Create lead"},
            {dispositionValue: dispositionValues.DECLINED, dispositionText: "Decline"}
        ],
        [offerTypes.UPSELL]: [
            {dispositionValue: dispositionValues.ACCEPTED, dispositionText: "Accept"},
            {dispositionValue: dispositionValues.INTERESTED, dispositionText: "Interested"},
            {dispositionValue: dispositionValues.DECLINED, dispositionText: "Decline"}
        ]
    },
    troveOffersRoutes: {
        [brandNames.LIBERTY]: "interact",
        [brandNames.SAFECO]: "offers",
    },
};
