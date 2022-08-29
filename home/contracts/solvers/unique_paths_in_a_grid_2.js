//Solver for Unique Paths in a Grid II
/*
You are located in the top-left corner of the following grid:

 0,0,0,
0,0,0,
0,1,0,
0,0,0,
0,0,1,
0,1,1,
0,0,1,
0,0,0,

 You are trying reach the bottom-right corner of the grid, but you can only move down or right on each step. Furthermore, there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

 Determine how many unique paths there are from start to finish.

 NOTE: The data returned for this contract is an 2D array of numbers representing the grid.

[[0,0,0],[0,0,0],[0,1,0],[0,0,0],[0,0,1],[0,1,1],[0,0,1],[0,0,0]]
 */
function findEnd(ns, data, pos, pathsFound=0) {
	let splitPos = pos.split("|");
	let row = Number(splitPos[0]);
	let column = Number(splitPos[1]);

	if(row > data.length-1) {
		return pathsFound;
	}

	if(column > data[0].length-1) {
		return pathsFound;
	}

	if(data[row][column]== 1) {
		return pathsFound;
	}

	if(data.length-1 == row && column == data[0].length-1) {
		pathsFound++;
		return pathsFound;
	}

	pathsFound = findEnd(ns, data, String(row+1)+"|"+String(column), pathsFound);
	pathsFound = findEnd(ns, data, String(row)+"|"+String(column+1), pathsFound);

	return pathsFound;
}

/** @param {NS} ns */
export async function main(ns) {
	let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let pathsFound = findEnd(ns, data, "0|0");

	ns.tprint("Paths found: " + pathsFound);

	let attemptResult = ns.codingcontract.attempt(pathsFound, filename, servername);

	if(attemptResult) {
		ns.tprint("Completed coding contract!");
	} else {
		ns.tprint("Attempt failed!!");
	}
}