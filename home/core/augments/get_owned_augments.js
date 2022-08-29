import {ownedAugmentsPacket} from "/core/packets/packet_augments.js";

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {
    let handle = ns.getPortHandle(20);

    let owned = ns.singularity.getOwnedAugmentations();

    if(owned == null) {
        owned = [];
    }

    let packet = ownedAugmentsPacket(ns, owned);

    handle.write(JSON.stringify(packet));

    ns.tprint("Wrote Packet: " + JSON.stringify(packet));
}