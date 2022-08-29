/** @param {NS} ns */
export async function main(ns) {
	// Get a port handle - Ports range from 1-20.
	// Ports are used across all servers. Port 1 talks to port 1 anywhere.
	let handle = ns.getPortHandle(1);

	//Clears all messages in the port queue. - This is less likely to be useful, but if you are starting up or need to reset this can be used to ensure any bad data is mad.
	handle.clear();


	//This will write a message to the ports queue!
	handle.write("Data Goes Here!");

	//Get the data from the queue without removing it. This can be used to check for data that is needed to be processed or if you have messages that are for specific servers you can
	// (cont.) see if the message is for your server.
	handle.peek();

	//Gets the data from the queue and removes it from the queue.
	handle.read();

	//Full and empty can be used to check if the queue is full or empty and may not have a ton of usage.
	handle.full();
	handle.empty();

	// let myPacket = {
	// 	"PacketType" : "Hack",
	// 	"Target" : "Home1",
	// 	"Data" : {},
	// 	123 : "data"
	// };
}