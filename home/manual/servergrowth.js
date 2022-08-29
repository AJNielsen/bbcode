/** @param {NS} ns */
export async function main(ns) {
	let serverName = ns.args[0];

	let serverGrowth = ns.getServerGrowth(serverName);

	ns.tprint(serverGrowth);
}