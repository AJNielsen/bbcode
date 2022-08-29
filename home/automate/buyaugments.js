function getAugmentConfig(ns){
	let configData = ns.read("automate_augmenttiers.txt");
	if(configData == null || configData == "") {
		ns.tprint("Augment Tiers configuration not set!");
		return null;
	}

	return JSON.parse(configData);
}

function getCurrentAugmentTier(ns) {
	let filedata = ns.read("automate_currentaugmenttier.txt");
	if(filedata == null || filedata == "") {
		return -1;
	}
	else {
		return Number(filedata);
	}
}

function getTierFromConfig(ns, tier, config) {
	for(let i=0;i<config.length;++i) {
		if(config[i].Tier == tier) {
			return config[i];
		}
	}

	return null;
}

function buyNFG(ns, factionName) {
	let nfgName = "NeuroFlux Governor";

	let purchased = false;
	do{
		purchased = ns.singularity.purchaseAugmentation(factionName, nfgName);
	} while(purchased);
}

function buyAugments(ns, currentTier, augmentConfig) {
	let tierConfig = getTierFromConfig(ns, currentTier, augmentConfig);

	if(tierConfig == null || tierConfig == undefined) {
		ns.print("Tier config is not defnied.");
		return;
	}

	ns.print("Tier Config: " + JSON.stringify(tierConfig));

	let owned = ns.singularity.getOwnedAugmentations(true);

	let moreToPurchase = false;
	let faction = "";
	for(let i = 0; i<tierConfig.Augments.length;++i) {
		faction = tierConfig.Augments[i].Faction;
		if(owned.includes(tierConfig.Augments[i].Name)) {
			continue;
		}

		if(!ns.singularity.purchaseAugmentation(tierConfig.Augments[i].Faction, tierConfig.Augments[i].Name)) {
			moreToPurchase = true;
		} else {
			ns.print("Purchased Augment: " + tierConfig.Augments[i].Name);
		}
	}

	if(!moreToPurchase) {
		buyAugments(ns, (currentTier+1), augmentConfig);
		buyNFG(ns, faction);
	} else {
		ns.print("More augments needed to purchase for this tier.");
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let currentTier = getCurrentAugmentTier(ns);
	let config = getAugmentConfig(ns);

	if(currentTier == -1) {
		//TODO: Do something else.
		ns.tprint("Current tier is set to -1!");
		return;
	}

	buyAugments(ns, currentTier, config);

	ns.spawn("automate/managefactions.js");
}