/** @param {NS} ns */
export async function main(ns) {
	let sizeDictionary = {
		8 : {"grow": 2, "weaken": 1, "hack": 1, "share":0},
		16 : {"grow": 6, "weaken": 1, "hack": 1, "share":0},
		32 : {"grow": 10, "weaken": 2, "hack": 2, "share":1},
		64 : {"grow": 23, "weaken": 3, "hack": 3, "share":1},
		128 : {"grow": 50, "weaken": 5, "hack": 5, "share":2},
		256 : {"grow": 100, "weaken": 12, "hack": 12, "share":2},
		512 : {"grow": 205, "weaken": 25, "hack": 25, "share":3},
		1024 : {"grow": 400, "weaken": 50, "hack": 50, "share":5},
		2048 : {"grow": 840, "weaken": 100, "hack": 100, "share":5},
		4096 : {"grow": 1100, "weaken": 175, "hack": 175, "share":140},
		8192 : {"grow": 2500, "weaken": 375, "hack": 375, "share":280},
		16384 : {"grow": 5500, "weaken": 875, "hack": 875, "share":560}
	}

	let sizeDicJson = JSON.stringify(sizeDictionary);
	
	await ns.write("automate_configsize.txt", sizeDicJson, "w");
}