/**
 * returns an array of servers dynamically
 */
function dpList(ns, current="home", set=new Set()) {
    let connections = ns.scan(current)
    let next = connections.filter(c => !set.has(c))
    next.forEach(n => {
        set.add(n);
        return dpList(ns, n, set)
    })
    return Array.from(set.keys())
}

/** @param {NS} ns */
export async function main(ns) {
	let set = new Set();
	set.add("home");

	let servers = dpList(ns, "home", set);

	let count = 0;
	let countAvailableServers = 0;

	let lowestValue = 22500000000;
	let maxVal = 0;

	for(const name of servers) {
		let serverMoney = ns.getServerMaxMoney(name);

		if (serverMoney == 0) {
			continue;
		}

		count++;

		//ns.tprint("Server["+name+"] max value[" + serverMoney + "]");

		if(ns.hasRootAccess(name)) {
			countAvailableServers++;
			//ns.tprint("Server["+name+"] max value[" + serverMoney + "]");
			if (serverMoney > maxVal) {
				maxVal = serverMoney;
				ns.tprint("Server["+name+"] max value[" + serverMoney + "]");
			}
		}

		if(serverMoney < lowestValue && serverMoney != 1750000) {
			lowestValue = serverMoney;
		}
	}

	//ns.tprint("Total Servers: "+count);
	ns.tprint("Hackable Servers: "+countAvailableServers);
	//ns.tprint("Lowest Value: "+lowestValue);
	ns.tprint("Highest Value: "+ maxVal);
}