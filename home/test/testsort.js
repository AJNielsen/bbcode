/** @param {NS} ns */
export async function main(ns) {
	let test = ["home2", "home6", "home1", "home7", "home3"];

	test = test.sort();

	ns.tprint(test);
	ns.tprint(test.length);
}