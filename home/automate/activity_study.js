function study(ns) {
	let currentMoney = ns.getServerMoneyAvailable("home");
	let course = "Study Computer Science";
	//{"type":"CLASS","cyclesWorked":2031,"classType":"STUDYCOMPUTERSCIENCE","location":"Rothman University"}
	//{"type":"CLASS","cyclesWorked":19,"classType":"ALGORITHMS","location":"Rothman University"}

	if (currentMoney > 3000000) {
		course = "ALGORITHMS";
	}

	let currentWork = ns.singularity.getCurrentWork();

	if (currentWork != null) {
		if (currentWork.type == "CLASS" && currentWork.location == "Rothman University") {
			if (course == "Study Computer Science" && currentWork.classType == "STUDYCOMPUTERSCIENCE") {
				return true;
			}
			else if (course == "ALGORITHMS" && currentWork.classType == "ALGORITHMS") {
				{
					return true;
				}
			}
		}
	}

	if (!ns.singularity.universityCourse("Rothman University", course, true)) {
		ns.tprint("Failed to start studying!");
	}

	return true;
}


/** @param {NS} ns */
export async function main(ns) {
	let result = study(ns);
	let resultDetail = {
		"Activity": "study",
		"Result": result
	};

	ns.spawn("automate/manageactivity.js", 1, JSON.stringify(resultDetail));
}