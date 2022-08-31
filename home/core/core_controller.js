import { initDataModule, getSavedData, saveStateData, updateOwnedAugments } from "/core/core_datamodule.js";
import { delay } from "/core/core_utility.js";
import {initReturnPacketHandler, shutdownPacketHandler, handleReturnPortData } from "/core/core_return_packet_handler.js";

//Script Members
// let returnPortHandle;
// let logPortHandle;
let handlePortDataPromise;
let runningPromise;

async function addToPromise(newPromise) {
    if(runningPromise == null) {
        runningPromise = newPromise;
    } else {
        runningPromise = runningPromise.then(await newPromise);
    }

    return runningPromise;
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
async function runSetupAugmentDataScripts(ns) {
    let pid = ns.run("/core/augments/get_owned_augments.js");
    if (pid == 0) {
        ns.tprint("Failed to run script to get owned augments!");
    }

    while (ns.scriptRunning(pid, "home")) {
        await addToPromise(delay(1000));
    }

    pid = 0;

    pid = ns.run("/core/augments/get_augment_details.js");
    if (pid == 0) {
        ns.tprint("Failed to run script to get augment details!");
    }

    while (ns.scriptRunning(pid, "home")) {
        await addToPromise(delay(1000));
    }
}

function initModules(ns) {
    initDataModule(ns);
    initReturnPacketHandler(ns, function(promise){
        return addToPromise(promise);
    }, getSavedData, updateOwnedAugments);
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
async function startUp(ns) {
    ns.tprint("Controller is starting up!");
    initModules(ns);

    //Get Save Data
    let savedData = getSavedData(ns);
    ns.tprint(savedData);
    saveStateData(ns);

    //setupPortHandles(ns);

    handlePortDataPromise = handleReturnPortData();
    await runSetupAugmentDataScripts(ns);

    await addToPromise(delay(2000));

    saveStateData(ns);
    ns.tprint("Controller has completed startup!");
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {
    ns.atExit(() => {
        shutdownPacketHandler();
    });
    
    await startUp(ns);
    await addToPromise(delay(2000));

    ns.tprint("We have reached the exit somehow! HALP!");
}