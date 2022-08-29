//https://www.reddit.com/r/Bitburner/comments/rm29tk/hacknet_formula_for_calculating_profit_from/
function levelUpgradeProfit(currentLevel, currentRam, currentLevelCore, ns) {
	return (1 * 1.5) * Math.pow(1.035, currentRam - 1) * ((currentLevelCore + 5) / 6) * ns.getHacknetMultipliers().production;
}

function ramUpgradeProfit(currentLevel, currentRam, currentLevelCore, ns) {
	return ((currentLevel * 1.5) * (Math.pow(1.035, (2 * currentRam) - 1) - Math.pow(1.035, currentRam - 1)) * ((currentLevelCore + 5) / 6)) * ns.getHacknetMultipliers().production;
}

function coreUpgradeProfit(currentLevel, currentRam, currentLevelCore, ns) {
	return (currentLevel * 1.5) * Math.pow(1.035, currentRam - 1) * (1 / 6) * ns.getHacknetMultipliers().production;
}

/** @param {NS} ns */
export async function main(ns) {
	let nodeStats = ns.hacknet.getNodeStats(1);
	let levelProfit = levelUpgradeProfit(nodeStats.level, nodeStats.ram, nodeStats.cores, ns);
	let ramProfit = ramUpgradeProfit(nodeStats.level, nodeStats.ram, nodeStats.cores, ns);
	let coreProfit = coreUpgradeProfit(nodeStats.level, nodeStats.ram, nodeStats.cores, ns);

	let levelCost = ns.hacknet.getLevelUpgradeCost(1, 1);
	let ramCost = ns.hacknet.getRamUpgradeCost(1, 1);
	let coreCost = ns.hacknet.getCoreUpgradeCost(1, 1)

	ns.tprint("Level Profit: " + levelProfit);
	ns.tprint("Level Ratio: " + levelProfit / levelCost);
	ns.tprint("Ram Profit: " + ramProfit);
	ns.tprint("Ram Ratio: " + ramProfit / ramCost);
	ns.tprint("Core Profit: " + coreProfit);
	ns.tprint("Core Ratio: " + coreProfit / coreCost);
}