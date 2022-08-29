function getTierFromConfig(ns, tier, config) {
	for (let i = 0; i < config.length; ++i) {
		if (config[i].Tier == tier) {
			return config[i];
		}
	}

	return null;
}

async function saveTierLevel(ns, tierLevel) {
	await ns.write("automate_currentaugmenttier.txt", tierLevel, "w");
}

async function determineAndSetCurrentTier(ns) {
	let configData = ns.read("automate_augmenttiers.txt");
	if (configData == null || configData == "") {
		ns.tprint("Augment Tiers configuration not set!");
		return -1;
	}

	configData = JSON.parse(configData);

	if (configData.length == 0) {
		return -1;
	}

	let tierFound = false;
	let currentTier = 0;

	let owned = ns.singularity.getOwnedAugmentations();

	while (!tierFound) {
		await ns.asleep(100);
		currentTier++;

		let tierConfig = getTierFromConfig(ns, currentTier, configData);
		if (tierConfig == null) {
			ns.tprint("Tier Config Null - Current Tier: " + currentTier);
			await saveTierLevel(ns, 9001);
			return 9001;
		}

		let anyNotOwned = false;
		for (let i = 0; i < tierConfig.Augments.length; ++i) {
			if (!owned.includes(tierConfig.Augments[i].Name)) {
				anyNotOwned = true;
			}
		}

		tierFound = anyNotOwned;
	}

	await saveTierLevel(ns, currentTier);
	return currentTier;
}

function endgameConfig(ns) {
	ns.print("In endgame config");
	ns.tprint("In endgame config");

	let ownedOnly = ns.singularity.getOwnedAugmentations();
	let ownedAndPurchased = ns.singularity.getOwnedAugmentations(true);

	if(ownedAndPurchased.length-ownedOnly.length > 3) {
		installAugmentsAndWipe(ns);
	}

	ns.spawn("automate/buy_nfgs.js", 1, "Daedalus", "/automate/buyaugments.js");
}

function checkAugments(ns, tierLevel) {
	let configData = ns.read("automate_augmenttiers.txt");
	if (configData == null || configData == "") {
		ns.tprint("Augment Tiers configuration not set!");
		return false;
	}

	configData = JSON.parse(configData);

	let tierConfig = getTierFromConfig(ns, tierLevel, configData);

	let ownedAndPurchased = ns.singularity.getOwnedAugmentations(true);

	if (tierConfig == null || tierConfig == undefined) {
		ns.tprint("Something is wrong with check augments - 1");
		return false;
	}

	if (tierConfig.Augments == null || tierConfig.Augments == undefined) {
		ns.tprint("Something is wrong with check augments - 2");
		return false;
	}

	for (let i = 0; i < tierConfig.Augments.length; ++i) {
		if (!ownedAndPurchased.includes(tierConfig.Augments[i].Name) && tierLevel < 18) {
			return false;
		}
	}

	let alreadyInstalledAugs = ns.singularity.getOwnedAugmentations();

	if (ownedAndPurchased.length - alreadyInstalledAugs.length < 3 && tierLevel < 19) {
		//Must have at least 3 augments to install.
		return false;
	}

	if (ownedAndPurchased.length - alreadyInstalledAugs.length < 3 && tierLevel >= 19) {
		ns.spawn("automate/buy_nfgs.js", 1, "Daedalus");
		return false;
	}

	return true;
}

function installAugmentsAndWipe(ns) {
	ns.singularity.installAugmentations("automate_start.js");
}

/** @param {NS} ns */
export async function main(ns) {
	let filedata = ns.read("automate_currentaugmenttier.txt");
	let currentTier = -1;
	if (filedata == null || filedata == "") {
		currentTier = await determineAndSetCurrentTier(ns);
	}
	else {
		currentTier = Number(filedata);
	}

	if(currentTier > 9000) {
		endgameConfig(ns);
		return;
	}

	let result = checkAugments(ns, currentTier);

	if (result) {
		installAugmentsAndWipe(ns);
	} else {
		ns.print("Need more augments installed to wipe!");
		ns.tprint("Need more augments installed to wipe!");
	}

	ns.spawn("automate/buyaugments.js");
}