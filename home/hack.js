//running on foodnstuff
//https://bitburner-beta.readthedocs.io/en/latest/netscript/netscriptmisc.html#netscript-ports

async function hackServer(serverName, ns) {
	do {
		await ns.hack(serverName);
	} while (isHackEfficient(ns, serverName, lowThreshold));
}

function isHackEfficient(ns, serverName, modifier) {
	ns.print("Threshold modifier[" + modifier + "]");
	let serverMoneyThreshold = ns.getServerMaxMoney(serverName) * modifier;
	let serverCurrentMoney = ns.getServerMoneyAvailable(serverName);

	ns.print("Threshold[" + serverMoneyThreshold + "] | Current Money[" + serverCurrentMoney + "]");
	return serverCurrentMoney >= serverMoneyThreshold;
}

var highThreshold = 0.85;
var lowThreshold = 0.75;

export async function main(ns) {
	let serverName = ns.read("servername.txt");

	ns.tprint("Processing beginning for server:" + serverName);

	while (true) {
		let thresholds = ns.read("hackthresholds.txt");

		let values = thresholds.split("\n");

		let high = Number(values[0]);
		if (high > 0) {
			highThreshold = high;
		}

		let low = Number(values[1]);

		if (low > 0) {
			lowThreshold = low;
		}

		while (!isHackEfficient(ns, serverName, highThreshold)) {
			await ns.asleep(500);
		}

		await hackServer(serverName, ns);
	}
}