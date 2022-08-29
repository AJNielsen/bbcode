function purchaseOneNodeMax(ns, spendingMoney) {
	let nodeCost = ns.hacknet.getPurchaseNodeCost();
	if(nodeCost < spendingMoney) {
		ns.hacknet.purchaseNode();
		spendingMoney = spendingMoney-nodeCost;
	}

	return spendingMoney;
}

function purchaseAllPossibleUpgrades(ns, spendingMoney) {
	let currentNodeCount = ns.hacknet.numNodes();

	for(let i = 0; i< currentNodeCount; ++i) {
		
		let coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
		while(coreCost < spendingMoney) {
			ns.hacknet.upgradeCore(i, 1);
			spendingMoney = spendingMoney-coreCost;
			coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
		}

		let ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
		while(ramCost < spendingMoney) {
			ns.hacknet.upgradeRam(i, 1);
			spendingMoney = spendingMoney-ramCost;
			ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
		}

		let levelCost = ns.hacknet.getLevelUpgradeCost(i, 1);
		while(levelCost < spendingMoney) {
			ns.hacknet.upgradeLevel(i, 1);
			spendingMoney = spendingMoney-levelCost;
			levelCost = ns.hacknet.getLevelUpgradeCost(i, 1);
		}
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let spendingMoney = ns.getServerMoneyAvailable("home");
	spendingMoney = spendingMoney * 0.01;

	purchaseOneNodeMax(ns, spendingMoney);
	purchaseAllPossibleUpgrades(ns, spendingMoney);

	ns.spawn("automate/findvaluableservers.js");
}