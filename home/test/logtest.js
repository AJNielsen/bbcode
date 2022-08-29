function calcFavor(ns, rep) {
	let logBase = Math.log(1.02);

	let valueToLog = Math.log((rep + 25000)/25500);

	let favor = Math.floor(valueToLog/logBase);

	ns.tprint(favor);
}

/** @param {NS} ns */
export async function main(ns) {
	calcFavor(ns, 450000);
}