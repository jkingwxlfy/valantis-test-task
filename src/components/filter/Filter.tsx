import { useState } from 'react';
import type { IFilterParams } from '../../models/IGoods';

import './filter.scss';

interface IFilterProps {
    onFilterGoods: (params: IFilterParams) => void;
    fetchGeneralIds: () => void;
    setOffset: (value: number) => void;
    isLoading: boolean;
}

const Filter: React.FC<IFilterProps> = ({
    onFilterGoods,
    fetchGeneralIds,
    setOffset,
    isLoading,
}) => {
    const [selectedFilter, setSelectedFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isUsingFilter, setIsUsingFulter] = useState(false);

    const filterOptions = [
        { title: 'По названию', value: 'product' },
        { title: 'По бренду', value: 'brand' },
        { title: 'По цене', value: 'price' },
    ];

    const onUseFilter = () => {
        if (searchQuery && selectedFilter) {
            setOffset(0);
            setIsUsingFulter(true);
            if (selectedFilter === 'price') {
                onFilterGoods({ [selectedFilter]: Number(searchQuery.trim()) });
            } else {
                onFilterGoods({ [selectedFilter]: searchQuery.trim() });
            }
        }
    };

    const onSelectFilter = (value: string) => {
        if (value === selectedFilter) {
            setIsUsingFulter(false);
            setSelectedFilter('');
            setSearchQuery('');
            if (isUsingFilter) {
                fetchGeneralIds();
                setOffset(0);
            }
        } else {
            setSelectedFilter(value);
        }
    };

    return (
        <section className={`filter ${isLoading ? 'disabled' : ''}`}>
            <h2>Поиск</h2>
            <div className="filter__container">
                <div className="filter__wrapper">
                    {filterOptions.map((item) => (
                        <label className="filter__checkbox" key={item.value}>
                            <div className="filter__field">{item.title}</div>
                            <input
                                type="checkbox"
                                onChange={() => onSelectFilter(item.value)}
                                checked={selectedFilter === item.value}
                            />
                        </label>
                    ))}
                </div>
                <div className="filter__wrapper">
                    <input
                        className="filter__search"
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button onClick={onUseFilter}>Найти товар</button>
                </div>
            </div>
        </section>
    );
};
export default Filter;
