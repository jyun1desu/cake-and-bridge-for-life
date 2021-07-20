type Object = { [key: string]: any };

const isObjectEquivalent = (a: Object | null, b: Object | null) => {
    if(!a || !b) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(key => {
        return a[key] === b[key]
    })
}

export default isObjectEquivalent