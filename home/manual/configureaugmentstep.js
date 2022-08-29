/** @param {NS} ns */
export async function main(ns) {
	let augmentTiers = [];

	let augmentTierOne = {
		"Tier": 1,
		"Augments": [
			{
				"Name": "Neurotrainer I",
				"Faction": "CyberSec",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierOne);

	let augmentTierTwo = {
		"Tier": 2,
		"Augments": [
			{
				"Name": "BitWire",
				"Faction": "CyberSec",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierTwo);

	let augmentTierThree = {
		"Tier": 3,
		"Augments": [
			{
				"Name": "Synaptic Enhancement Implant",
				"Faction": "CyberSec",
				"Order": "0"
			},
			{
				"Name": "Hacknet Node NIC Architecture Neural-Upload",
				"Faction": "Netburners",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierThree);

	let augmentTierFour = {
		"Tier": 4,
		"Augments": [
			{
				"Name": "Cranial Signal Processors - Gen I",
				"Faction": "CyberSec",
				"Order": "0"
			},
			{
				"Name": "Cranial Signal Processors - Gen II",
				"Faction": "CyberSec",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierFour);

	let augmentTierFive = {
		"Tier": 5,
		"Augments": [
			{
				"Name": "Neurotrainer II",
				"Faction": "NiteSec",
				"Order": "0"
			},
			{
				"Name": "Artificial Synaptic Potentiation",
				"Faction": "NiteSec",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierFive);

	let augmentTierSix = {
		"Tier": 6,
		"Augments": [
			{
				"Name": "CashRoot Starter Kit",
				"Faction": "Sector-12",
				"Order": "0"
			},
			{
				"Name": "Hacknet Node Cache Architecture Neural-Upload",
				"Faction": "Netburners",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierSix);

	let augmentTierSeven = {
		"Tier": 7,
		"Augments": [
			{
				"Name": "Neural-Retention Enhancement",
				"Faction": "NiteSec",
				"Order": "0"
			},
			{
				"Name": "Embedded Netburner Module",
				"Faction": "NiteSec",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierSeven);

	let augmentTierEight = {
		"Tier": 8,
		"Augments": [
			{
				"Name": "ADR-V1 Pheromone Gene",
				"Faction": "Tian Di Hui",
				"Order": "0"
			},
			{
				"Name": "Social Negotiation Assistant (S.N.A)",
				"Faction": "Tian Di Hui",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierEight);

	let augmentTierNine = {
		"Tier": 9,
		"Augments": [
			{
				"Name": "Neuroreceptor Management Implant",
				"Faction": "Tian Di Hui",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierNine);

	let augmentTierTen = {
		"Tier": 10,
		"Augments": [
			{
				"Name": "Neuregen Gene Modification",
				"Faction": "Chongqing",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierTen);

	let augmentTierEleven = {
		"Tier": 11,
		"Augments": [
			{
				"Name": "CRTX42-AA Gene Modification",
				"Faction": "NiteSec",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierEleven);

	let augmentTierTwelve = {
		"Tier": 12,
		"Augments": [
			{
				"Name": "DataJack",
				"Faction": "NiteSec",
				"Order": "0"
			},
			{
				"Name": "Cranial Signal Processors - Gen III",
				"Faction": "NiteSec",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierTwelve);

	let augmentTierThirteen = {
		"Tier": 13,
		"Augments": [
			{
				"Name": "Neuralstimulator",
				"Faction": "The Black Hand",
				"Order": "0"
			},
			{
				"Name": "Cranial Signal Processors - Gen III",
				"Faction": "The Black Hand",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierThirteen);

	let augmentTierFourteen = {
		"Tier": 14,
		"Augments": [
			{
				"Name": "Enhanced Myelin Sheathing",
				"Faction": "The Black Hand",
				"Order": "0"
			},
			{
				"Name": "The Black Hand",
				"Faction": "The Black Hand",
				"Order": "0"
			},
			{
				"Name": "DataJack",
				"Faction": "The Black Hand",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierFourteen);

	let augmentTierFifteen = {
		"Tier": 15,
		"Augments": [
			{
				"Name": "Embedded Netburner Module Core Implant",
				"Faction": "The Black Hand",
				"Order": "0"
			},
			{
				"Name": "Cranial Signal Processors - Gen IV",
				"Faction": "The Black Hand",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierFifteen);

	let augmentTierSixteen = {
		"Tier": 16,
		"Augments": [
			{
				"Name": "Artificial Bio-neural Network Implant",
				"Faction": "BitRunners",
				"Order": "0"
			},
			{
				"Name": "Cranial Signal Processors - Gen V",
				"Faction": "BitRunners",
				"Order": "1"
			},
			{
				"Name": "Neural Accelerator",
				"Faction": "BitRunners",
				"Order": "2"
			}
		]
	};
	augmentTiers.push(augmentTierSixteen);

	let augmentTierSeventeen = {
		"Tier": 17,
		"Augments": [
			{
				"Name": "Embedded Netburner Module Core V2 Upgrade",
				"Faction": "BitRunners",
				"Order": "0"
			},
			{
				"Name": "BitRunners Neurolink",
				"Faction": "BitRunners",
				"Order": "1"
			}
		]
	};
	augmentTiers.push(augmentTierSeventeen);

	let augmentTierEighteen = {
		"Tier": 18,
		"Augments": [
			{
				"Name": "Embedded Netburner Module Analyze Engine",
				"Faction": "Daedalus",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierEighteen);

	let augmentTierNineteen = {
		"Tier": 19,
		"Augments": [
			{
				"Name": "Embedded Netburner Module Core V3 Upgrade",
				"Faction": "Daedalus",
				"Order": "0"
			},
			{
				"Name": "Embedded Netburner Module Direct Memory Access Upgrade",
				"Faction": "Daedalus",
				"Order": "0"
			},
			{
				"Name": "The Red Pill",
				"Faction": "Daedalus",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierNineteen);

	let augmentTierTwenty = {
		"Tier": 20,
		"Augments": [
			{
				"Name": "NeuroFlux Governor",
				"Faction": "Daedalus",
				"Order": "0"
			}
		]
	};
	augmentTiers.push(augmentTierTwenty);

	await ns.write("automate_augmenttiers.txt", JSON.stringify(augmentTiers), "w");
}