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
	let serverName =ns.read("servername.txt");

	ns.tprint("Processing begining for server:" + serverName);
	
	while (true) {
		while (isWeakenMaxed(ns, serverName)) {
			await ns.asleep(500);
		}

		await weakenServer(serverName, ns);
	}
}