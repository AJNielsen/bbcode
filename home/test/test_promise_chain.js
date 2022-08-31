import { delay } from "/core/core_utility.js";

let promiseChain;

async function getTestPromise(ns) {
    return delay(1000).then(async function(){
        ns.tprint("Inside of promise!");
        promiseChain = promiseChain.then(getTestPromise(ns));
        await promiseChain;
    });
}

async function getTestPromiseTwo(ns) {
    return delay(1000).then(async function(){
        ns.tprint("The Second One!");
        promiseChain = promiseChain.then(getTestPromiseTwo(ns));
        await promiseChain;
    });
}

/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function main(ns) {

    promiseChain = getTestPromise(ns);
    promiseChain = promiseChain.then(getTestPromiseTwo(ns));
    await promiseChain;

    ns.tprint("At the end!");
}