export function cleanParamString(val) {
	if(val && val != "null")
		return val;
		
	return null;
}

export function ignoreCaseCompare(str1, str2) {
	if (str1 && str2)
		return str1.toUpperCase() === str2.toUpperCase();

	return false;
}

export function ignoreCaseIncludes(arr, str) {
	if (arr && Array.isArray(arr) && str) {
		const upperCaseArray = JSON.parse(JSON.stringify(arr).toUpperCase());
		return upperCaseArray.includes(str.toUpperCase());
	}
		
	return false;
}

export function formatPolicyNumber(policyNumber) {
	if (policyNumber && policyNumber.length == 14 ) {
		return policyNumber.substring(0,3)
			+ "-" + policyNumber.substring(3, 6)
			+ "-" + policyNumber.substring(6, 12)
			+ "-" + policyNumber.substring(12, 14);
	} else {
		return policyNumber;
	}
}

export function formatAgencyRemarks(agencyRemarks) {
	if (!agencyRemarks || /^(\s|<br>|<p>|&nbsp;)*$/.test(agencyRemarks)) {
		return "";
	} else {
		let formattedAgencyRemarks = agencyRemarks.replace(/(<br>)?[\r\n]+|[\r\n]+(<br>)?/ig, "<br>");
		formattedAgencyRemarks = formattedAgencyRemarks.replace(/^(\s|<br>|<p>|&nbsp;)*|(\s|<br>|<p>|&nbsp;)*$/ig, "");
		formattedAgencyRemarks = formattedAgencyRemarks.replace(/\s*<br>\s*(<br>\s*)+/ig, "|");
		formattedAgencyRemarks = formattedAgencyRemarks.replace(/<br>/ig, "\n");
		return formattedAgencyRemarks;
	}
}

