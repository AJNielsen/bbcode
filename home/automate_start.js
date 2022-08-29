/** @param {NS} ns */
export async function main(ns) {
	await ns.asleep(5000);

	ns.tprint("Welcome to the new you!");
	
	ns.run("wipe.js");
	ns.spawn("automate/setuphomeservers.js");
}