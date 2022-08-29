/** @param {NS} ns */
export async function main(ns) {
	let a = ns.getRunningScript("fakescript.js");
	ns.tprint(a == null);
}