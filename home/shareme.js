/** @param {NS} ns */
export async function main(ns) {
	let servername = ns.read("servername.txt");
	let serverMaxRam = ns.getServerMaxRam(servername);

	while(serverMaxRam == ns.getServerMaxRam(servername)) {
		await ns.share();
	}
}