/** @param {NS} ns */
export async function main(ns) {
	let data = ns.read("rootedservers.txt");
	let splitData = data.split("\n");

	let notSetupServers = [];

	for (const server of splitData) {
		if (!ns.serverExists(server)) {
			continue;
		}

		if (ns.getServerMaxRam(server) == 0) {
			continue;
		}

		if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel()) {
			continue;
		}

		if (!ns.fileExists("hack.js", server) && !ns.fileExists("fourgigserver.js", server)) {
			notSetupServers.push(server);
			continue;
		}

		let processInfo = ns.ps(server);

		let runningLesThanThreeProcesses = processInfo.length < 3;
		let runningFourGig = false;
		let runningGrow = false;
		let runningHack = false;
		let runningWeak = false;

		for (const proc of processInfo) {
			if (proc.filename == "hack.js") {
				runningHack = true;
			}

			if (proc.filename == "grow.js") {
				runningGrow = true;
			}

			if (proc.filename == "weaken.js") {
				runningWeak = true;
			}

			if (proc.filename == "fourgigserver.js") {
				runningFourGig = true;
			}
		}

		if (runningFourGig) {
			continue;
		}

		if (runningLesThanThreeProcesses || !runningGrow || !runningHack || !runningWeak) {
			ns.tprint("Server:" + server + " | Process Count" + processInfo.length + " | Grow:" + runningGrow + " | Hack:" + runningHack + " | Weak:" + runningWeak);

			ns.killall(server);
			notSetupServers.push(server);
			continue;
		}
	}

	let output = notSetupServers.join("\n");
	await ns.write("notsetupservers.txt", output, "w");
	ns.spawn("setupserver.js");
}