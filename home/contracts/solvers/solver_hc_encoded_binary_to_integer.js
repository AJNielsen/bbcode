function checkOdds(data) {
	let parityBit = data[1];
	let oneCount = -1;
	for (let i = 3; i < data.length; i = i + 2) {
		if (data[i] === "1") {
			if (oneCount == -1) {
				oneCount = 0;
			}
			oneCount++;
		}
	}

	if (oneCount % 2 == 0 && parityBit == "1") {
		return false;
	} else if (oneCount % 2 == 1 && parityBit == "0") {
		return false;
	}

	return true;
}

function checkRightBlock(ns, data) {
	let parityBit = data[2];
	let checkData = [data[3], data[6], data[7], data[10], data[11], data[14], data[15]];

	let oneCount = -1;
	for (const num of checkData) {
		if (num == "1") {
			if (oneCount == -1) {
				oneCount = 0;
			}
			oneCount++;
		}
	}

	if (oneCount % 2 == 0 && parityBit == "1") {
		return false;
	} else if (oneCount % 2 == 1 && parityBit == "0") {
		return false;
	}

	return true;
}

function checkSkipRowsParity(data) {
	let parityBit = data[4];
	let checkData = [data[5], data[6], data[7], data[12], data[13], data[14], data[15]];

	let oneCount = -1;
	for (const num of checkData) {
		if (num == "1") {
			if (oneCount == -1) {
				oneCount = 0;
			}
			oneCount++;
		}
	}

	if (oneCount % 2 == 0 && parityBit == "1") {
		return false;
	} else if (oneCount % 2 == 1 && parityBit == "0") {
		return false;
	}

	return true;
}

function checkBottomBlockParity(data) {
	let parityBit = data[8];
	let checkData = [data[9], data[10], data[11], data[12], data[13], data[14], data[15]];

	let oneCount = -1;
	for (const num of checkData) {
		if (num === "1") {
			if (oneCount == -1) {
				oneCount = 0;
			}
			oneCount++;
		}
	}

	if (oneCount % 2 == 0 && parityBit == "1") {
		return false;
	} else if (oneCount % 2 == 1 && parityBit == "0") {
		return false;
	}

	return true;
}

function removeIfExists(bitCheck, toRemove) {
	let result = [];
	for (const num of bitCheck) {
		if (toRemove.includes(num)) {
			continue;
		}
		result.push(num);
	}

	return result;
}

