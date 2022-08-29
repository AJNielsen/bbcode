function shouldFocus(ns) {
	let owned = ns.singularity.getOwnedAugmentations();
	if(owned.includes("Neuroreceptor Management Implant")) {
		return false;
	}

	return true;
}

function getAugmentConfig(ns) {
	let configData = ns.read("automate_augmenttiers.txt");
	if (configData == null || configData == "") {
		ns.tprint("Augment Tiers configuration not set!");
		return null;
	}

	return JSON.parse(configData);
}

function getCurrentAugmentTier(ns) {
	let filedata = ns.read("automate_currentaugmenttier.txt");
	if (filedata == null || filedata == "") {
		return -1;
	}
	else {
		return Number(filedata);
	}
}

function getTierConfig(ns, config, tier) {
	for (let i = 0; i < config.length; ++i) {
		if (config[i] == null) {
			return null;
		}

		if (config[i].Tier == tier) {
			return config[i];
		}
	}

	return null;
}

function repFactionInAugsIfPossible(ns, tierConfig) {
	let owned = ns.singularity.getOwnedAugmentations(true);

	let faction = "";

	for (let i = 0; i < tierConfig.Augments.length; ++i) {
		if (owned.includes(tierConfig.Augments[i].Name)) {
			continue;
		}

		if (ns.singularity.getFactionRep(tierConfig.Augments[i].Faction) > ns.singularity.getAugmentationRepReq(tierConfig.Augments[i].Name)) {
			continue;
		}

		faction = tierConfig.Augments[i].Faction;
		i = tierConfig.Augments.length + 1;
	}

	let currentWork = ns.singularity.getCurrentWork();

	//We are creating something. Don't process. Just let it do it's thing.
	if (currentWork != null && currentWork.type == "FACTION" && currentWork.factionName == faction) {
		return true;
	}

	////{"type":"FACTION","cyclesWorked":4354,"factionWorkType":"HACKING","factionName":"CyberSec"}
	if (faction != "") {
		let focus = shouldFocus(ns);
		if (ns.singularity.workForFaction(faction, "HACKING", focus)) {
			return true;
		}
	}

	return false;
}

async function getFactionToRep(ns) {
	if (ns.getHackingLevel() < 50) {
		return false;
	}

	let config = getAugmentConfig(ns);
	let tier = getCurrentAugmentTier(ns);

	if (config == null) {
		return false;
	}

	let tierConfig = getTierConfig(ns, config, tier);
	if (tierConfig == null) {
		return false;
	}

	let count = 5;

	while (tierConfig != null && count > 0) {
		ns.tprint(tierConfig);

		if (repFactionInAugsIfPossible(ns, tierConfig)) {
			ns.tprint("Can Rep!");
			return true;
		}

		ns.tprint("Cannot Rep!");
		tier = tier + 1;
		tierConfig = getTierConfig(ns, config, tier);
		count = count - 1;
		ns.asleep(100);
	}

	return false;
}

/** @param {NS} ns */
export async function main(ns) {
	let result = await getFactionToRep(ns);
	let resultDetail = {
		"Activity": "faction",
		"Result": result
	};

	ns.spawn("automate/manageactivity.js", 1, JSON.stringify(resultDetail));
}