/** @param {NS} ns */
export async function main(ns) {
	let serverMaxRam = ns.getServerMaxRam("home");

	while(serverMaxRam == ns.getServerMaxRam("home")) {
		await ns.share();
	}
}