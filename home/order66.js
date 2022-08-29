/** @param {NS} ns */
function getAllServers(ns, current="home", set=new Set()) {
    let connections = ns.scan(current)
    let next = connections.filter(c => !set.has(c))
    next.forEach(n => {
        set.add(n);
        return getAllServers(ns, n, set)
    })
    return Array.from(set.keys())
}

/** @param {NS} ns */
function openPorts(ns, serverName) {
	let count = 0;

	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(serverName);
		count++;
	}

	if (ns.fileExists("FTPCrack.exe", "home")) {
		ns.ftpcrack(serverName);
		count++;
	}

	if (ns.fileExists("relaySMTP.exe", "home")) {
		ns.relaysmtp(serverName);
		count++;
	}

	if (ns.fileExists("HTTPWorm.exe", "home")) {
		ns.httpworm(serverName);
		count++;
	}

	if (ns.fileExists("SQLInject.exe", "home")) {
		ns.sqlinject(serverName);
		count++;
	}

	return count;
}

/** @param {NS} ns */
async function validateServerRooted(ns, serverName) {

	if (ns.hasRootAccess(serverName)) {
		return true;
	}

	let hackChance = ns.hackAnalyzeChance(serverName);

	if(hackChance == 0) {
		//If we cannot hack, we cannot get root.
		return false;
	}

	let numOfPorts = ns.getServerNumPortsRequired(serverName);

	if (numOfPorts > 0 ) {
		let count = openPorts(ns, serverName);

		if(count < numOfPorts) {
			return false;
		}
	}

	ns.nuke(serverName);

	if(ns.hasRootAccess(serverName)) {
		return true;
	}

	return false;
}

/** @param {NS} ns */
async function findTheJedi(ns, knownRooted, allServers) {
	for (const server of allServers) {
		if(server.startsWith("home")) {
			continue;
		}

		if (knownRooted.has(server)) {
			continue;
		}

		if(await validateServerRooted(ns, server)) {
			ns.tprint("Found rooted server: " + server);
			knownRooted.add(server);
		}
	}

	return knownRooted;
}

/** @param {NS} ns */
export async function main(ns) {
	let data = ns.read("rootedservers.txt");
	let splitData = data.split("\n");

	let rootedServers = new Set();

	for (const serverName of splitData) {
		if(!serverName || serverName.length == 0) {
			continue;
		}

		rootedServers.add(serverName);
	}

	let allServersArray = getAllServers(ns);

	let updatedRooted = await findTheJedi(ns, rootedServers, allServersArray);

	if (rootedServers.size > updatedRooted.size) {
		ns.tprint("order66 error with getting updated root. Check it out.");
	} else {
		let text = Array.from(updatedRooted).join('\n');
		await ns.write("rootedservers.txt", text, "w");
	}

	ns.spawn("identifysetupservers.js");
}