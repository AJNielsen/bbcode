//Solver for Generate IP Addresses

/*
Given the following string containing only digits, return an array with all possible valid IP address combinations that can be created from the string:

 3399105181

 Note that an octet cannot begin with a '0' unless the number itself is actually 0. For example, '192.168.010.1' is not a valid IP.

 Examples:

 25525511135 -> [255.255.11.135, 255.255.111.35]
 1938718066 -> [193.87.180.66]

3399105181
*/
function getIpFromArray(ns, data, array) {
	let ip = "";

	let segment = 0;
	let val = -1;
	for (let i = 0; i < data.length; ++i) {
		if (val == -1) {
			val = array[segment][0];
		}
		else if (val == 0) {
			segment++;
			ip = ip + ".";
			val = array[segment][0];
		}

		val = val-1;
		ip = ip + String(data[i]);
	}

	return ip;
}



function getIpsFromCombos(ns, data, arrayCombinations, solutions = []) {
	for (const combo of arrayCombinations) {
		let ip = getIpFromArray(ns, data, combo);
		solutions.push(ip);
	}

	return solutions;
}

function countArray(array) {
	let count = 0;
	for (const segment of array) {
		count = count + segment[0];
	}

	return count;
}

function getCombinations(array) {
	let combos = [];

	/*
	1234
	1243
	1324
	1342
	1423
	1432
	 */
	//CORRECTED!
	combos.push([array[0], array[1], array[2], array[3]])
	combos.push([array[0], array[1], array[3], array[2]])
	combos.push([array[0], array[2], array[1], array[3]])
	combos.push([array[0], array[2], array[3], array[1]])
	combos.push([array[0], array[3], array[1], array[2]])
	combos.push([array[0], array[3], array[2], array[1]])

	/*
	2134
	2143
	2314
	2341
	2413
	2431
	 */
	//CORRECTED!
	combos.push([array[1], array[0], array[2], array[3]])
	combos.push([array[1], array[0], array[3], array[2]])
	combos.push([array[1], array[2], array[0], array[3]])
	combos.push([array[1], array[2], array[3], array[0]])
	combos.push([array[1], array[3], array[0], array[2]])
	combos.push([array[1], array[3], array[2], array[0]])

	/*
	3124
	3142
	3214
	3241
	3412
	3421
	*/
	//CORRECTED!
	combos.push([array[2], array[0], array[1], array[3]])
	combos.push([array[2], array[0], array[3], array[1]])
	combos.push([array[2], array[1], array[0], array[3]])
	combos.push([array[2], array[1], array[3], array[0]])
	combos.push([array[2], array[3], array[0], array[1]])
	combos.push([array[2], array[3], array[1], array[0]])

	/*
	4123
	4132
	4213
	4231
	4312
	4321
	 */
	//CORRECTED!
	combos.push([array[3], array[0], array[1], array[2]])
	combos.push([array[3], array[0], array[2], array[1]])
	combos.push([array[3], array[1], array[0], array[2]])
	combos.push([array[3], array[1], array[2], array[0]])
	combos.push([array[3], array[2], array[0], array[1]])
	combos.push([array[3], array[2], array[1], array[0]])

	let set = new Set();

	let finalCombos = [];

	for (const order of combos) {
		if (set.has(order)) {
			continue;
		}

		finalCombos.push(order);
		set.add(finalCombos);
	}

	return finalCombos;
}

function getNextArray(array) {

	if (array[3][0] < 3 && array[2][0] > 1) {
		array[3][0]++;
		array[2][0]--;
		return array;
	}

	if (array[2][0] < 3 && array[1][0] > 1) {
		array[2][0]++;
		array[1][0]--;
		return array;
	}

	if (array[1][0] < 3 && array[0][0] > 1) {
		array[1][0]++;
		array[0][0]--;
		return array;
	}

	return null;
}

function getStartingArray(ns, data) {
	let start = [[3], [3], [3], [3]];

	let size = data.length;
	let arraySize = countArray(start);

	while (size != arraySize && arraySize > 4) {
		if (start[3][0] > 1) {
			start[3][0] = start[3][0] - 1;
		}
		else if (start[2][0] > 1) {
			start[2][0] = start[2][0] - 1;
		}
		else if (start[1][0] > 1) {
			start[1][0] = start[1][0] - 1;
		}
		else if (start[0][0] > 1) {
			start[0][0] = start[0][0] - 1;
		}
		else {
			ns.print("Something has gone wrong.");
			ns.tprint("Something has gone wrong.");
			ns.exit();
			return;
		}

		arraySize = countArray(start);
	}

	return start;
}

function validateSegment(segment) {
	if(segment.length > 3) {
		return false;
	}

	if(segment.length < 1) {
		return false;
	}

	if(segment.length > 1 && segment[0] == "0") {
		return false;
	}

	let segNum = Number(segment);

	if(segNum > 255) {
		return false;
	}

	return true;
}

function validateIps(ns, iparray) {
	let output = [];
	
	for(const ip of iparray) {
		let valid = true;
		let segments = ip.split(".");
		for(const seg of segments) {
			if(!validateSegment(seg)) {
				valid = false;
			}
		}

		if(valid) {
			output.push(ip);
		}
	}

	return output;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	if (data.length > 12 || data.length < 4) {
		ns.print("HALP! DATA NOT THE RIGHT SIZE!: " + data.length);
		ns.tprint("HALP! DATA NOT THE RIGHT SIZE!: " + data.length);
		ns.exit();
	}

	let startingArray = getStartingArray(ns, data);
	ns.print(startingArray);

	let allArrays = [];
	allArrays.push(JSON.stringify(startingArray));

	let result = startingArray;
	do{
		result = getNextArray(result);
		if (result != null) {
			allArrays.push(JSON.stringify(result));
		}
	}
	while (result != null);

	let resultArray = [];
	let resultSet = new Set();

	for (const next of allArrays) {
		let combos = getCombinations(JSON.parse(next));
		let result = getIpsFromCombos(ns, data, combos);
		ns.print(result);

		for (const str of result) {
			if (resultSet.has(str)) {
				continue;
			}
			resultSet.add(str);
			resultArray.push(str);
		}
	}

	ns.print(resultArray);

	resultArray = validateIps(ns, resultArray);

	ns.print(resultArray);

	let attemptResponse = ns.codingcontract.attempt(resultArray, filename, servername);
	if(attemptResponse) {
		ns.tprint("Solved coding contract!");
		await ns.write("contracts_completed.txt", filename, "a");
	} else {
		ns.tprint("Coding contract failed!!");
	}
}