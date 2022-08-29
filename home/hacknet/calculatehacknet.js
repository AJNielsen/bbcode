/** @param {NS} ns */
function getNodeReservationCost(ns) {
	let costOfNextNode = ns.hacknet.getPurchaseNodeCost();
	let currentNodeCount = ns.hacknet.numNodes();

	return (costOfNextNode / 2) + (costOfNextNode / currentNodeCount);
}

function getTotalNodeLevelsReservation(ns) {
	let currentNodeCount = ns.hacknet.numNodes();

	let reserveredMoney = 0;

	for (let i = 0; i < currentNodeCount; ++i) {
		let stats = ns.hacknet.getNodeStats(i);

		reserveredMoney = reserveredMoney + (ns.hacknet.getLevelUpgradeCost(i, 1) / stats.level) +  ((stats.level - 1) * (10 + (stats.level/10)));
		reserveredMoney = reserveredMoney + (ns.hacknet.getRamUpgradeCost(i, 1) / stats.ram) + ((stats.ram - 1) * (500 + ((stats.ram-1)/500)));
		reserveredMoney = reserveredMoney + (ns.hacknet.getCoreUpgradeCost(i, 1) / stats.cores) + ((stats.cores - 1) * (2000 + ((stats.cores-1)/2000)));
	}

	return reserveredMoney;
}

/** @param {NS} ns */
export async function main(ns) {

	let moneyReservation = 0;

	moneyReservation = getNodeReservationCost(ns);
	moneyReservation = moneyReservation + getTotalNodeLevelsReservation(ns);

	ns.print("Money to reserve: " + moneyReservation);
	await ns.write("hacknetmoney.txt", moneyReservation, "w");
	ns.spawn("hacknet/buyhacknet.js");
}