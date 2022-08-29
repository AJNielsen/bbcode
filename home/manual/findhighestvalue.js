/** @param {NS} ns */
function getAllServers(ns, current = "home", set = new Set()) {
	let connections = ns.scan(current)
	let next = connections.filter(c => !set.has(c))
	next.forEach(n => {
		set.add(n);
		return getAllServers(ns, n, set)
	})
	return Array.from(set.keys())
}

function findHighestValueServer(ns, serverList) {
	
	let tempList = [];

	for (const server of serverList) {
		if (server.startsWith("home")) {
			continue;
		}

		let maxMoney = ns.getServerMaxMoney(server);
		if (maxMoney == 0) {
			continue;
		}
		
		if (!ns.hasRootAccess(server)) {
			continue;
		}

		let hackLevel = ns.getServerRequiredHackingLevel(server);
		let playerHackingLevel = ns.getHackingLevel();

		if (playerHackingLevel < hackLevel) {
			continue;
		}

		tempList.push(server);
	}

	serverList = tempList;
	
	serverList.sort(function compareElements(first, second) {
		let firstMax = ns.getServerMaxMoney(first);
		let secondMax = ns.getServerMaxMoney(second);

		if (firstMax > secondMax) {
			return -1;
		}
		else if (secondMax > firstMax) {
			return 1;
		}

		return 0;
	});

	//ns.tprint(serverList);
	//ns.print(serverList);


	for (const server of serverList) {
		let message = "Server[" + server + "] | Max Money[" + ns.getServerMaxMoney(server) + "]";
		ns.tprint(message);
		ns.print(message);
	}







	// let serverMaxMoney = 0;
	// let currentServer = "";
	// let topServerList = [];

	// for (const server of serverList) {

	// 	if(!ns.hasRootAccess(server)) {
	// 		continue;
	// 	}

	// 	let hackChance = ns.hackAnalyzeChance(server);

	// 	if (hackChance < 0.55) {
	// 		ns.print("Hack chance for server[" + hackChance + "] too low.");
	// 		continue;
	// 	}

	// 	let max = ns.getServerMaxMoney(server);
	// 	let available = ns.getServerMoneyAvailable(server);

	// 	if (available / max < 0.9 && max > serverMaxMoney) {
	// 		serverMaxMoney = max;
	// 		currentServer = server;
	// 		topServerList.unshift(server);
	// 	}
	// }

	// ns.print("Current max money is: " + currentServer + ". | Money Possible: " + serverMaxMoney);
	// ns.tprint("Current max money is: " + currentServer + ". | Money Possible: " + serverMaxMoney);
	// ns.tprint("Top Servers: " + topServerList);
}

/** @param {NS} ns */
export async function main(ns) {
	let listOfServers = getAllServers(ns);
	findHighestValueServer(ns, listOfServers);
}