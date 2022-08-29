//Solver for HammingCodes: Integer to Encoded Binary

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	//let data = ns.codingcontract.getData(filename, servername);
	ns.tprint("finish implementing me!");
}