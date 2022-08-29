function getAllServers(ns, current = "home", set = new Set()) {
	let connections = ns.scan(current)
	let next = connections.filter(c => {
		if(!set.has(c) && !c.startsWith("home")) {
			return true;
		}
		return false;
	})
	next.forEach(n => {
		set.add(n);
		return getAllServers(ns, n, set)
	})
	return Array.from(set.keys())
}

function getFirst25(ns, serverList){
	if (serverList.length <= 25) {
		ns.print("Found less than or equal to 25 servers. Returning all.");
		return serverList;
	}

	let twentyFive = [];

	for(let i = 0; i < 25; ++i) {
		ns.print("Adding Server[" + serverList[i] + "] to server list.");
		twentyFive.push(serverList[i]);
	}

	return twentyFive;
}

/** @param {NS} ns */
async function findHighestValueServer(ns, serverList) {
	
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

	ns.print("Possible server list for top 25!" + tempList);

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

	serverList = getFirst25(ns, serverList);

	serverList = serverList.reverse();

	let writeData = JSON.stringify(serverList);

	await ns.write("automate_twentyfive.txt", writeData, "w");
}

/** @param {NS} ns */
export async function main(ns) {
	let listOfServers = getAllServers(ns);
	await findHighestValueServer(ns, listOfServers);

	ns.spawn("automate/discovercurrenthomes.js");
}