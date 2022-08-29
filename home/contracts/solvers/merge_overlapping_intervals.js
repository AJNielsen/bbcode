function getHighValue(ns, lowVal, highVal, obj) {
	if (obj[lowVal] == null || obj[lowVal] == undefined) {
		if(lowVal == highVal) {
			return highVal;
		}
		
		if (lowVal > highVal) {
			ns.tprint("WTF: LowVal = " + lowVal);
			throw "WTF!";
		}

		lowVal++;
		return getHighValue(ns, lowVal, highVal, obj);
	}

	let upper = obj[lowVal].upper;

	if (upper < highVal) {
		upper = highVal;
	}

	if (lowVal == upper) {
		return upper;
	}

	lowVal++;
	return getHighValue(ns, lowVal, upper, obj);
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);

	let obj = {};
	let min = -1;
	let max = -1;

	for (const kv of data) {
		if (min == -1) {
			min = kv[0];
		}

		if (max == -1) {
			max = kv[1];
		}

		if (min > kv[0]) {
			min = kv[0];
		}

		if (max < kv[1]) {
			max = kv[1];
		}

		let pair = { "lower": kv[0], "upper": kv[1] };

		if (obj[kv[0]] != null) {
			if (obj[kv[0]].upper < kv[1]) {
				obj[kv[0]].upper = kv[1];
			}
		} else {
			obj[kv[0]] = pair;
		}

		if (obj[kv[1]] != null) {
			if (obj[kv[1]].lower > kv[0]) {
				obj[kv[1]].lower = kv[0];
			}
		} else {
			obj[kv[1]] = pair;
		}
	}

	let answer = [];

	let current = min;

	while (current < max) {
		if(obj[current] == null) {
			current++;
			continue;
		}
		
		let high = obj[current];

		ns.print("Current: " + current + " |  High" +high + " | OBJ: " + JSON.stringify(obj));
		let r = getHighValue(ns, current, high, obj);

		if (r == -1) {
			current++;
			continue;
		}

		answer.push([current, r]);
		current = r + 1;
	}

	//ns.tprint(answer);

	let result = ns.codingcontract.attempt(answer, filename, servername);
	if(result) {
		await ns.write("contracts_completed.txt", filename, "a");
		ns.tprint("Completed contract: " + filename);
	} else {
		ns.tprint("failed attempt");
	}
}