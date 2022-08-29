//running on foodnstuff
//https://bitburner-beta.readthedocs.io/en/latest/netscript/netscriptmisc.html#netscript-ports

async function growServer(serverName, ns) {
	do {
		await ns.grow(serverName);
	} while (!isGrowMaxed(ns, serverName));
}

function isGrowMaxed(ns, serverName) {
	let serverMaxMoney = ns.getServerMaxMoney(serverName);
	let serverCurrentMoney = ns.getServerMoneyAvailable(serverName);

	return serverCurrentMoney >= serverMaxMoney;
}

export async function main(ns) {
	let serverName = ns.args[0];

	ns.tprint("Processing beginning for server:" + serverName);
	await growServer(serverName, ns);
	ns.toast("Brute Grow Complete!");
}