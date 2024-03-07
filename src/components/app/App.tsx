/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import type { IGoods, IFilterParams } from '../../models/IGoods';
import useValantisService from '../../services/ValantisService';
import removeDuplicates from '../../utils/RemoveDuplicates';
import usePagination from '../../hooks/usePagination';

import Goods from '../goods/Goods';
import Pagination from '../pagination/Pagination';
import Filter from '../filter/Filter';
import { Spinner } from '../UI';

import './app.scss';

const App: React.FC = () => {
    const [goods, setGoods] = useState<IGoods[]>([]);
    const [ids, setIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterMessage, setFilterMessage] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit] = useState(50);
    const { getIds, getGoodsById, filterGoods } = useValantisService(offset);
    const { pagesArray } = usePagination(limit, offset, ids.length);

    useEffect(() => {
        fetchIds();
    }, []);

    useEffect(() => {
        if (ids.length) {
            fetchGoodsById();
        }
    }, [ids, offset]);

    const fetchGoodsById = () => {
        setIsLoading(true);
        setFilterMessage('');
        const limitedIds =
            ids.length < 50 ? ids : ids.slice(offset, offset + limit);

        getGoodsById(limitedIds)
            .then((data) => {
                setGoods(removeDuplicates(data));
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                fetchGoodsById();
            });
    };

    const fetchIds = () => {
        setIsLoading(true);
        setFilterMessage('');

        getIds()
            .then((data: string[]) => {
                setIds(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                fetchIds();
            });
    };

    const onFilterGoods = (params: IFilterParams) => {
        filterGoods(params)
            .then((data) => {
                if (data.length) {
                    setIds(data);
                } else {
                    setFilterMessage('Ничего не найдено');
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                onFilterGoods(params);
            });
    };

    return (
        <section className="app">
            <div className="app__container">
                <h1 className="main__title">Список товаров</h1>
                <Filter
                    onFilterGoods={onFilterGoods}
                    fetchGeneralIds={() => fetchIds()}
                    setOffset={setOffset}
                    isLoading={isLoading}
                />
                <div className="app__wrapper">
                    {isLoading ? (
                        <Spinner />
                    ) : filterMessage ? (
                        <div className="app__filter-message">
                            {filterMessage}
                        </div>
                    ) : (
                        <Goods goods={goods} />
                    )}
                </div>
                <Pagination
                    pagesArray={pagesArray}
                    offset={offset}
                    setOffset={setOffset}
                    isLoading={isLoading}
                />
            </div>
        </section>
    );
};
export default App;
