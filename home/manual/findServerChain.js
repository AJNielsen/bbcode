function getAllServers(ns, target, current="home", set=new Set()) {
	if (current == target) {
		return true;
	}
	
	let connections = ns.scan(current);
	let next = connections.filter(c => !set.has(c));

	for(const server of next) {
		set.add(server);
		if(getAllServers(ns, target, server, set)) {
			let message = "Server in chain[" + server + "]";
			ns.tprint(message);
			ns.print(message);
			return true;
		}
	}

	return false;
}

/** @param {NS} ns */
export async function main(ns) {
	let serverName = ns.args[0];

	if(!ns.serverExists(serverName)) {
		ns.tprint("Server does not exist");
		return;
	}

	getAllServers(ns, serverName);
}