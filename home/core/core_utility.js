/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function delay(timeInMilliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, null), timeInMilliseconds)
    });
}