function findServer(ns, serverName, current = "home", set = new Set(), path=[]) {
	ns.tprint(current);
	if(serverName == current) {
        path.unshift(serverName);
        return path;
    }
    
    let connections = ns.scan(current)
	let next = connections.filter(c => {
		if(!set.has(c) && !c.startsWith("home")) {
			return true;
		}

		return false;

	})

    let found = false;
    let chain = [];

	next.forEach(n => {
		if(found) {
            return [];
        }
        
        set.add(n);
		let result = findServer(ns, serverName, n, set)
        if(result.length > 0) {
            found = true;
            chain=result;
        }

        return result;
	})

	if(found && !current.startsWith("home")) {
		chain.unshift(current);
	}

	return chain;
}

/** @param {NS} ns */
export async function main(ns) {
	//ns.connect("home");
	//findServer(ns, serverName, current = "home", set = new Set(), path=[]) {
	ns.tprint(findServer(ns, "CSEC"));
}