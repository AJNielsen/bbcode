async function runServerCommands(serverName, ns) {
	await ns.hack(serverName);
	await ns.weaken(serverName);
	await ns.grow(serverName);
	await ns.weaken(serverName);
}

export async function main(ns) {
	let serverName = ns.read("servername.txt");
	
	while (true) {
		await ns.sleep(100);
		await runServerCommands(serverName, ns);
	}
}