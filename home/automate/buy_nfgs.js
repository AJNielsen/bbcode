async function buyNFGs(ns, factionToBuyFrom) {
	let cost = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
	let money = ns.getServerMoneyAvailable("home");

	while (money > cost) {
		await ns.sleep(100);
		let rep = ns.singularity.getAugmentationRepReq("NeuroFlux Governor");
		let brRep = ns.singularity.getFactionRep(factionToBuyFrom);

		if (brRep < rep) {
			let player = ns.getPlayer();
			let repFromDonation = ns.formulas.reputation.repFromDonation(100000, player);
			let neededRep = rep - brRep;
			let multiplier = neededRep / repFromDonation;
			let totalNeeded = 100000 * multiplier;

			if (totalNeeded > money) {
				totalNeeded = money - 1000000;
				ns.singularity.donateToFaction(factionToBuyFrom, totalNeeded);
				ns.print("Donated what we could, but need more money to get NFGs.");
				return;
			}

			if (!ns.singularity.donateToFaction(factionToBuyFrom, totalNeeded)) {
				ns.print("Something went wrong with donating. Stopping.");
				ns.tprint("Something went wrong with donating. Stopping.");
				return;
			}
		}

		if (!ns.singularity.purchaseAugmentation(factionToBuyFrom, "NeuroFlux Governor")) {
			ns.print("Something went wrong with purchasing Augment. Stopping.");
			ns.tprint("Something went wrong with purchasing Augment. Stopping.");
			return;
		}

		cost = ns.singularity.getAugmentationPrice("NeuroFlux Governor");
		money = ns.getServerMoneyAvailable("home");
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let faction = ns.args[0];
	await buyNFGs(ns, faction);

	let script = ns.args[1];
	if (script == null || script == undefined) {
		script = "";
	}

	if (ns.fileExists(script)) {
		ns.spawn(script);
	}
	else {
		ns.spawn("automate/onepercenthacknet.js");
	}
}