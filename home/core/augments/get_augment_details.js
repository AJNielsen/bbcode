import { allAugmentDetails } from "/core/packets/packet_augments.js";
import { allFactionNames } from "/core/factions/faction_core.js";

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {
    let handle = ns.getPortHandle(20);

    let factions = allFactionNames();

    var augmentDetails = {};

    for(let f of factions) {
        let augs = ns.singularity.getAugmentationsFromFaction(f);
        for(let augment of augs) {
            if(!augmentDetails.hasOwnProperty(augment)) {
                let basePrice = ns.singularity.getAugmentationBasePrice(augment);
                let repCost = ns.singularity.getAugmentationRepReq(augment);
                let stats = ns.singularity.getAugmentationStats(augment);
                
                augmentDetails[augment] = {
                    "Factions": [],
                    "BasePrice" : basePrice,
                    "Reputation": repCost,
                    "Stats": stats
                };
            }

            augmentDetails[augment].Factions.push(f);
        }
    }

    let packet = allAugmentDetails(ns, augmentDetails);

    handle.write(JSON.stringify(packet));

    ns.tprint("Wrote Packet: " + JSON.stringify(packet));
}