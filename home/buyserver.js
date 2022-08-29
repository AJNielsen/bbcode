/** @param {NS} ns */
export async function main(ns) {
	let size = ns.args[0];

	if (size % 2 != 0) {
		ns.tprint("Value[" + size +"] is not a multiple of 2.");
		return;
	}
	
	let count = 1;

	let exists = false;
	let serverName = "";
	do {
		serverName = "home" + count++;
		exists = ns.serverExists(serverName);
		await ns.sleep(100);
	} while (exists);

	ns.purchaseServer(serverName, size);
}