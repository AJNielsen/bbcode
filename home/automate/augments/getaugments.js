function getRemainingAugmentsFromFaction(ns, factionName, installedAugments) {
	let augments = ns.singularity.getAugmentationsFromFaction(factionName);
	for (let i = 0; i < augments.length; ++i) {
		if (installedAugments.includes(augments[i])) {
			augments[i].splice(i, 1);
			i = i - 1;
		}
	}

	return augments;
}

function sortAugments(ns, augments) {
	augments.sort(function compare(first, second) {
		let firstRep = ns.singularity.getAugmentationRepReq(first);
		let secondRep = ns.singularity.getAugmentationRepReq(second);

		if (firstRep < secondRep) {
			return -1;
		}
		else if (firstRep > secondRep) {
			return 1;
		}

		return 0;
	});

	return augments;
}

function purchaseAugments(ns, augments, faction) {
	for(let i = 0; i< augments.length; ++i) {
		let result = ns.singularity.purchaseAugmentation(faction, augments[i]);
		if(!result) {
			return;
		}
	}
}

function purchaseCyberSecAugments() {
	let owned = ns.singularity.getOwnedAugmentations();
	let currentRep = ns.singularity.getFactionRep("CyberSec");
	let factionAugs = ns.singularity.getAugmentationsFromFaction("CyberSec");

	let currentNeuro = "";

	for (let i = 0; i < factionAugs.length; ++i) {
		if (factionAugs[i].startsWith("NeuroFlux Governor")) {
			currentNeuro = factionAugs[i];
			factionAugs.splice(i, 1);
			i = i - 1;
			continue;
		}
		
		if (owned.includes(factionAugs[i])) {
			factionAugs.splice(i, 1);
			i = i - 1;
			continue;
		}

		if (currentRep < ns.singularity.getAugmentationRepReq(factionAugs[i])) {
			factionAugs.splice(i, 1);
			i = i - 1;
			continue;
		}

		if(ns.singularity.getAugmentationPrice(factionAugs[i]) > ns.getServerMoneyAvailable("home")) {
			factionAugs.splice(i, 1);
			i = i - 1;
			continue;
		}
	}

	factionAugs.sort(function sort(first, second) {
		let firstcost = ns.singularity.getAugmentationPrice(first);
		let secondCost = ns.singularity.getAugmentationPrice(second);

		if(firstcost > secondCost) {
			return -1;
		}
		else if(firstcost < secondCost){
			return 1;
		}

		return 0;
	});

	
}

function determineCyberSecRepNeed(ns, factionDetails) {
	if (factionDetails.CyberSec.InstalledAugments.length == 0) {
		return 1000;
	}

	let owned = ns.singularity.getOwnedAugmentations();

	if (!owned.includes("Synaptic Enhancement Implant")) {
		return 2000;
	}

	if (!owned.includes("BitWire")) {
		return 3750;
	}

	if (!owned.includes("Cranial Signal Processors - Gen I")) {
		return 10000;
	}

	if (!owned.includes("Cranial Signal Processors - Gen II")) {
		return 18750;
	}

	//MARK COMPLETE!!!!!

	return 0;
}

function determineRepNeeded(ns, factionName, factionDetails) {
	if (factionName == "CyberSec") {
		let rep = determineCyberSecRepNeed(ns, factionDetails);
		let currentRep = ns.singularity.getFactionRep("CyberSec");

		if (rep > currentRep) {
			return 0;
		}

		return rep;
	}
}

function findNextFaction(ns, factionDetails) {
	if (!factionDetails.CyberSec.Complete) {

		let rep = determineRepNeeded(ns, "CyberSec", factionDetails);
		if (rep > 0) {
			return "CyberSec";
		}

		purchaseCyberSecAugments();
	}

	ns.tprint("CYBER SEC DONE! CONTINUE CODING ME!!!!!!!!");
	return null;
}

/** @param {NS} ns */
export async function main(ns) {
	let factionDetails = ns.read("factiondetails.txt");
	if (factionDetails == null || factionDetails == "") {
		ns.tprint("Faction details is empty!");
	} else {
		factionDetails = JSON.parse(factionDetails);
	}

	let faction = findNextFaction(ns, factionDetails);

	if (faction != null) {

	} else {
		ns.print("No faction selected!");
		ns.tprint("No faction selected!");
	}

	//TODO: Go to next script!
}