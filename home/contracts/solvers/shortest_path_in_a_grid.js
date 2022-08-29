//Solver for Shortest Path in a Grid
function findShortestPath(ns, data, pos, path = "", solutions = [], visited = new Set()) {	
	if (visited.has(pos)) {
		return null;
	}

	let nums = pos.split("|");

	let row = Number(nums[0]);

	if (row < 0 || row >= data.length) {
		return null;
	}

	let column = Number(nums[1]);

	if (column < 0 || column >= data[0].length) {
		return null;
	}

	visited.add(pos);

	let posVal = data[row][column];

	if (posVal == 1) {
		return null;
	}

	if (row == data.length - 1 && column == data[0].length - 1) {
		ns.tprint("Found the end!");
		
		solutions.push(path);
		return solutions;
	}

	let result;

	result = findShortestPath(ns, data, String(row) + "|" + String(column + 1), (path + "R"), solutions, visited);
	if (result != null) {
		solutions = result;
	}

	result = findShortestPath(ns, data, String(row + 1) + "|" + String(column), (path + "D"), solutions, visited);
	if (result != null) {
		solutions = result;
	}

	result = findShortestPath(ns, data, String(row - 1) + "|" + String(column), (path + "U"), solutions, visited);
	if (result != null) {
		solutions = result;
	}

	result = findShortestPath(ns, data, String(row) + "|" + String(column + 1), (path + "L"), solutions, visited);
	if (result != null) {
		solutions = result;
	}

	return solutions;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);

	let solutions = findShortestPath(ns, data, "0|0");

	ns.print("Found Solutions!");
	ns.print(solutions);

	if(solutions.length == 0) {
		ns.tprint(data);
		ns.exit();
		return;
	}

	if(solutions.length > 1) {
		ns.tprint("Multiple solutions found. Implement selection.")
		ns.exit();
		return;
	}

	let response = ns.codingcontract.attempt(solutions[0], filename, servername);
	ns.tprint("Coding attempt response");
	ns.tprint(response);

	if(response) {
		await ns.write("contracts_completed.txt", filename, "a");
	}
}