import { getSavedData, init, saveStateData, updateOwnedAugments } from "/core/core_datamodule.js";
import { delay } from "/core/core_utility.js";

//Script Members
let returnPortHandle;
let logPortHandle;
let handlePortDataPromise;


/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function setupPortHandles(ns) {
    returnPortHandle = ns.getPortHandle(20);
    logPortHandle = ns.getPortHandle(19);
}

async function handleReturnPortData() {
    while (true) {
        await delay(100);
        while (!returnPortHandle.empty()) {
            logPortHandle.write("Have data to read!");
            let value = returnPortHandle.read();
            logPortHandle.write("Data: " + value);

            let packet = JSON.parse(value);

            handlePacket(packet);
        }
    }
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
async function runGetOwnedAugmentsScript(ns) {
    let pid = ns.run("/core/augments/get_owned_augments.js");
    if (pid == 0) {
        ns.tprint("Failed to run script to get owned augments!");
    }

    while (ns.scriptRunning(pid, "home")) {
        await ns.sleep(250);
    }
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
async function startUp(ns) {
    ns.tprint("Controller is starting up!");
    init();

    //Get Save Data
    let savedData = getSavedData(ns);
    ns.tprint(savedData);
    saveStateData(ns);

    setupPortHandles(ns);

    handlePortDataPromise = handleReturnPortData();
    await runGetOwnedAugmentsScript(ns);

    await delay(2000);

    saveStateData(ns);
    ns.tprint("Controller has completed startup!");
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {
    await startUp(ns);

    ns.tprint("We have reached the exit somehow! HALP!");
}

function handlePacket(packet) {
    logPortHandle.write("Handling packet!");
    if (packet.PacketType == null || packet.PacketType == undefined) {
        //TODO: Do something to log here!
        logPortHandle.write("Packet Type was not set!");
        return;
    }

    if (packet.PacketType == "OwnedAugments") {
        logPortHandle.write("Owned Augments Packet!");
        handleOwnedAugmentsPacket(packet);
        return;
    }

    logPortHandle.write("Unknown packet type!");
}

function handleOwnedAugmentsPacket(packet) {
    logPortHandle.write("Handling owned augments!");

    if (packet.PacketType != "OwnedAugments") {
        logPortHandle.write("Packet type was not correct: " + packet.PacketType);
        return;
    }


    let ownedAugments = JSON.parse(packet.Data);

    let savedData = getSavedData(null);

    if (savedData == null) {
        logPortHandle.write("Saved data was null!");
        return;
    }

    let knownOwned = savedData.Augments.Owned;

    for (let i = 0; i < ownedAugments.length; i++) {
        if (!knownOwned.includes(ownedAugments[i])) {
            knownOwned.push(ownedAugments[i]);
        }
    }

    logPortHandle.write("known Owned: " + JSON.stringify(knownOwned));

    updateOwnedAugments(knownOwned);
}