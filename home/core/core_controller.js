import { getSavedData, saveStateData, updateOwnedAugments } from "/core/core_datamodule.js";
import {delay} from "/core/core_utility.js";

/** @param {import("U:/src/bitburner/bbcode/home/").NetscriptPort} returnPortHandle */
let returnPortHandle;

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function setupPortHandles(ns) {
    returnPortHandle = ns.getPortHandle(20);
}

async function handleReturnPortData() {
    while(true) {
        await delay(100);
        while(!returnPortHandle.empty()) {
            let value = returnPortHandle.read();

            let packet = JSON.parse(value);

            handlePacket(packet);
        }
    }
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function startUp(ns) {
    ns.tprint("Controller is starting up!");
    
    //Get Save Data
    let savedData = getSavedData(ns);
    ns.tprint(savedData);

    //await delay(5000);

    saveStateData(ns);
    ns.tprint("Controller has completed startup!");
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {
    startUp(ns);

    ns.tprint("We have reached the exit somehow! HALP!");
}

function handlePacket(packet) {
    if(packet.PacketType == null || packet.PacketType == undefined) {
        //TODO: Do something to log here!
        return;
    }

    if(packet.PacketType == "OwnedAugments"){
        handleOwnedAugmentsPacket(packet);
        return;
    }
}

function handleOwnedAugmentsPacket(packet) {
    if(packet.PacketType != "OwnedAugments") {
        return;
    }

    let ownedAugments = JSON.parse(packet.Data);

    let savedData = getSavedData(null);

    if(savedData == null) {
        return;
    }

    let knownOwned = savedData.Augments.Owned;

    for(let i = 0; i< ownedAugments.length; i++) {
        if(!knownOwned.includes(ownedAugments[i])) {
            knownOwned.push(ownedAugments[i]);
        }
    }

    updateOwnedAugments(knownOwned);
}