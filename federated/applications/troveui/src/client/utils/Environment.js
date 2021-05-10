import queryString from "query-string";
import { config } from "./Config";

let environment = "test";

const prodOrigin = new RegExp(/trove-ui\.lmig\.com|trove-ui-v0-production\.prod\.uscm\.libertyec\.com/, "i");
const localOrigin = new RegExp(/localhost/);
const origin = (window && window.location && window.location.origin) ? window.location.origin : null;

if (prodOrigin.test(origin)) {
	environment = "production";
} else if (localOrigin.test(origin)) {
	environment = "local";
}

console.log("environment", environment);

export function getParams(params = window.location.search) {
	return queryString.parse(params);
}

export function isTestMode() {
	const params = queryString.parse(window.location.search);
    return params.testMode === "true";
}

export function isProd() {
    return environment === "production";
}

export function sellUrl() {    
    return config.url.sell[environment];
}