//Solver for HammingCodes: Encoded Binary to Integer
function correctBits(ns, data) {
	let oneCount = -1;
	for (const num of data) {
		if (num === "1") {
			if (oneCount == -1) {
				oneCount = 0;
			}
			oneCount++;
		}
	}

	//Is there no or an odd number of errors.
	let overallParity = false;
	if (oneCount % 2 == 0) {
		overallParity = true;
	}

	let oddParity = checkOdds(data);
	let rightParity = checkRightBlock(ns, data);
	let skipRowParity = checkSkipRowsParity(data);
	let bottomBlockParity = checkBottomBlockParity(data);

	if (bottomBlockParity && skipRowParity && rightParity && oddParity && overallParity) {
		return data;
	}
	else {
		ns.print("ODD:" + oddParity);
		ns.print("Right:" + rightParity);
		ns.print("Skip:" + skipRowParity);
		ns.print("Bottom:" + bottomBlockParity);
		ns.print("Overall:" + overallParity);
	}

	var bitCheck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	if (!oddParity && rightParity) {
		//column[0]
		bitCheck[0] = -1;
		bitCheck[4] = -1;
		bitCheck[8] = -1;
		bitCheck[12] = -1;

		//column[2]
		bitCheck[2] = -1;
		bitCheck[6] = -1;
		bitCheck[10] = -1;
		bitCheck[14] = -1;

		//column[3]
		bitCheck[3] = -1;
		bitCheck[7] = -1;
		bitCheck[11] = -1;
		bitCheck[15] = -1;
	}
	else if (oddParity && rightParity) {
		//Column[1]
		bitCheck[1] = -1;
		bitCheck[5] = -1;
		bitCheck[9] = -1;
		bitCheck[13] = -1;

		//column[2]
		bitCheck[2] = -1;
		bitCheck[6] = -1;
		bitCheck[10] = -1;
		bitCheck[14] = -1;

		//column[3]
		bitCheck[3] = -1;
		bitCheck[7] = -1;
		bitCheck[11] = -1;
		bitCheck[15] = -1;
	} else if (oddParity && !rightParity) {
		//column[0]
		bitCheck[0] = -1;
		bitCheck[4] = -1;
		bitCheck[8] = -1;
		bitCheck[12] = -1;

		//Column[1]
		bitCheck[1] = -1;
		bitCheck[5] = -1;
		bitCheck[9] = -1;
		bitCheck[13] = -1;
	} else if (!oddParity && !rightParity) {
		//column[0]
		bitCheck[0] = -1;
		bitCheck[4] = -1;
		bitCheck[8] = -1;
		bitCheck[12] = -1;

		//Column[1]
		bitCheck[1] = -1;
		bitCheck[5] = -1;
		bitCheck[9] = -1;
		bitCheck[13] = -1;

		//column[2]
		bitCheck[2] = -1;
		bitCheck[6] = -1;
		bitCheck[10] = -1;
		bitCheck[14] = -1;
	}

	if (skipRowParity && bottomBlockParity) {
		//Row[1]
		bitCheck[4] = -1;
		bitCheck[5] = -1;
		bitCheck[6] = -1;
		bitCheck[7] = -1;

		//Row[2]
		bitCheck[8] = -1;
		bitCheck[9] = -1;
		bitCheck[10] = -1;
		bitCheck[11] = -1;

		//Row[3]
		bitCheck[12] = -1;
		bitCheck[13] = -1;
		bitCheck[14] = -1;
		bitCheck[15] = -1;
	}
	else if (!skipRowParity && bottomBlockParity) {
		//Row[0]
		bitCheck[0] = -1;
		bitCheck[1] = -1;
		bitCheck[2] = -1;
		bitCheck[3] = -1;

		//Row[2]
		bitCheck[8] = -1;
		bitCheck[9] = -1;
		bitCheck[10] = -1;
		bitCheck[11] = -1;

		//Row[3]
		bitCheck[12] = -1;
		bitCheck[13] = -1;
		bitCheck[14] = -1;
		bitCheck[15] = -1;
	}
	else if (skipRowParity && !bottomBlockParity) {
		//Row[0]
		bitCheck[0] = -1;
		bitCheck[1] = -1;
		bitCheck[2] = -1;
		bitCheck[3] = -1;

		//Row[1]
		bitCheck[4] = -1;
		bitCheck[5] = -1;
		bitCheck[6] = -1;
		bitCheck[7] = -1;

		//Row[3]
		bitCheck[12] = -1;
		bitCheck[13] = -1;
		bitCheck[14] = -1;
		bitCheck[15] = -1;
	}
	else if (!skipRowParity && !bottomBlockParity) {
		//Row[0]
		bitCheck[0] = -1;
		bitCheck[1] = -1;
		bitCheck[2] = -1;
		bitCheck[3] = -1;

		//Row[1]
		bitCheck[4] = -1;
		bitCheck[5] = -1;
		bitCheck[6] = -1;
		bitCheck[7] = -1;

		//Row[2]
		bitCheck[8] = -1;
		bitCheck[9] = -1;
		bitCheck[10] = -1;
		bitCheck[11] = -1;
	}

	let remaining = [];

	for (const num of bitCheck) {
		if (num != -1) {
			remaining.push(num);
		}
	}

	if (remaining.length > 1) {
		ns.tprint("There is more than one remaining elment. HELP!");
		ns.exit();
		return;
	}

	let result = "";
	for (let i = 0; i < data.length; i++) {
		if (i == remaining[0]) {
			if (data[remaining[0]] == "1") {
				result = result + "0";
			} else {
				result = result + "1";
			}
			continue;
		}

		result = result + data[i];
	}

	return correctBits(ns, result);
}

function getDataBits(data) {
	let dataBits = "";
	
	for(let i = 3;i<data.length;i++) {
		if(i==4 || i==8) {
			continue;
		}

		dataBits = dataBits + data[i];
	}

	return dataBits;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	if (data.length != 16) {
		ns.tprint("Length of data for binary to integer unsupported. Length: " + data.length);
		ns.exit();
		return;
	}

	let result = correctBits(ns, data);
	//ns.tprint(result);

	let dataBits = getDataBits(result);
	ns.tprint(dataBits);

	let answer = parseInt(dataBits, 2);
	ns.tprint(answer);

	let attemptResponse = ns.codingcontract.attempt(String(answer), filename, servername);
	if(attemptResponse) {
		ns.tprint("Solved coding contract!");
		await ns.write("contracts_completed.txt", filename, "a");
	}
}