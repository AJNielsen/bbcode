function clearPrimedIfComplete(ns) {
	let primedServers = ns.read("automate_primedservers.txt");
	if (primedServers == "") {
		primedServers = JSON.parse("[]");
	} else {
		primedServers = JSON.parse(primedServers);
	}

	ns.print("Primed Servers: " + primedServers);

	let topTwenetyFiveServers = ns.read("automate_twentyfive.txt");
	if (topTwenetyFiveServers == "") {
		ns.print("Top twenty five servers is empty. Nothing to do.");
		return;
	} else {
		topTwenetyFiveServers = JSON.parse(topTwenetyFiveServers);
	}

	ns.print("Top 25 Servers: " + topTwenetyFiveServers);

	let serversToPrime = JSON.parse("[]");

	ns.print("Filtering primed servers.");
	for (const server of topTwenetyFiveServers) {
		if (primedServers.includes(server)) {
			continue;
		}

		serversToPrime.push(server);
	}

	if (serversToPrime.length == 0) {
		ns.rm("automate_primedservers.txt");
	}
}

function getMemorySegmentSize(ns) {
	let max = ns.getServerMaxRam("home");
	max = max-32;
	if(max <= 0) {
		return 0;
	}

	//Share will run at 1 part(but cost 2), 2 parts for weak, 8 parts for grow
	return Math.floor(max/12);
}

function getWeakThreads(ns) {
	//Segment Size * 2 for Weak
	let size = getMemorySegmentSize(ns) * 2;

	if(size == 0) {
		ns.print("Weak Threads: 1 - LOW SERVER RAM");
		return 1;
	}

	let threads = Math.floor(size/2);

	if (threads < 1) {
		ns.print("Weak Threads: 1");
		return 1;
	}

	ns.print("Weak Threads: " + threads);
	return threads;
}

function getGrowThreads(ns) {
	//Grow gets the most memory to use with 8 of 12 parts.
	let size = getMemorySegmentSize(ns) * 8;

	if(size == 0) {
		ns.print("Grow Threads: 1 - LOW SERVER RAM");
		return 1;
	}

	let threads = Math.floor(size/2);

	if (threads < 1) {
		ns.print("Grow Threads: 1");
		return 1;
	}

	ns.print("Grow Threads: " + threads);
	return threads;
}

function getShareThreads(ns) {
	//Share gets only one part so no multiplier. Memory usage is like using 2 parts though.
	let size = getMemorySegmentSize(ns);

	if(size == 0) {
		ns.print("Share Threads: 1 - LOW SERVER RAM");
		return 1;
	}

	let threads = Math.floor(size/2);

	if (threads < 1) {
		ns.print("Share Threads: 1");
		return 1;
	}

	ns.print("Share Threads: " + threads);
	return threads;
}


/** @param {NS} ns */
export async function main(ns) {
	let weakScript = ns.getRunningScript("/automate/autoprimeweak.js");
	let growScript = ns.getRunningScript("/automate/autoprimegrow.js");
	let shareScript = ns.getRunningScript("/automate/autoshare.js");

	clearPrimedIfComplete(ns);

	if (weakScript == null) {
		ns.run("automate/autoprimeweak.js", getWeakThreads(ns));
	} else {
		ns.print("Prime weak running");
	}

	if (growScript == null) {
		ns.run("automate/autoprimegrow.js", getGrowThreads(ns));
	} else {
		ns.print("prime grow running");
	}

	if (shareScript == null) {
		ns.run("automate/autoshare.js", getShareThreads(ns));
	} else {
		ns.print("prime share running");
	}

	ns.spawn("automate/checkaugments.js");
}