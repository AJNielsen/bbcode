/** @param {NS} ns */
export async function main(ns) {
	await ns.asleep(5000);
	ns.tprint("Here we go again!");
	ns.spawn("automate_start.js");
}