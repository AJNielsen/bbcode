/** @param {NS} ns */
export async function main(ns) {
	if(ns.singularity.getUpgradeHomeRamCost() < ns.getServerMoneyAvailable("home")) {
		if(ns.singularity.upgradeHomeRam()) {
			ns.print("Upgraded home ram!")
		}
	}

	if(ns.singularity.getUpgradeHomeCoresCost() < ns.getServerMoneyAvailable("home")) {
		if(ns.singularity.upgradeHomeCores()) {
			ns.print("Upgraded home Cores!")
		}
	}

	ns.spawn("automate/donate_faction.js");
}