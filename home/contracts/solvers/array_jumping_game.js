function canJump(ns, data, pos) {
	if(pos < 0) {
		return false;
	}
	
	//If at the end. Go!
	if(pos > data.length-1) {
		return true;
	}

	let current = Number(data[pos]);
	//If at a stop. Go back.
	if (current == 0 && pos < data.length-1) {
		return false;
	}

	for(let i=1; i<=current;++i) {
		let result = canJump(ns, data, pos+i);
		if(canJump) {
			return true;
		}
	}

	return false;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let result = canJump(ns, data, 0);
	ns.print(result);

	let answer = 0;
	if(result) {
		answer = 1;
	}

	let attemptResponse = ns.codingcontract.attempt(answer, filename, servername);
	if(attemptResponse) {
		ns.tprint("Solved coding contract!");
		await ns.write("contracts_completed.txt", filename, "a");
	} else {
		ns.tprint("Coding contract failed!!");
	}
}