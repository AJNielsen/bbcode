/** @param {NS} ns */
export async function main(ns) {
	let result = ns.fileExists("/automate/buy_nfgs.js", "home");
	ns.tprint(result);
}