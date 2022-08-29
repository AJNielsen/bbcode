function purchaseTorIfMoney(ns) {
	ns.tprint("In purchase tor!");
	let currentMoney = ns.getServerMoneyAvailable("home");

	if (currentMoney < 1500000) {
		ns.tprint("Not purchasing tor. Too little money. Current: " + currentMoney);
		return false;
	}

	if (ns.singularity.purchaseTor()) {
		return true;
	}

	return false;
}

function isMakingProgram(ns, filename) {
	////{"type":"CREATE_PROGRAM","cyclesWorked":144,"programName":"relaySMTP.exe"}
	let currentWork = ns.singularity.getCurrentWork();

	//We are creating something. Don't process. Just let it do it's thing.
	if (currentWork != null && currentWork.type == "CREATE_PROGRAM" && currentWork.programName == filename) {
		return true;
	}

	return false;
}

function shouldCreateProgramByName(ns, filename, hasTor) {
	if (ns.fileExists(filename, "home")) {
		return false;
	}

	let currentMoney = ns.getServerMoneyAvailable("home");

	if (filename == "BruteSSH.exe") {
		if (hasTor && currentMoney > 1500000) {
			if (ns.singularity.purchaseProgram("brutessh.exe")) {
				return false;
			}
		}

		if (isMakingProgram(ns, "BruteSSH.exe")) {
			return true;
		}

		if (ns.singularity.createProgram("brutessh.exe")) {
			return true;
		}
	}

	if (filename == "FTPCrack.exe") {
		if (hasTor && currentMoney > 3000000) {
			if (ns.singularity.purchaseProgram("ftpcrack.exe")) {
				return false;
			}
		}

		if (isMakingProgram(ns, "FTPCrack.exe")) {
			return true;
		}

		if (ns.singularity.createProgram("ftpcrack.exe")) {
			return true;
		}
	}

	if (filename == "relaySMTP.exe") {
		if (hasTor && currentMoney > 10000000) {
			if (ns.singularity.purchaseProgram("relaysmtp.exe")) {
				return false;
			}
		}

		if (isMakingProgram(ns, "BruteSSH.exe")) {
			return true;
		}

		if (ns.singularity.createProgram("relaySMTP.exe")) {
			return true;
		}
	}

	if (filename == "HTTPWorm.exe") {
		if (hasTor && currentMoney > 60000000) {
			if (ns.singularity.purchaseProgram("httpworm.exe")) {
				return false;
			}
		}

		if (isMakingProgram(ns, "HTTPWorm.exe")) {
			return true;
		}

		if (ns.singularity.createProgram("httpworm.exe")) {
			return true;
		}
	}

	if (filename == "SQLInject.exe") {
		if (hasTor && currentMoney > 400000000) {
			if (ns.singularity.purchaseProgram("sqlinject.exe")) {
				return false;
			}
		}

		if (isMakingProgram(ns, "SQLInject.exe")) {
			return true;
		}

		if (ns.singularity.createProgram("sqlinject.exe")) {
			return true;
		}
	}

	return false;
}

function shouldCreateProgram(ns) {
	if (ns.getHackingLevel() < 50) {
		return false;
	}

	let player = ns.getPlayer(); 
	let torPurchased = player.tor;

	if (!torPurchased) {
		torPurchased = purchaseTorIfMoney(ns);
	}

	if (shouldCreateProgramByName(ns, "BruteSSH.exe", torPurchased)) {
		return true;
	}

	if (shouldCreateProgramByName(ns, "FTPCrack.exe", torPurchased)) {
		return true;
	}

	if (shouldCreateProgramByName(ns, "relaySMTP.exe", torPurchased)) {
		return true;
	}

	if (shouldCreateProgramByName(ns, "HTTPWorm.exe", torPurchased)) {
		return true;
	}

	if (shouldCreateProgramByName(ns, "SQLInject.exe", torPurchased)) {
		return true;
	}

	return false;
}
/** @param {NS} ns */
export async function main(ns) {
	let result = shouldCreateProgram(ns);

	let resultDetail = {
		"Activity": "program",
		"Result": result
	};

	ns.spawn("automate/manageactivity.js", 1, JSON.stringify(resultDetail));
}