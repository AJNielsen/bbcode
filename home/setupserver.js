function getSizeConfig(ns) {
    let serverSizeConfigJson = ns.read("automate_configsize.txt");

    if (serverSizeConfigJson == "") {
        throw "Server Size Config is empty. Fix before running.";
    }

    return JSON.parse(serverSizeConfigJson);
}

/** @param {NS} ns */
async function runAtLeastEightGig(target, totalRam, ns) {
    let files = [];
    files.push("hack.js");
    files.push("grow.js");
    files.push("weaken.js");
    files.push("servername.txt");
    files.push("hackthresholds.txt");

    await ns.write("servername.txt", target, "w");
    await ns.write("hackthresholds.txt", "1\n0.75", "w");

    let result = await ns.scp(files, target);

    if (!result) {
        ns.tprint("Copy to server[" + target + "] failed!");
        return;
    }

    let sizeConfig = getSizeConfig(ns);
    let ramThreads = sizeConfig[totalRam];

    ns.exec("weaken.js", target, ramThreads["weaken"]);
    ns.exec("grow.js", target, ramThreads["grow"]);
    ns.exec("hack.js", target, ramThreads["hack"]);    
}

/** @param {NS} ns */
async function runFourGig(target, ns) {
    let files = [];
    files.push("fourgigserver.js");
    files.push("servername.txt");
    await ns.write("servername.txt", target, "w");

    let result = await ns.scp(files, target);

    if (!result) {
        ns.tprint("Copy to server[" + target + "] failed!");
        return;
    }

    ns.exec("fourgigserver.js", target, 2);
}

/** @param {NS} ns */
export async function main(ns) {

    let serversToSetupData = ns.read("notsetupservers.txt");
    let serversToSetup = serversToSetupData.split("\n");

    for (const server of serversToSetup) {
        if(!ns.serverExists(server)) {
            continue;
        }


        let maxRam = ns.getServerMaxRam(server);

        if (maxRam < 4) {
            //ns.tprint("Servers with less than 4GB of RAM are unsupported.");
            continue;
        }

        if (maxRam == 4) {
            await runFourGig(server, ns);
            continue;
        }
        await runAtLeastEightGig(server, maxRam, ns);
    }

    ns.spawn("order66.js");
}