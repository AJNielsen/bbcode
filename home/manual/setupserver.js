function getThreads(totalRam, ns) {
    let count = 0;
    let weakBase = 1.95;
    let growBase = 1.95*8;
    let hackBase = 1.9;



    let weak = 0;
    let grow = 0;
    let hack = 0;

    while ((weak + grow + hack) < totalRam) {
        count++;
        weak = weakBase * count;
        grow = growBase * count;
        hack = hackBase * count;
    }
    count--;

    if(count < 1) {
        count = 1;
    }

    return count;
}

/** @param {NS} ns */
async function runAtLeastEightGig(serverName, target, totalRam, ns) {
    let files = [];
    files.push("hack.js");
    files.push("grow.js");
    files.push("weaken.js");
    files.push("servername.txt");
    files.push("hackthresholds.txt");

    await ns.write("servername.txt", target, "w");
    await ns.write("hackthresholds.txt", "1\n0.75", "w");

    let result = await ns.scp(files, serverName);

    if (!result) {
        ns.tprint("Copy to server[" + serverName + "] failed!");
        return;
    }

    let threads = getThreads(totalRam, ns);
    ns.exec("weaken.js", target, threads);
    ns.exec("grow.js", target, (threads * 8));
    ns.exec("hack.js", target, threads);

    // let threads = 52;
    // ns.killall(serverName);
    // ns.exec("weaken.js", serverName, threads * 8);
    // ns.exec("grow.js", serverName, threads * 8 * 8);
    // ns.exec("hack.js", serverName, threads * 8);
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
    let serverName = ns.args[0];
    let target = ns.args[1];

    if (target == undefined) {
        target = serverName;
    }

    let maxRam = ns.getServerMaxRam(serverName);

    if (maxRam < 4) {
        ns.tprint("Servers with less than 4GB of RAM are unsupported.");
        return;
    }

    if (maxRam == 4) {
        await runFourGig(serverName, ns);
        return;
    }

    await runAtLeastEightGig(serverName, target, maxRam, ns);
}