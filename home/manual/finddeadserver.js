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

	for (const server of allServers) {
		if(server.startsWith("home")) {
			continue;
		}

		let max = ns.getServerMaxMoney(server);
		let current = ns.getServerMoneyAvailable(server);

		if (current == 0 && max > 0) {
			ns.tprint("Server[" + server + "] is missing money.");
		}
	}
}