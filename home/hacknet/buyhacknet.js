function purchaseNodes(ns, money) {
	let costOfNextNode = ns.hacknet.getPurchaseNodeCost();
	let count = 0;

	while (costOfNextNode < money) {
		let purchaseResultIndex = ns.hacknet.purchaseNode()

		if (purchaseResultIndex < 0) {
			ns.print("Failed to purchase node after having enough money.");
			return money;
		}

		count++;

		money = money - costOfNextNode;
		costOfNextNode = ns.hacknet.getPurchaseNodeCost();
	}

	ns.print("Bought " + count + " nodes.");

	return money;
}

function compareNodes(nodeOne, nodeTwo) {
	let one = nodeOne.level + (nodeOne.ram * 5) + (nodeOne.cores * 10);
	let two = nodeTwo.level + (nodeTwo.ram * 5) + (nodeTwo.cores * 10);

	if (one > two) {
		return -1;
	}

	if (one < two) {
		return 1;
	}

	return 0;
}

function getNodeUpgradeCount(suggestedLevels, nodeIndex, moneyAvailable, ns) {
	let upgradeCost = ns.hacknet.getLevelUpgradeCost(nodeIndex, suggestedLevels);
	if (upgradeCost > moneyAvailable) {
		return Math.floor(suggestedLevels / 2);
	}

	return suggestedLevels;
}

function upgradeNodes(ns, moneyAvailable) {

	if (moneyAvailable < 0) {
		return;
	}

	let currentNodeCount = ns.hacknet.numNodes();

	let nodeStatsArray = [];

	for (let i = 0; i < currentNodeCount; ++i) {
		let stats = ns.hacknet.getNodeStats(i);
		stats.index = i;

		nodeStatsArray.push(stats);
	}

	nodeStatsArray.sort(compareNodes);

	for (const node of nodeStatsArray) {
		let coreCost = ns.hacknet.getCoreUpgradeCost(node.index, 1);

		while (coreCost < moneyAvailable) {
			let coreUpgrade = ns.hacknet.upgradeCore(node.index, 1);
			if (!coreUpgrade) {
				moneyAvailable = 0;
				return;
			}

			ns.print("Bought core for index: " + node.index);

			moneyAvailable = moneyAvailable - coreCost;
			coreCost = ns.hacknet.getCoreUpgradeCost(node.index, 1);
		}

		let ramCost = ns.hacknet.getRamUpgradeCost(node.index, 1);
		while (ramCost < moneyAvailable) {
			let ramUpgrade = ns.hacknet.upgradeRam(node.index, 1);
			if (!ramUpgrade) {
				moneyAvailable = 0;
				return;
			}

			ns.print("Bought ram for index: " + node.index);

			moneyAvailable = moneyAvailable - ramCost;
			ramCost = ns.hacknet.getRamUpgradeCost(node.index, 1);
		}


		let levelCost = ns.hacknet.getLevelUpgradeCost(node.index, 1);
		while (levelCost < moneyAvailable) {
			let levelUpgrade = ns.hacknet.upgradeLevel(node.index, 1);
			if (!levelUpgrade) {
				moneyAvailable = 0;
				return;
			}

			ns.print("Bought level for index: " + node.index);

			moneyAvailable = moneyAvailable - levelCost;
			levelCost = ns.hacknet.getRamUpgradeCost(node.index, 1);
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let moneyToReserve = Number(ns.read("hacknetmoney.txt"));

	let moneyAvailable = ns.getServerMoneyAvailable("home");
	moneyAvailable = moneyAvailable - moneyToReserve;

	if (moneyAvailable > 0) {
		moneyAvailable = purchaseNodes(ns, moneyAvailable);
		upgradeNodes(ns, moneyAvailable);
	}

	await ns.asleep(5000);
	//ns.spawn("hacknet/calculatehacknet.js");
}