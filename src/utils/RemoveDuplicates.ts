const removeDuplicates = <T extends { id: string }>(array: T[]): T[] => {
    const uniqueMap: { [key: string]: boolean } = {};
    return array.filter((item) => {
        const itemId = item.id;
        if (!uniqueMap[itemId]) {
            uniqueMap[itemId] = true;
            return true;
        }
        return false;
    });
};

export default removeDuplicates;
