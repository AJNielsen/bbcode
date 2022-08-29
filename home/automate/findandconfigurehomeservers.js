function getCurrentHomes(ns) {
    let result = ns.scan("home");

    let homes = [];

    for (const server of result) {
        if (server == "home") {
            continue;
        }

        if (!server.startsWith("home")) {
            continue;
        }

        homes.push(server);
    }

    homes = homes.sort();

    return homes;
}

/** @param {NS} ns */
export async function main(ns) {
    let homes = getCurrentHomes(ns);

    if(homes.length < 25) {
        ns.spawn("automate/purchasehomeservers.js", 1, JSON.stringify(homes));
        return;
    }
}