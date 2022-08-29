function spawnNextScript(ns) {
	ns.spawn("automate/onepercenthacknet.js");
}

function getNodeDetailsWithNumber(ns, sourceFiles, number) {
	
	//[{"n":1,"lvl":1},{"n":5,"lvl":1}]
	for(let i=0; i<sourceFiles.length; ++i) {
		if(sourceFiles[i].n == number) {
			return sourceFiles[i];
		}
	}

	return null;
}

function getNextNode(ns, sourceFiles) {
	let nodeFourDetails = getNodeDetailsWithNumber(ns, sourceFiles, 4);
	if(nodeFourDetails == null || nodeFourDetails.lvl < 2) {
		return 4;
	}

	let nodeFiveDetails = getNodeDetailsWithNumber(ns, sourceFiles, 5);
	if(nodeFiveDetails == null || nodeFiveDetails.lvl < 2) {
		return 5;
	}

	let nodeTenDetails = getNodeDetailsWithNumber(ns, sourceFiles, 10);
	if(nodeTenDetails == null || nodeTenDetails.lvl < 2) {
		return 10;
	}

	//TODO: Add more!

	return 12;
}

/** @param {NS} ns */
export async function main(ns) {
	let connections = ns.scan("w0r1d_d43m0n");

	if(connections.length == 0) {
		spawnNextScript(ns);
		return;
	}

	ns.print("w0r1d_d43m0n is here! Destroy it!");
	ns.tprint("w0r1d_d43m0n is here! Destroy it!");

	let hackLevel = ns.getServerRequiredHackingLevel("w0r1d_d43m0n");

	ns.print("w0r1d_d43m0n requires hack level of: " + hackLevel);
	ns.tprint("w0r1d_d43m0n requires hack level of: " + hackLevel);

	let currentHackLevel = ns.getHackingLevel();

	if(currentHackLevel < hackLevel) {
		ns.print("Current Hack Level[" + currentHackLevel + "] too low. Required: " + hackLevel);
		spawnNextScript(ns);
		return;
	}

	let root = ns.hasRootAccess("w0r1d_d43m0n");

	if(!root) {
		ns.print("Do not have root acces to w0r1d_d43m0n");
		spawnNextScript(ns);
		return;
	}

	let sourceFiles = ns.singularity.getOwnedSourceFiles();
	ns.print(sourceFiles);
	ns.tprint(sourceFiles);

	let nextNodeNumber = getNextNode(ns, sourceFiles);
	ns.print(nextNodeNumber);
	ns.tprint(nextNodeNumber);

	ns.singularity.destroyW0r1dD43m0n(nextNodeNumber, "bitnode_start.js");
	spawnNextScript(ns);
}