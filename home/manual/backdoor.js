function findServer(ns, serverName, current = "home", set = new Set(), path = []) {
    //ns.tprint(current);
    if (serverName == current) {
        path.unshift(serverName);
        return path;
    }

    let connections = ns.scan(current)
    let next = connections.filter(c => {
        if (!set.has(c) && !c.startsWith("home")) {
            return true;
        }

        return false;

    })

    let found = false;
    let chain = [];

    next.forEach(n => {
        if (found) {
            return [];
        }

        set.add(n);
        let result = findServer(ns, serverName, n, set)
        if (result.length > 0) {
            found = true;
            chain = result;
        }

        return result;
    })

    if (found && !current.startsWith("home")) {
        chain.unshift(current);
    }

    return chain;
}

async function backdoorServersIfPossible(ns) {
    let serverList = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];

    for (let i = 0; i < serverList.length; ++i) {

        let serverName = serverList[i];

        let serverDetails = ns.getServer(serverName);

        //We already installed the backdoor.
        if (serverDetails.backdoorInstalled) {
            continue;
        }

        //Without root access there is no installing backdoor.
        if (!ns.hasRootAccess(serverName)) {
            continue;
        }

        //If we don't have the level skip it!
        if (ns.getServerRequiredHackingLevel(serverName) > ns.getHackingLevel()) {
            continue;
        }

        let serverChain = findServer(ns, serverName);

        if(!ns.singularity.connect("home")) {
			continue;
		}

		let success = true;
        for (let i = 0; i < serverChain.length; ++i) {
            if(!ns.singularity.connect(serverChain[i]))
			{
				success = false;
				i = serverChain.length;
				continue;
			}
        }

		if(success) {
			await ns.singularity.installBackdoor();
		}
    }
}

/** @param {NS} ns */
export async function main(ns) {
	await backdoorServersIfPossible(ns);

	ns.spawn("manual/backdoor.js");
}