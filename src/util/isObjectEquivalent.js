const isObjectEquivalent = (a, b) => {
    if(!a || !b) return;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if(aKeys.length !== bKeys.length) return false;

    return aKeys.every(key=>{
        const aValue = a[key];
        const bValue = b[key];
        return aValue === bValue
    })
}

export default isObjectEquivalent