async function delay(timeInMilliseconds, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(v, null), timeInMilliseconds)
    });
}

export async function main(ns) {
    // setTimeout(async function() {
    //     ns.tprint("Inside of one.");
    //     let player = ns.getPlayer();
    //     ns.tprint(player);
    //     doSomething();
    //     ns.tprint("one");
    //   }, 1000);
       
    //   setTimeout(async function() {
    //     ns.tprint("two");
    //   }, 1000);

    let currentPromise = delay(1000).then(function() {
        ns.tprint("one");
    })

    let second = delay(1000).then(function() {
        ns.tprint("two");
    })
    currentPromise.then(await second);
    await currentPromise;

    //   await new Promise(function (resolve) {
    //     setTimeout(resolve.bind(null, null), 2)
    // });
}