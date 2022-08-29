/*
You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

 85,83,162,110,181

 Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it

[85,83,162,110,181]
 */

function determineMaxProfit(ns, data, pos) {
	if(pos >= data.length-1) {
		return 0;
	}

	let max = 0;
	
	for (let i=pos+1;i<data.length;++i) {
		let diff = data[i]-data[pos];
		if(diff > max) {
			max = diff;
			continue;
		}
	}

	let other = determineMaxProfit(ns, data,pos+1);

	if(other > max) {
		return other;
	}

	return max;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let answer = determineMaxProfit(ns, data, 0);

	let attemptResponse = ns.codingcontract.attempt(answer, filename, servername);
	if(attemptResponse) {
		ns.tprint("Solved coding contract!");
		await ns.write("contracts_completed.txt", filename, "a");
	} else {
		ns.tprint("Failed contract!");
	}
}