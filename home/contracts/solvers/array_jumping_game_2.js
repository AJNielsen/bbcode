//Solver for Array Jumping Game II

/*
You are given the following array of integers:

 2,4,5,3,1,2,6

 Each element in the array represents your MAXIMUM jump length at that position. This means that if you are at position i and your maximum jump length is n, you can jump to any position from i to i+n. 

Assuming you are initially positioned at the start of the array, determine the minimum number of jumps to reach the end of the array.

 If it's impossible to reach the end, then the answer should be 0.

[2,4,5,3,1,2,6]
 */

function findJumpCount(ns, data, pos = 0, count = 0) {
	if (pos == data.length - 1) {
		return count;
	}

	if (pos >= data.length) {
		return 0;
	}

	if (data[pos] == 0) {
		return 0;
	}

	for (let i = data[pos]; i > 0; i=i-1) {

		let jumpSuccess = findJumpCount(ns, data, (pos + i), (count + 1));
		if (jumpSuccess > 0) {
			return jumpSuccess;
		}
	}

	// for (let i = 1; i <= data[pos]; ++i) {
	// 	let jumpSuccess = findJumpCount(ns, data, (pos + i), (count + 1));
	// 	if (jumpSuccess > 0) {
	// 		return jumpSuccess;
	// 	}
	// }

	return 0;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let answer = findJumpCount(ns, data);
	ns.print("answer: " + answer);

	let attemptResult = ns.codingcontract.attempt(answer, filename, servername);

	if (attemptResult) {
		ns.tprint("Completed coding contract!");
		await ns.write("contracts_completed.txt", filename, "a");
	} else {
		ns.tprint("Failed coding contract! Please HALP!")
	}
}