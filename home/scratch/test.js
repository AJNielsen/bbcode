/** @param {NS} ns */
export async function main(ns) {
	// ns.tprint(ns.getPurchasedServerCost(8));
	// ns.tprint(ns.getPurchasedServerCost(16));
	// ns.tprint(ns.getPurchasedServerCost(32));

	let result = ns.fileExists("BruteSSH.exe");
	ns.tprint(result);
}