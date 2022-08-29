/** @param {NS} ns */
function getCurrentHomes(ns) {
	let result = ns.scan("home");

	let homes = [];

	for (const server of result) {
		if (server == "home") {
			continue;
		}

		if (!server.startsWith("home")) {
			continue;
		}

		homes.push(server);
	}

	return homes;
}

async function updateHomesData(ns, homeDictionary, homes) {
	let files = [];
	files.push("servername.txt");

	for (const homeServer of homes) {
		await ns.scp(files, "home", homeServer);
		let serverName = ns.read("servername.txt");
		homeDictionary[homeServer] = serverName;
	}


	if (homes.length == 0) {
		homeDictionary = JSON.parse("{}");
	}

	let date = new Date();
	homeDictionary["updatedDate"] = date;

	let writeData = JSON.stringify(homeDictionary);

	await ns.write("automate_homedictionary.txt", writeData, "w");
}

/** @param {NS} ns */
export async function main(ns) {
	let homes = getCurrentHomes(ns);

	await updateHomesData(ns, JSON.parse("{}"), homes);

	ns.spawn("automate/setuphomeservers.js");
}