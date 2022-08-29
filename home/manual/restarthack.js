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
export async function main(ns) {
	let allServers = getAllServers(ns);

	let playerHackLevel = ns.getHackingLevel();

	for(const server of allServers) {
		if(server == "home") {
			continue;
		}

		if(!ns.hasRootAccess(server)) {
			continue;
		}

		let serverHackLevel = ns.getServerRequiredHackingLevel(server);

		if (serverHackLevel > playerHackLevel) {
			continue;
		}

		let processList = ns.ps(server);
		for (const proc of processList) {
			if(proc.filename == "hack.js") {
				let hackThreads = proc.threads;
				ns.kill(proc.pid);
				ns.exec("hack.js", server, hackThreads);
			}
		}
	}
}