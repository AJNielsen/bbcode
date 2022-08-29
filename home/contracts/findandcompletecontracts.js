function getAllServers(ns, current = "home", set = new Set()) {
	let connections = ns.scan(current)
	let next = connections.filter(c => !set.has(c))
	next.forEach(n => {
		set.add(n);
		return getAllServers(ns, n, set)
	})
	return Array.from(set.keys())
}

async function findContracts(ns) {
	let allServers = getAllServers(ns);

	let completedContracts = ns.read("contracts_completed.txt");
	if(completedContracts == "") {
		completedContracts = [];
	} else {
		completedContracts = completedContracts.split("\n");
	}

	let contractsToComplete = [];

	for (const server of allServers) {
		await ns.asleep(100);
		if (server.startsWith("home")) {
			continue;
		}

		let serverFiles = ns.ls(server);

		for (const file of serverFiles) {
			if (file.endsWith(".cct")) {
				if(!completedContracts.includes(file)) {
					contractsToComplete.push({"filename":file,"server":server});
				}
			}
		}
	}

	return contractsToComplete;
}

function executeCodingContract(ns, filename, server, contracttype) {
	let lookup = {
		"Algorithmic Stock Trader III":"solver_algo_stock_trader_3.js",
		"HammingCodes: Encoded Binary to Integer":"solver_hc_encoded_binary_to_integer.js",
		"Generate IP Addresses":"solver_generate_ip_addresses.js",
		"Algorithmic Stock Trader II":"solver_algorithmic_stock_trader_2.js",
		"Encryption II: Vigenère Cipher":"encryption_2_vig_cipher.js",
		"Shortest Path in a Grid":"shortest_path_in_a_grid.js",
		"Array Jumping Game": "array_jumping_game.js",
		"Array Jumping Game II": "array_jumping_game_2.js",
		"HammingCodes: Integer to Encoded Binary":"hc_integer_to_encoded_binary.js",
		"Merge Overlapping Intervals":"merge_overlapping_intervals.js",
		"Unique Paths in a Grid II": "unique_paths_in_a_grid_2.js",
		"Sanitize Parentheses in Expression":"sanitize_parentheses_in_expression.js",
		"Algorithmic Stock Trader I":"algorithmic_stock_trader_1.js",
		"Subarray with Maximum Sum":"subarray_with_maximum_Sum.js"
	};

	let script = lookup[contracttype];

	if(script == null) {
		ns.tprint("Contract Type[" + contracttype + "] needs to be added to the execution handler.");
		return "";
	}

	if(script == "") {
		ns.tprint("Contract Type[" + contracttype + "] needs a solver.");
		return "";
	}

	ns.run("contracts/solvers/" +script, 1, filename, server);
	ns.tail("contracts/solvers/" +script);

	return "contracts/solvers/" +script;
}

/** @param {NS} ns */
export async function main(ns) {
	let contractsToComplete = await findContracts(ns);

	let current = "";
	for (const contract of contractsToComplete) {

		while(current!="") {
			await ns.asleep(100);
			let running = ns.getRunningScript(current);
			if(running == null) {
				current = "";
			}
		}

		let remainingTries = ns.codingcontract.getNumTriesRemaining(contract.filename, contract.server);
		if(remainingTries == 0) {
			await ns.write("contracts_completed.txt", contract.filename);
			continue;
		}
		
		let type = ns.codingcontract.getContractType(contract.filename, contract.server);

		current = executeCodingContract(ns, contract.filename, contract.server, type);
	}
}