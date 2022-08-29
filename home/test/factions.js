/** @param {NS} ns */
export async function main(ns) {
	let player = ns.getPlayer();
	ns.tprint(player.factions);
}