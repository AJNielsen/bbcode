function runSpawn(ns) {
	ns.spawn("automate/world_daemon.js");
}

function checkInvitionsAndJoin(ns, faction = "Tian Di Hui") {
	let invitations = ns.singularity.checkFactionInvitations();
	if (invitations.includes(faction)) {
		return ns.singularity.joinFaction(faction);
	}

	return false;
}

async function joinTianDiHui(ns, player) {
	ns.print("Checking Tian Di Hui faction. Have we joined them already?");
	if (player.factions.includes("Tian Di Hui")) {
		return;
	}

	if (checkInvitionsAndJoin(ns, "Tian Di Hui")) {
		return;
	}

	if (player.skills.hacking < 50) {
		return;
	}

	if (player.money < 1500000) {
		return;
	}

	let startingCity = player.city;

	if (startingCity != "Chongqing" || startingCity != "New Tokyo" || startingCity != "Ishima") {
		if (!ns.singularity.travelToCity("Chongqing")) {
			return;
		}

		await ns.asleep(1000);

		for (let i = 0; i < 3; ++i) {
			await ns.asleep(5000);
			if (checkInvitionsAndJoin(ns)) {
				i = 4;
				continue;
			}
		}

		if (!ns.singularity.travelToCity(startingCity)) {
			ns.tprint("Failed to move back to Starting City: " + startingCity);
		}
	}
}

async function joinChongqing(ns, player) {
	ns.print("Checking Chongqing faction.");
	let owned = ns.singularity.getOwnedAugmentations();

	if(owned.includes("Neuregen Gene Modification")) {
		ns.print("Already own the Neuregen Gene Modification. Don't need Chongqing.");
		return;
	}
	
	if (player.factions.includes("Chongqing")) {
		ns.print("Already joined Chongqing.");
		return;
	}

	if (checkInvitionsAndJoin(ns, "Chongqing")) {
		ns.print("Accepted invite from Chongqing.");
		return;
	}

	let currentTier = Number(ns.read("automate_currentaugmenttier.txt"));

	if(currentTier < 8) {
		ns.print("We are not at tier 8. Don't bother with this faction yet.");
		return;
	}

	if (player.money < 20400000) {
		return;
	}

	let startingCity = player.city;

	if (startingCity != "Chongqing") {
		if (!ns.singularity.travelToCity("Chongqing")) {
			return;
		}

		await ns.asleep(1000);

		for (let i = 0; i < 3; ++i) {
			await ns.asleep(5000);
			if (checkInvitionsAndJoin(ns)) {
				i = 4;
				continue;
			}
		}

		if (!ns.singularity.travelToCity(startingCity)) {
			ns.tprint("Failed to move back to Starting City: " + startingCity);
		}
	}
}

async function joinSector12(ns, player) {
	ns.print("Checking Sector-12 faction.");
	let owned = ns.singularity.getOwnedAugmentations();

	if(owned.includes("CashRoot Starter Kit")) {
		ns.print("Already own the Neuregen Gene Modification. Don't need Sector-12.");
		return;
	}
	
	if (player.factions.includes("Sector-12")) {
		ns.print("Already joined Sector-12.");
		return;
	}

	if (checkInvitionsAndJoin(ns, "Sector-12")) {
		ns.print("Accepted invite from Sector-12.");
		return;
	}

	let currentTier = Number(ns.read("automate_currentaugmenttier.txt"));

	if(currentTier < 5) {
		ns.print("We are not at tier 5. Don't bother with Sector-12 yet.");
		return;
	}

	if(currentTier > 6) {
		ns.print("Something has gone wrong and you are above the tier for the mod needed from Sector-12.");
		ns.tprint("Something has gone wrong and you are above the tier for the mod needed from Sector-12.");
		return;
	}

	if (player.money < 15400000) {
		return;
	}

	let startingCity = player.city;

	if (startingCity != "Sector-12") {
		if (!ns.singularity.travelToCity("Sector-12")) {
			return;
		}

		await ns.asleep(1000);

		for (let i = 0; i < 3; ++i) {
			await ns.asleep(5000);
			if (checkInvitionsAndJoin(ns)) {
				i = 4;
				continue;
			}
		}

		if (!ns.singularity.travelToCity(startingCity)) {
			ns.tprint("Failed to move back to Starting City: " + startingCity);
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let player = ns.getPlayer();

	await joinTianDiHui(ns, player);
	await joinChongqing(ns, player);
	await joinSector12(ns, player);

	runSpawn(ns);
}