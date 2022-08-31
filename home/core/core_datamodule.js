let datafile = "core_data.txt";
var statedata = {};

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

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function loadStateData(ns) {
    let raw = getRawData(ns);
    if (raw == "") {
        statedata = initializeStateData(ns);
    } else {
        statedata = JSON.parse(raw);
    }
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export function initDataModule(ns) {
    loadStateData(ns);
}

export function getSavedData() {
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