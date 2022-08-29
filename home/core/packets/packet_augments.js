/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export function ownedAugmentsPacket(ns, ownedAugments) {
    if(ownedAugments == null) {
        ownedAugments = [];
    } else if(!Array.isArray(ownedAugments)) 
    {
        ns.tprint("Owned Augments data was not an array. Value: " + ownedAugments);
        ownedAugments = [];
    }

    return {
        "PacketType" : "OwnedAugments",
        "Data" : JSON.stringify(ownedAugments)
    }
}