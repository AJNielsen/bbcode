//Solver for: Algorithmic Stock Trader III
/*
You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

 18,59,27,91,164,119,75,164,33,180,31,80,121,86,30,16,132,81,107

 Determine the maximum possible profit you can earn using at most two transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

 If no profit can be made, then the answer should be 0

[18,59,27,91,164,119,75,164,33,180,31,80,121,86,30,16,132,81,107]
 */

function findProfit(ns, data, pos, first, profit=0) {
	let lessThanMe = data.length;
	if(first) {
		lessThanMe = data.length-3;
	}

	let currentMax = 0;
	let maxPos = -1;

	for(let i=0; i< lessThanMe;++i) {
		if(data[i]-data[pos] > 0) {
			
		}
		// if(data[i] - data[pos] > currentMax) {
		// 	currentMax = data[i]-data[pos];
		// 	maxPos = i;
		// }
	}

	if(maxPos > -1) {
		if(first) {
			return findProfit(ns, data, maxPos+1, false, currentMax);
		} else {
			return currentMax + profit;
		}
	} else {
		return profit;
	}
}


/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let result = findProfit(ns, data, 0, true);
	ns.print(result);

	// ns.tprint(description);
	// ns.tprint(data);
	// ns.tprint("Profit Result: " + result);
	ns.tprint("IMPLEMENT ME!")
}