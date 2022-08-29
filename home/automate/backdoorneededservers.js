function findServer(ns, serverName, current = "home", set = new Set(), path = []) {
	//ns.tprint(current);
	if (serverName == current) {
		path.unshift(serverName);
		return path;
	}

	let connections = ns.scan(current)
	let next = connections.filter(c => {
		if (!set.has(c) && !c.startsWith("home")) {
			return true;
		}

		return false;

	})

	let found = false;
	let chain = [];

	next.forEach(n => {
		if (found) {
			return [];
		}

		set.add(n);
		let result = findServer(ns, serverName, n, set)
		if (result.length > 0) {
			found = true;
			chain = result;
		}

		return result;
	})

	if (found && !current.startsWith("home")) {
		chain.unshift(current);
	}

	return chain;
}

/** @param {NS} ns */
export async function main(ns) {
	let servers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];

	for (let i = 0; i < servers.length; ++i) {
		let serverName = servers[i];

		let serverDetails = ns.getServer(serverName);

		if (serverDetails.backdoorInstalled) {
			continue;
		}

		if (!serverDetails.hasAdminRights) {
			//Rooting is handled by another script. If we don't have admin just go away.
			continue;
		}

		if (serverDetails.requiredHackingSkill > ns.getHackingLevel()) {
			//Hacking level is to low!
			continue;
		}

		let chain = findServer(ns, serverName);

		if (chain.length == 0) {
			ns.tprint("Found 0 length chain for server: " + serverName);
			continue;
		}

		if (!ns.singularity.connect("home")) {
			ns.print("Issue connecting to home. Not attempting to install backdoor!");
			ns.tprint("Issue connecting to home. Not attempting to install backdoor!");
			continue;
		}
		for (let j = 0; j < chain.length; ++j) {
			if (!ns.singularity.connect(chain[j])) {
				ns.print("Issue connecting to "+ chain[j] + ". Not attempting to install backdoor!");
				ns.tprint("Issue connecting to "+ chain[j] + ". Not attempting to install backdoor!");
				j = chain.length +1;
				ns.singularity.connect("home");
				continue;
			}
		}

		if(ns.singularity.getCurrentServer() == serverName) {
			await ns.singularity.installBackdoor();
		}
		
		ns.singularity.connect("home");
	}

	ns.spawn("automate/join_factions.js");
}