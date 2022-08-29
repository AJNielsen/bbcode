/*
Given the following string:

 )a)()(a)(

 remove the minimum number of invalid parentheses in order to validate the string. If there are multiple minimal ways to validate the string, provide all of the possible results. The answer should be provided as an array of strings. If it is impossible to validate the string the result should be an array with only an empty string.

 IMPORTANT: The string may contain letters, not just parentheses. Examples:
 "()())()" -> [()()(), (())()]
 "(a)())()" -> [(a)()(), (a())()]
 ")(" -> [""]

)a)()(a)(
 */

function isValid(ns, charArray) {
	let open = 0;
	for(const char of charArray) {
		if(char != '(' && char != ')'){
			continue;
		}

		if(char == ')' && open == 0)  {
			return false;
		}

		if(char == '(') {
			open++;
		}
		else if(char == ')') {
			open = open-1;
		}
	}

	if(open> 0) {
		return false;
	}

	return true;
}

function findInvalidPositionLtoR(ns, charArray) {
	let open = 0;
	for(let i = 0; i<charArray.length;i++) {
		let char = charArray[i];

		if(char != '(' && char != ')'){
			continue;
		}

		if(char == ')' && open == 0)  {
			return i;
		}

		if(char == '(') {
			open++;
		}
		else if(char == ')') {
			open = open-1;
		}
	}

	if(open> 0) {
		return charArray.length;
	}

	return -1;
}

function correctString(ns, charArray) {
	let left = 0;
	let right = 0;

	//Remove any ')' before any '(' and count;
	for(let i=0; i<charArray.length;++i){
		if(charArray[i] != '(' && charArray[i] != ')') {
			continue;
		}

		if(charArray[i] == ')' && left == 0) {
			charArray.splice(i,1);
			i--;
			continue;
		}
		// else if(charArray[i] == ')') {
		// 	right++;
		// 	continue;
		// }

		if(charArray[i] == '(') {
			left++;
			continue;
		}
	}

	//Remove any '(' before any ')' in reverse
	for(let i=charArray.length-1; i>=0;i--){
		if(charArray[i] != '(' && charArray[i] != ')') {
			continue;
		}

		if(charArray[i] == '(' && right == 0) {
			charArray.splice(i,1);
			i++;
			continue;
		}
		// else if(charArray[i] == ')') {
		// 	right++;
		// 	continue;
		// }

		if(charArray[i] == ')') {
			right++;
			continue;
		}
	}

	if(isValid(ns, charArray)) {
		ns.tprint("Made valid!");
		return charArray.join('');;
	}

	ns.tprint("More work to do!");

	let invalidPosition = findInvalidPositionLtoR(ns, charArray);
	ns.tprint(invalidPosition);

	if(charArray[invalidPosition-1] == ')') {
		invalidPosition= invalidPosition-1;
	}


	ns.tprint("print me bitches!");

	return null;
}

/** @param {NS} ns */
export async function main(ns) {
let filename = ns.args[0];
	let servername = ns.args[1];

	let description = ns.codingcontract.getDescription(filename, servername);
	ns.print(description);

	let data = ns.codingcontract.getData(filename, servername);
	ns.print(data);

	let charArray = Array.from(data);

	let result = correctString(ns, charArray);
	ns.tprint(result);

	if(result == null) {
		ns.tprint("Failed to get a result.");
		ns.exit();
		return;
	}
}