function compareDates(dateOne, dateTwo) {
	if (dateOne.getYear() > dateTwo.getYear()) {
		return -1;
	}
	if (dateOne.getYear() < dateTwo.getYear()) {
		return 1;
	}

	if (dateOne.getMonth() > dateTwo.getMonth()) {
		return -1;
	}
	if (dateOne.getMonth() < dateTwo.getMonth()) {
		return 1;
	}

	if (dateOne.getDay() > dateTwo.getDay()) {
		return -1;
	}
	if (dateOne.getDay() < dateTwo.getDay()) {
		return 1;
	}

	if (dateOne.getHours() > dateTwo.getHours()) {
		return -1;
	}
	if (dateOne.getHours() < dateTwo.getHours()) {
		return 1;
	}

	if (dateOne.getMinutes() > dateTwo.getMinutes()) {
		return -1;
	}
	if (dateOne.getMinutes() < dateTwo.getMinutes()) {
		return 1;
	}

	if (dateOne.getSeconds() > dateTwo.getSeconds()) {
		return -1;
	}
	if (dateOne.getSeconds() < dateTwo.getSeconds()) {
		return 1;
	}
	
	return 0;
}


/** @param {NS} ns */
export async function main(ns) {
	var dict = { "one": 1, "two": 2, 3: "three" };
	let data = JSON.stringify(dict);
	ns.tprint(data);
	ns.tprint(dict["two"]);
	ns.tprint(dict[3]);

	let date = new Date();
	// let stringDate = JSON.stringify(date);
	// ns.tprint(Date.parse(stringDate));
	// ns.tprint(new Date(stringDate).toString());

	await ns.asleep(1000);
	let date2 = new Date();

	ns.tprint(compareDates(date, date2));
	ns.tprint(compareDates(date2, date));

}