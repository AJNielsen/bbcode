function setupFactionDetails() {
    let installRequiredFactionDetails = {
        "Complete": false,
        "InstalledAugments": [],
        "ServerName": ""
    };

    let factionDetails = {
        "CyberSec": installRequiredFactionDetails,
        "NiteSec": installRequiredFactionDetails,
        "The Black Hand": installRequiredFactionDetails,
        "BitRunners": installRequiredFactionDetails,
    };

    factionDetails["CyberSec"].ServerName = "CSEC";
    factionDetails["NiteSec"].ServerName = "avmnite-02h";
    factionDetails["The Black Hand"].ServerName = "I.I.I.I";
    factionDetails["BitRunners"].ServerName = "run4theh111z";

    return factionDetails;
}

function getKnownFactions(ns) {
    let knownFactions = ns.read("knownfactions.txt");
    if (knownFactions == null || knownFactions == "") {
        knownFactions = [];
    } else {
        knownFactions = JSON.parse(knownFactions);
    }

    return knownFactions;
}

async function saveKnownFactions(ns, knownFactions) {
    await ns.write("knownfactions.txt", JSON.stringify(knownFactions), "w");
}

function findAnyOtherFactions(ns, knownFactions) {
    let invitations = ns.singularity.checkFactionInvitations();

    for (let i = 0; i < invitations.length; ++i) {
        if (knownFactions.includes(invitations[i])) {
            continue;
        }

        knownFactions.push(invitations[i]);
    }

    return knownFactions;
}

function ensureFactionDetailsHasFaction(ns, factionDetails, knownFactions) {
    for (let i = 0; i < knownFactions; ++i) {
        if (factionDetails.hasOwnProperty(knownFactions[i])) {
            continue;
        }

        factionDetails[knownFactions[i]] = {
            "Complete": false,
            "InstalledAugments": [],
        };
    }

    return factionDetails;
}

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

async function backdoorServersIfPossible(ns, factionDetails) {
    let faction = ["CyberSec", "NiteSec", "The Black Hand", "BitRunners"];

    for (let i = 0; i < faction.length; ++i) {
        if (factionDetails[faction[i]].Complete) {
            continue;
        }

        let serverName = factionDetails[faction[i]].ServerName;

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

        ns.connect("home");
        for (let i = 0; i < serverChain.length; ++i) {
            ns.connect(serverChain[i]);
        }

        let currentServer = ns.singularity.getCurrentServer();

        if (currentServer == serverName) {
            await ns.singularity.installBackdoor();
        }
    }

    return factionDetails;
}

/** @param {NS} ns */
export async function main(ns) {
    let factionDetails = ns.read("factiondetails.txt");
    if (factionDetails == null || factionDetails == "") {
        factionDetails = setupFactionDetails();
    } else {
        factionDetails = JSON.parse(factionDetails);
    }

    let knownFactions = getKnownFactions(ns);
    knownFactions = findAnyOtherFactions(ns, knownFactions);
    await saveKnownFactions(ns, knownFactions);

    factionDetails = ensureFactionDetailsHasFaction(ns, factionDetails, knownFactions);

    factionDetails = await backdoorServersIfPossible(ns, factionDetails);

    await ns.write("factiondetails.txt", JSON.stringify(factionDetails), "w");

    ns.spawn("automate/augments/getaugments.js");
}