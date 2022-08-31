/** @param {import("U:/src/bitburner/bbcode/home/").NS} ns */
export async function delay(timeInMilliseconds, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(v, null), timeInMilliseconds)
    });
}