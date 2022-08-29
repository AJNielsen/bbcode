let datafile = "core_data.txt";
let statedata = {};
let loaded = false;

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function getRawData(ns) {
    let raw = ns.read(datafile);
    if (raw == null || raw == "") {
        return "";
    }

    return raw;
}

function initializeStateData(ns) {
    return {
        "LastUpdated": new Date(),
        "BitNode": {
            "State": "New"
        },
        "Wipe": {
            "State": "New"
        },
        "Augments": {
            "Owned": [],
            "Unowned": []
        }
    };
}

export function init() {
    statedata = {};
    loaded = false;
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export function getSavedData(ns) {
    if (loaded) {
        return statedata;
    }

    if (ns == null || ns == undefined) {
        throw "WHAT THE HECK!"
        //return null;
    }

    let raw = getRawData(ns);
    if (raw == "") {
        statedata = initializeStateData(ns);
    } else {
        statedata = JSON.parse(raw);
    }

    loaded = true;

    return statedata;
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function saveStateData(ns) {
    ns.tprint(JSON.stringify(statedata));
    await ns.write(datafile, JSON.stringify(statedata), "w");
}

export function updateOwnedAugments(ownedAugments) {
    if (!Array.isArray(ownedAugments)) {
        return;
    }

    statedata.LastUpdated = new Date();
    statedata.Augments.Owned = ownedAugments;
}