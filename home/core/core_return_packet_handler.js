//import { getSavedData, updateOwnedAugments } from "/core/core_datamodule.js";
import { delay } from "/core/core_utility.js";

let returnPortHandle;
let logPortHandle;
let promiseFunc;
let continueRunning = true;
let getSavedData;
let updateOwnedAugments;

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

    try {
        if (packet.PacketType != "OwnedAugments") {
            logPortHandle.write("Packet type was not correct: " + packet.PacketType);
            return;
        }

        let ownedAugments = JSON.parse(packet.Data);

        let savedData = getSavedData();

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
    } catch (error) {
        logPortHandle.write("Issue handling data. Error: " + error);
    }
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
function setupPortHandles(ns) {
    returnPortHandle = ns.getPortHandle(20);
    logPortHandle = ns.getPortHandle(19);
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export function initReturnPacketHandler(ns, addToPromiseFunc, savedDataRetriever, augmentUpdater) {
    setupPortHandles(ns);
    promiseFunc = addToPromiseFunc;
    continueRunning = true;
    getSavedData = savedDataRetriever;
    updateOwnedAugments = augmentUpdater;
}

export function shutdownPacketHandler() {
    continueRunning = false;
}

export async function handleReturnPortData() {
    while (continueRunning) {
        // await delay(100).then(function (){
        //     while (!returnPortHandle.empty()) {
        //         logPortHandle.write("Have data to read!");
        //         let value = returnPortHandle.read();
        //         logPortHandle.write("Data: " + value);

        //         let packet = JSON.parse(value);

        //         handlePacket(packet);
        //     }
        // });

        let handleData = delay(100).then(function () {
            while (!returnPortHandle.empty()) {
                logPortHandle.write("Have data to read!");
                let value = returnPortHandle.read();
                logPortHandle.write("Data: " + value);

                let packet = JSON.parse(value);

                handlePacket(packet);
            }
        });

        await promiseFunc(handleData);
    }
}