/** @param {NS} ns */
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

    return homes;
}

/** @param {NS} ns */
async function buyNewServer(ns, size) {
    if (size % 2 != 0) {
        ns.tprint("Value[" + size + "] is not a multiple of 2.");
        return;
    }

    let count = 1;

    let exists = false;
    let serverName = "";
    do {
        serverName = "home" + count++;
        exists = ns.serverExists(serverName);
        await ns.sleep(100);
    } while (exists);

    return ns.purchaseServer(serverName, size);
}

/** @param {NS} ns */
function buyNewServerWithName(ns, size, name) {
    if (size % 2 != 0) {
        ns.tprint("Value[" + size + "] is not a multiple of 2.");
        return;
    }

    return ns.purchaseServer(name, size);
}

/** @param {NS} ns */
async function setupServer(ns, serverName, target, totalRam, sizeConfig) {
    let files = [];
    files.push("hack.js");
    files.push("grow.js");
    files.push("weaken.js");
    files.push("shareme.js");
    files.push("servername.txt");
    files.push("hackthresholds.txt");

    await ns.write("servername.txt", target, "w");
    //TODO: Set low thresholds and then update them.
    await ns.write("hackthresholds.txt", "0.01\n0.005", "w");

    let result = await ns.scp(files, serverName);

    if (!result) {
        ns.tprint("Copy to server[" + serverName + "] failed!");
        return;
    }

    let ramThreads = sizeConfig[totalRam];

    ns.exec("weaken.js", serverName, ramThreads["weaken"]);
    ns.exec("grow.js", serverName, ramThreads["grow"]);
    ns.exec("hack.js", serverName, ramThreads["hack"]);
    if (ramThreads["share"] > 0) {
        ns.exec("shareme.js", serverName, ramThreads["share"]);
    }
}

function spawnNext(ns) {
    ns.spawn("automate/runhomeprimer.js");
}

function ensureScriptsRunning(ns, serverName) {
    let processes = ns.ps(serverName);

    let hackrun = false;
    let growrun = false;
    let weakrun = false;
    //let shareme = false;

    for (const proc of processes) {
        if (proc.filename == "hack.js") {
            hackrun = true;
        }

        if (proc.filename == "grow.js") {
            hackrun = true;
        }

        if (proc.filename == "weaken.js") {
            hackrun = true;
        }

        // if (proc.filename == "shareme.js") {
        //     shareme = true;
        // }
    }

    //if (!hackrun || !growrun || !weakrun || !shareme) {
    if (!hackrun || !growrun || !weakrun) {
        return false;
    }

    return true;
}

async function updateHome(ns, homeServer, homeDictionary, serverName, serverSize, sizeConfig) {
    ns.print("Updating home: " + homeServer);
    if (ns.getServerMaxRam(homeServer) < serverSize) {
        ns.print("Server " + homeServer + " should be updated.");
        if (ns.getPurchasedServerCost(serverSize) > ns.getServerMoneyAvailable("home")) {
            ns.print("Cannot afford upgrading server. Doing maintainence.");
        } else {
            ns.killall(homeServer);

            if (!ns.deleteServer(homeServer)) {
                await setupServer(ns, homeServer, serverName, ns.getServerMaxRam(homeServer), sizeConfig);
                ns.print("Failed to delete server for some reason. Skipping processing this server for now.");
                return homeDictionary;
            }

            buyNewServerWithName(ns, serverSize, homeServer);

            await setupServer(ns, homeServer, serverName, serverSize, sizeConfig);
            homeDictionary[homeServer] = serverName;
            return homeDictionary;
        }
    }

    await ns.scp("servername.txt", "home", homeServer);
    let readName = ns.read("servername.txt");

    if (readName != serverName) {
        // await ns.write("servername.txt", serverName, "w");
        // ns.scp("servername.txt", homeServer);
        // let serverProceses = ns.ps(homeServer);
        // for (const process of serverProceses) {
        //     let processName = process.name;
        //     let threads = process.threads;
        //     if (processName == "hack.js" || processName == "weaken.js" || processName == "grow.js") {
        //         ns.kill(process.pid, homeServer);
        //         ns.exec(processName, homeServer, threads);
        //     }
        // }
        ns.killall(homeServer);
        await setupServer(ns, homeServer, serverName, ns.getServerMaxRam(homeServer), sizeConfig);
    }
    else if (!ensureScriptsRunning(ns, homeServer)) {
        await setupServer(ns, homeServer, serverName, ns.getServerMaxRam(homeServer), sizeConfig);
    }

    homeDictionary[homeServer] = serverName;
    return homeDictionary;
}

