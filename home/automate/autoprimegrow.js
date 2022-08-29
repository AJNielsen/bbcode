async function growServer(serverName, ns, serverMaxMemory) {
	do {
		if (serverMaxMemory != ns.getServerMaxRam("home")) {
			ns.exit();
			return;
		}
		await ns.grow(serverName);
	} while (!isGrowMaxed(ns, serverName));
}

function isGrowMaxed(ns, serverName) {
	let serverMaxMoney = ns.getServerMaxMoney(serverName);
	let serverCurrentMoney = ns.getServerMoneyAvailable(serverName);

	return serverCurrentMoney >= serverMaxMoney;
}

function getPrimedServers(ns) {
	let primedServers = ns.read("automate_primedservers.txt");
	if (primedServers == "") {
		primedServers = JSON.parse("[]");
	} else {
		primedServers = JSON.parse(primedServers);
	}

	return primedServers;
}

async function clearPrimedServers(ns) {
	await ns.write("automate_primedservers.txt", "", "w");
}

function getTopTwentyFiveServers(ns) {
	let topTwenetyFiveServers = ns.read("automate_twentyfive.txt");
	if (topTwenetyFiveServers == "") {
		ns.print("Top twenty five servers is empty. Nothing to do.");
		return [];
	} else {
		topTwenetyFiveServers = JSON.parse(topTwenetyFiveServers);
	}

	return topTwenetyFiveServers;
}

async function primeServers(ns, serversToPrime, serverMaxMemory, primedServers) {
	ns.print("Priming servers.");
	for (const primeServer of serversToPrime) {

		if (serverMaxMemory != ns.getServerMaxRam("home")) {
			ns.exit();
			return;
		}

		ns.print("Processing beginning for server:" + primeServer);
		await growServer(primeServer, ns, serverMaxMemory);
		primedServers.push(primeServer);
		await ns.write("automate_primedservers.txt", JSON.stringify(primedServers), "w");
	}
}

export async function main(ns) {
	let serverMaxMemory = ns.getServerMaxRam("home");

	while (serverMaxMemory == ns.getServerMaxRam("home")) {
		await ns.sleep(100);
		let primedServers = getPrimedServers(ns);
		ns.print("Primed Servers: " + primedServers);

		let topTwenetyFiveServers = getTopTwentyFiveServers(ns);
		ns.print("Top 25 Servers: " + topTwenetyFiveServers);

		let serversToPrime = JSON.parse("[]");

		ns.print("Filtering primed servers.");
		for (const server of topTwenetyFiveServers) {
			if (primedServers.includes(server)) {
				continue;
			}

			serversToPrime.push(server);
		}

		await primeServers(ns, serversToPrime, serverMaxMemory, primedServers);

		await clearPrimedServers(ns);
	}
}