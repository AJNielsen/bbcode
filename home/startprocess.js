async function findAllConnectedMachines(serverName, scannedServers, ns) {
	if(scannedServers.includes(serverName)) {
		return;
	}
	
	let scanResult = ns.scan(serverName);
	scannedServers.push(serverName);

	for (const element of scanResult) {
		if(!scannedServers.includes(element)) {
			if(ns.hasRootAccess(element)) {
				//ns.exec("firstweakeninvoker.js", "foodnstuff", 1, element);
				ns.exec("hackserverinvoker.js", "sigma-cosmetics", 1, element);
				await findAllConnectedMachines(element, scannedServers, ns);
			}
			else {
				scannedServers.push(serverName);
			}
		}
	}
}

export async function main(ns) {
	let scannedServers = []
	await findAllConnectedMachines("home", scannedServers, ns);
}