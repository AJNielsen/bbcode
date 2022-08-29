function listAugs(ns) {
	let player = ns.getPlayer();
	//ns.tprint(JSON.stringify(player));

	for (const faction of player.factions) {
		let augs = ns.singularity.getAugmentationsFromFaction(faction);

		ns.tprint(augs);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	for (let i = 0; i < 3; ++i) {
		await ns.share();
	}
}