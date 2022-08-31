/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export function ownedAugmentsPacket(ns, ownedAugments) {
    if(ownedAugments == null) {
        ownedAugments = [];
    } else if(!Array.isArray(ownedAugments)) 
    {
        ns.tprint("Owned Augments data was not an array. Value: " + JSON.stringify(ownedAugments));
        ownedAugments = [];
    }

    return {
        "PacketType" : "OwnedAugments",
        "Data" : JSON.stringify(ownedAugments)
    }
}

export function allAugmentDetails(ns, allAugmentDetails) {
    if(allAugmentDetails == null) {
        allAugmentDetails = [];
    } else if(!Array.isArray(allAugmentDetails)) 
    {
        ns.tprint("All Augment Details data was not an array. Value: " + JSON.stringify(allAugmentDetails));
        allAugmentDetails = [];
    }

    return {
        "PacketType" : "AllAugmentDetails",
        "Data" : JSON.stringify(allAugmentDetails)
    }
}