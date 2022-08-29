/** @param {NS} ns */
export async function main(ns) {
	let serverName = ns.args[0];
	let purchaseServerCost = ns.getPurchasedServerCost(serverName);

	let format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(purchaseServerCost);

	ns.tprint(format);
	ns.print(format);
}