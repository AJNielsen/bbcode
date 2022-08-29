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

	let knownExtensions = [".js", ".lit", ".txt"];

	for (const server of allServers) {
		await ns.asleep(100);
		if (server.startsWith("home")) {
			continue;
		}

		let serverFiles = ns.ls(server);

		for (const file of serverFiles) {
			let known = false;
			for (const extension of knownExtensions) {
				if(file.endsWith(extension)) {
					known = true;
				}
			}

			if(!known) {
				let message = "Server[" + server + "] has file[" + file + "]";
				ns.tprint(message);
				ns.print(message);
			}
		}
	}
}