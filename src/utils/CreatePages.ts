const createPages = (pagesCount: number, currentPage: number) => {
    let pages: number[] = [];

    if (pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                pages.push(i);
                if (i === pagesCount) break;
            }
        } else {
            for (let i = 0; i < 10; i++) {
                pages.push(i);
                if (i === pagesCount) break;
            }
        }
    } else {
        for (let i = 0; i < pagesCount; i++) {
            pages.push(i);
        }
    }

    return pages;
};

export default createPages;
