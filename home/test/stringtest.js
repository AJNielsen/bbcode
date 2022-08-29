/** @param {NS} ns */
export async function main(ns) {
	let a = "abcd";
	//ns.tprint(a[a.length-1]);
	ns.tprint(a[-1] == null);
}