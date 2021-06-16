const generateArray = number => {
    if(!number) return [];
    return Array.from(Array(number), (_, x) => x);
}

export default generateArray;