/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import createPages from '../utils/CreatePages';
import getTotalPages from '../utils/GetTotalPages';

const usePagination = (limit: number, offset: number, totalCount: number) => {
    const [pagesArray, setPagesArray] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    useEffect(() => {
        setTotalPages(getTotalPages(totalCount, limit));
    }, [totalCount]);

    useEffect(() => {
        if (totalPages) {
            setPagesArray(createPages(totalPages, offset));
        }
    }, [totalPages, offset]);

    return { pagesArray };
};

export default usePagination;
