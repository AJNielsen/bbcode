import {getAllData} from "/test/import/test_module.js";

export async function main(ns) {
    let data = getAllData();
    
    while(true)
    {
        await ns.sleep(1000);
        ns.print(data);
        ns.print(getAllData());
        if(data != getAllData()) {
            ns.tprint("Old: " + data + " | New: " + getAllData());
            ns.print("Old: " + data + " | New: " + getAllData());
            data = getAllData();
        }
    }
}