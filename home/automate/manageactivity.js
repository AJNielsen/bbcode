function getFactionToRep(ns) {
	ns.spawn("automate/activity_faction.js");
}

function shouldCreateProgram(ns) {
	ns.spawn("automate/activity_program.js");
}

function study(ns) {
	ns.spawn("automate/activity_study.js");
}

function spawnNextScript(ns) {
	ns.spawn("automate/upgrade_homeserver.js");
}

/** @param {NS} ns */
export async function main(ns) {
	let callbackResult = ns.args[0];

	let callbackStudy = false;
	let callbackProgram = false;
	let callbackFaction = false;

	if (callbackResult != null) {
		callbackResult = JSON.parse(callbackResult);
		if (callbackResult.Result == true) {
			ns.print("Activity[" + callbackResult + "] was successful!");
			spawnNextScript(ns);
			return;
		}

		if (callbackResult.Activity == "study") {
			callbackStudy = true;
		}

		if (callbackResult.Activity == "program") {
			callbackStudy = true;
			callbackProgram = true;
		}

		if (callbackResult.Activity == "faction") {
			callbackStudy = true;
			callbackProgram = true;
			callbackFaction = true;
		}
	}

	if (!callbackStudy && (ns.getHackingLevel() < 50 || ns.hasRootAccess("w0r1d_d43m0n"))) {
		study(ns);
		return;
	}

	if (!callbackProgram) {
		shouldCreateProgram(ns)
		return;
	}

	if (!callbackFaction) {
		getFactionToRep(ns)
		return;
	}

	spawnNextScript(ns);
}