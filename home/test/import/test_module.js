var test = {"mydata": "Not set"};

export function setMyData(value) {
    test.mydata = value;
}

export function getAllData() {
    return test;
}