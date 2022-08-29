function dateDiff(ns, dateOne, dateTwo) {
	if(dateOne.getTime() < dateTwo.getTime()) {
		ns.tprint("Date One is older.");
	} else if (dateOne.getTime() > dateTwo.getTime()) {
		ns.tprint("Date One is newer.");
	} else {
		ns.tprint("Dates are the same.");
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let one = new Date();
	//ns.tprint(one.getSeconds());
	//ns.tprint(one.getTime());
	 await ns.asleep(1000);
	 let two = new Date();

	//  dateDiff(ns, one, two);
	//  dateDiff(ns, two, one);
	//  dateDiff(ns, one, one);

	//let parsed = new Date(String(one.getTime()));
	let parsed = String(one.toString());
	ns.tprint(parsed);
}