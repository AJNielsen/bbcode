/** @param {NS} ns */
export async function main(ns) {
	let handle = ns.getPortHandle(1);
	let data = handle.read();
	ns.tprint(data);
}