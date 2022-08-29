/** @param {NS} ns */
export async function main(ns) {
	let favor = ns.singularity.getFactionFavor("The Black Hand");
	let gain = ns.singularity.getFactionFavorGain("The Black Hand");
	
	ns.tprint(favor);
	ns.tprint(gain);
	ns.tprint(favor+gain);
}