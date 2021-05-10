import { getAuth } from "../utils/ServiceProxy";
import { isProd, isTestMode, getParams } from  "../utils/Environment";
import { ignoreCaseCompare } from "../utils/StringUtils";
import { config } from "../utils/Config";
import { errorTypes, ldapNames } from "../utils/Constants";
import store from "../store/store";


export default function checkAuth() {
	console.log('Checking authentication - ' + config.appName);

	return new Promise((resolve, reject) => {
		let userInfo = {
			name: null,
			userId: null,
			groups: null,
			effectiveGroup: null,
			accessLevel: null
		};

		if (!isProd() && isTestMode()) {
			const userId = getParams().userId;
			console.log("userId: ", userId);

			switch(userId) {
				case "N0000000":
					userInfo = {
						name: null,
						userId: 'N0000000',
						groups: null,
					};
					break;			
				case "N0000001":
					userInfo = {
						name: 'LDAP_UNLICENSED_PILOT_USER',
						userId: 'N0000001',
						groups: [ ldapNames.PILOT, ldapNames.UNLICENSED ],
					};
					break;
				case "N0000002":
					userInfo = {
						name: 'LDAP_SYSTEMS_USER',
						userId: 'N0000002',
						groups: [ ldapNames.SYSTEMS ],
					};
					break;					
				case "N0000003":
					userInfo = {
						name: 'LDAP_ADVANCED_PILOT_USER',
						userId: 'N0000003',
						groups: [ ldapNames.PILOT, ldapNames.ADVANCED ],
					};
					break;
				case "N0000004":
					userInfo = {
						name: 'LDAP_PRIMARY_PILOT_USER',
						userId: 'N0000004',
						groups: [ ldapNames.PILOT, ldapNames.PRIMARY ],
					};
					break;	
				case "N0000005":
					userInfo = {
						name: 'LDAP_ADVANCED_AND_PRIMARY_USER',
						userId: 'N0000005',
						groups: [ ldapNames.ADVANCED, ldapNames.PRIMARY ],
					};
					break;
				case "N0000006":
					userInfo = {
						name: 'LDAP_RETENTION_USER',
						userId: 'N0000006',
						groups: [ ldapNames.PILOT, ldapNames.RETENTION ],
					};
					break;					
				case "N0000007":
					userInfo = {
						name: 'LDAP_UNLICENSED_AND_ADVANCED_USER',
						userId: 'N0000007',
						groups: [ ldapNames.UNLICENSED, ldapNames.ADVANCED ],
					};
					break;
				case "N0000008":
					userInfo = {
						name: 'LDAP_ADVANCED_PLUS_USER',
						userId: 'N0000008',
						groups: [ ldapNames.PILOT, ldapNames.ADVANCED_PLUS ],
					};
					break;
				case "N0000009":
					userInfo = {
						name: 'LDAP_RETENTION_AND_SYSTEMS_USER',
						userId: 'N0000009',
						groups: [ ldapNames.SYSTEMS, ldapNames.RETENTION ],
					};
					break;				
				case "N0000010":
					userInfo = {
						name: 'LDAP_ADVANCED_AND_RETENTION_USER',
						userId: 'N0000010',
						groups: [ ldapNames.ADVANCED, ldapNames.RETENTION ],
					};
					break;
				case "N0000012":
					userInfo = {
						name: 'LDAP_UNLICENSED_USER',
						userId: 'N0000012',
						groups: [ ldapNames.UNLICENSED ],
					};
					break;
				case "N0000013":
					userInfo = {
						name: 'LDAP_ADVANCED_USER',
						userId: 'N0000013',
						groups: [ ldapNames.ADVANCED ],
					};
					break;
				case "N0000014":
					userInfo = {
						name: 'LDAP_PRIMARY_USER',
						userId: 'N0000014',
						groups: [ ldapNames.PRIMARY ],
					};
					break;									
				case "N0000015":
					userInfo = {
						name: 'LDAP_GOLD_UNLICENSED_USER',
						userId: 'N0000015',
						groups: [ ldapNames.GOLD_UNLICENSED ],
					};
					break;
				case "N0000016":
					userInfo = {
						name: 'LDAP_GOLD_ASSOCIATE_USER',
						userId: 'N0000016',
						groups: [ ldapNames.GOLD_ASSOCIATE ],
					};
					break;
				case "N0000017":
					userInfo = {
						name: 'LDAP_GOLD_MIDLEVEL_USER',
						userId: 'N0000017',
						groups: [ ldapNames.GOLD_MIDLEVEL ],
					};
					break;				
				case "N0000018":
					userInfo = {
						name: 'LDAP_GOLD_SENIOR_USER',
						userId: 'N0000018',
						groups: [ ldapNames.GOLD_SENIOR ],
					};
					break;
				default:
					userInfo = {
						name: 'LDAP_ADVANCED_PILOT_USER',
						userId: 'default',
						groups: [ ldapNames.PILOT, ldapNames.ADVANCED ],
					};						
			}
			
			authorizeAccess(userInfo);
	
			if (userInfo.effectiveGroup)
				resolve(userInfo);
			else {
				const error = { type: errorTypes.AUTHENTICATION, userInfo }
				reject(error);
			}
		} else {
			getAuth()
			.then(userProfile => {
				console.log(config.appName, userProfile);

				if(userProfile && userProfile.data)
				{
					var userGroups = [];
					
					if(typeof userProfile.data.groups === 'string') {
						userGroups = [userProfile.data.groups.split(',')[0].substr(3)];
					}
					else if (userProfile.data.groups) {
							userGroups = userProfile.data.groups.map(group => {
							return group.split(',')[0].substr(3);
						});
					}

					userInfo.groups = userGroups;
					userInfo.userId = userProfile.data.id;
					userInfo.name = userProfile.data.full_name;			
				}

				authorizeAccess(userInfo);
	
				if (userInfo.effectiveGroup)
					resolve(userInfo);
				else {
					const error = { type: errorTypes.AUTHENTICATION, userInfo };
					reject(error);
				}
			})
			.catch(err => {				
				const error = { type: errorTypes.AUTHENTICATION, userInfo, err };
				reject(error);
			});
		}
		
	})
}

function authorizeAccess(userInfo) {
	const brand = store.getState().app.brand;

	if (userInfo && userInfo.groups) {
		userInfo.groups.forEach(group => {
			if (ignoreCaseCompare(ldapNames.PILOT, group)) {
				userInfo.isPilot = true;
			} else {
				Object.keys(config.ldapGroups).some(key => {
					const allowedGroup = config.ldapGroups[key];

					if ((!allowedGroup.brand || allowedGroup.brand === brand) && ignoreCaseCompare(allowedGroup.name, group)) {
						if(userInfo.effectiveGroup && userInfo.accessLevel) {
							if (allowedGroup.accessLevel < userInfo.accessLevel) {
								userInfo.effectiveGroup = allowedGroup.name;
								userInfo.accessLevel = allowedGroup.accessLevel;
							}
						} else {									
							userInfo.effectiveGroup = allowedGroup.name;
							userInfo.accessLevel = allowedGroup.accessLevel;
                        }
                        return true;
					}
				})
			}
		});
	}
				
	console.log(config.appName, userInfo, config.ldapGroups);
}