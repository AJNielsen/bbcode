function acceptSpecificInvites(ns, invites) {
	let factionsToAccept = ["CyberSec", "Tian Di Hui", "Netburners", "NiteSec", "The Black Hand", "BitRunners", "The Covenant", "Daedalus", "Illuminati"];
	for(let i=0; i<invites.length;++i) {
		if(factionsToAccept.includes(invites[i])) {
			if(!ns.singularity.joinFaction(invites[i])) {
				ns.tprint("something went wrong with joining invite. Faction: " + invites[i]);
			}
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let invites = ns.singularity.checkFactionInvitations();
	if(invites.length > 0) {
		acceptSpecificInvites(ns, invites);
	}

	ns.spawn("automate/manageactivity.js");
}