async function newHome(ns, serverName, serverSize, sizeConfig) {
    if (ns.getPurchasedServerCost(serverSize) > ns.getServerMoneyAvailable("home")) {
        ns.print("Cannot afford a new server at this time.");
        spawnNext(ns);
    }

    let newHome = await buyNewServer(ns, serverSize);

    await setupServer(ns, newHome, serverName, serverSize, sizeConfig);
}

function getTopServers(ns) {
    let topServersBlob = ns.read("automate_twentyfive.txt");
    if (topServersBlob == "") {
        return JSON.parse("[]");
    }

    return JSON.parse(topServersBlob);
}

function getHomeDictionary(ns) {
    let homeDictionaryBlob = ns.read("automate_homedictionary.txt");

    return JSON.parse(homeDictionaryBlob);
}

function setMaxServerSize(ns) {
    let homes = getCurrentHomes(ns);

    let max = 2048;

    let allServersMax = true;

    for (let i = 0; i < homes.length; ++i) {
        let serverName = homes[i];
        let ram = ns.getServerMaxRam(serverName);
        if (ram < max) {
            allServersMax = false;
        }
    }

    if (allServersMax) {
        max = 16384;
    }

    return max;
}

/** @param {NS} ns */
async function getServerSize(ns) {
    let minServerSize = Number(ns.read("automate_currentminserversize.txt"));
    if (minServerSize == 0) {
        minServerSize = 8;
    }

    let currentMoney = ns.getServerMoneyAvailable("home") / 5;
    let next = minServerSize * 2;
    let cost = ns.getPurchasedServerCost(next);

    let maxServerSize = setMaxServerSize(ns);

    while (cost < currentMoney && minServerSize < maxServerSize) {
        minServerSize = next;
        next = next * 2;
        ns.tprint(minServerSize);
        cost = ns.getPurchasedServerCost(next);
    }

    await ns.write("automate_currentminserversize.txt", minServerSize, "w");

    return minServerSize;
}

function getSizeConfig(ns) {
    let serverSizeConfigJson = ns.read("automate_configsize.txt");

    if (serverSizeConfigJson == "") {
        throw "Server Size Config is empty. Fix before running.";
    }

    return JSON.parse(serverSizeConfigJson);
}

/** @param {NS} ns */
export async function main(ns) {
    let currentHomes = getCurrentHomes(ns);
    let homeDictionary = getHomeDictionary(ns);
    let topServers = getTopServers(ns);

    if (topServers.length == 0) {
        spawnNext(ns);
        return;
    }

    let serverSize = await getServerSize(ns);
    let sizeConfig = getSizeConfig(ns);

    if (currentHomes.length < 25) {
        let remaining = 25 - currentHomes.length;
        let topServersSize = topServers.length;

        topServersSize = topServersSize - currentHomes.length;

        if (topServersSize > 0) {

            if (topServersSize < remaining) {
                remaining = topServersSize;
            }

            for (let i = 0; i < remaining; ++i) {
                let newTopServer = topServers.shift();
                await newHome(ns, newTopServer, serverSize, sizeConfig);
            }
        }
    }

    topServers = topServers.reverse();

    currentHomes.sort();

    for (const home of currentHomes) {
        let serverName = topServers.shift();
        homeDictionary = await updateHome(ns, home, homeDictionary, serverName, serverSize, sizeConfig);
        await ns.write("automate_homedictionary.txt", JSON.stringify(homeDictionary), "w");
    }

    spawnNext(ns);
}