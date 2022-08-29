async function weakenServer(serverName, ns, serverMaxMemory) {
	do {
		if(serverMaxMemory != ns.getServerMaxRam("home")) {
			ns.exit();
			return;
		}
		await ns.weaken(serverName);
	} while (!isWeakenMaxed(ns, serverName));
}

function isWeakenMaxed(ns, serverName) {
	let minimumSecurityLevel = ns.getServerMinSecurityLevel(serverName);
	let currentSecurityLevel = ns.getServerSecurityLevel(serverName);

	return minimumSecurityLevel == currentSecurityLevel;
}

function getNextServer(ns) {
	let primedServers = ns.read("automate_primedservers.txt");
	if (primedServers == "") {
		primedServers = JSON.parse("[]");
	} else {
		primedServers = JSON.parse(primedServers);
	}

	let topTwenetyFiveServers = ns.read("automate_twentyfive.txt");
	if (topTwenetyFiveServers == "") {
		ns.print("Top twenty five servers is empty. Nothing to do.");
		return;
	} else {
		topTwenetyFiveServers = JSON.parse(topTwenetyFiveServers);
	}

	let serversToPrime = JSON.parse("[]");

	for (const server of topTwenetyFiveServers) {
		if (primedServers.includes(server)) {
			continue;
		}

		serversToPrime.push(server);
	}

	if (serversToPrime.length == 0) {
		return null;
	}

	return serversToPrime.shift();
}

export async function main(ns) {

	let serverMaxMemory = ns.getServerMaxRam("home");

	while (true) {
		await ns.asleep(500);
		let nextServer = getNextServer(ns);

		if (nextServer == null) {
			ns.print("No servers to prime. Goodbye!");
			ns.exit();
			return;
		}

		if(serverMaxMemory != ns.getServerMaxRam("home")) {
			ns.exit();
			return;
		}

		ns.print("Processing begining for server:" + nextServer);
		await weakenServer(nextServer, ns, serverMaxMemory);
	}
}