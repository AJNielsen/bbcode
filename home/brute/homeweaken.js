//running on foodnstuff
//https://bitburner-beta.readthedocs.io/en/latest/netscript/netscriptmisc.html#netscript-ports

async function weakenServer(serverName, ns) {
	do {
		await ns.weaken(serverName);
	} while (!isWeakenMaxed(ns, serverName));
}

function isWeakenMaxed(ns, serverName) {
	let minimumSecurityLevel = ns.getServerMinSecurityLevel(serverName);
	let currentSecurityLevel = ns.getServerSecurityLevel(serverName);

	return minimumSecurityLevel == currentSecurityLevel;
}

export async function main(ns) {
	let serverName = ns.args[0];

	ns.tprint("Processing begining for server:" + serverName);
	
	await weakenServer(serverName, ns);

	ns.toast("Brute Weaken Complete!");
}