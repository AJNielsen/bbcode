/** @param {NS} ns */
async function copyUpdatedFiles(ns, serverName) {
	if (ns.fileExists("hack.js", serverName)) {
		await ns.scp("hack.js", serverName);
	}

	if (ns.fileExists("grow.js", serverName)) {
		await ns.scp("grow.js", serverName);
	}

	if (ns.fileExists("weaken.js", serverName)) {
		await ns.scp("weaken.js", serverName);
	}

	if (ns.fileExists("hackthresholds.txt", serverName)) {
		await ns.scp("hackthresholds.txt", serverName);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let fileData = ns.read("rootedservers.txt");
	let rootedServers = fileData.split("\n");

	rootedServers.push("home1");
	rootedServers.push("home2");
	rootedServers.push("home3");
	rootedServers.push("home4");
	rootedServers.push("home5");
	rootedServers.push("home6");
	rootedServers.push("home7");
	rootedServers.push("home8");
	rootedServers.push("home9");
	rootedServers.push("home10");

	for (const server of rootedServers) {
		await copyUpdatedFiles(ns, server);
	}


}