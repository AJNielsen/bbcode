import {setMyData} from "/test/import/test_module.js";

export async function main(ns) {
    let count = 0;
    while(true)
    {
        await ns.sleep(5000);
        count++;
        let update = "Count: " + count;
        setMyData(update);
        ns.print(update);
    }
}