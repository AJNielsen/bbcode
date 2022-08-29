function spawnNextScript(ns) {
	ns.spawn("automate/backdoorneededservers.js");
}

async function determineResetForFasterFavor(ns, favor) {
	let gain = ns.singularity.getFactionFavorGain("Daedalus");

	if (gain < 1) {
		return;
	}

	if (favor == 0) {
		if (gain < 100) {
			ns.print("Current gain[" + gain + "] is not at least 100.");
			return;
		}

		ns.spawn("automate/buy_nfgs.js", 1, "BitRunners");
		return;
	} else if (favor < 150 && favor > 100) {
		if (favor + gain < 150) {
			ns.print("Need more rep to gain enough favor!");
			return;
		}

		ns.spawn("automate/buy_nfgs.js", 1, "BitRunners");
		return;
	}
}

async function donateIfPossible(ns, faction) {
	let factionFavor = ns.singularity.getFactionFavor(faction);
	if (factionFavor < 150) {
		if (faction == "Daedalus") {
			await determineResetForFasterFavor(ns, factionFavor);
		}

		ns.print("Faction[" + faction + "] favor is too low to donate. Favor: " + factionFavor);
		return;
	}

	let rep = 1;

	if (faction == "BitRunners") {
		rep = 1000000;
	}
	else if (faction == "Daedalus") {
		rep = 2500000;
	}


	let factionRep = ns.singularity.getFactionRep(faction);
	rep = rep - factionRep;

	if (rep < 1) {
		ns.print("We have reached our goal with rep for Faction[" + faction + "]");
		ns.tprint("We have reached our goal with rep for Faction[" + faction + "]");
		return;
	}

	let player = ns.getPlayer();
	let repFromDonation = ns.formulas.reputation.repFromDonation(100000, player);

	let repMultiplier = rep / repFromDonation;

	let neededMoney = repMultiplier * 100000;

	let currentMoney = ns.getServerMoneyAvailable("home");

	if (currentMoney > neededMoney) {
		if (ns.singularity.donateToFaction(faction, neededMoney)) {
			ns.print("Donated [" + neededMoney + "] to Faction: " + faction);
			ns.tprint("Donated [" + neededMoney + "] to Faction: " + faction);
			return;
		}
		ns.print("something went wrong when donating. Check logs!");
		ns.tprint("something went wrong when donating. Check logs!");
		return;
	}

	currentMoney = currentMoney - 1000000;
	if (currentMoney < 1) {
		ns.print("Don't have enough money to donate.");
		ns.tprint("Don't have enough money to donate.");
		return;
	}

	if (ns.singularity.donateToFaction(faction, currentMoney)) {
		ns.print("Donated [" + currentMoney + "] to Faction: " + faction);
		ns.tprint("Donated [" + currentMoney + "] to Faction: " + faction);
		return;
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let tier = Number(ns.read("automate_currentaugmenttier.txt"));

	if (tier < 16) {
		spawnNextScript(ns);
		return;
	}

	let player = ns.getPlayer();
	let factions = player.factions;

	let donateFactions = ["BitRunners", "Daedalus"];

	for (let i = 0; i < donateFactions.length; ++i) {
		if (factions.includes(donateFactions[i])) {
			await donateIfPossible(ns, donateFactions[i]);
		}
	}

	spawnNextScript(ns);
}